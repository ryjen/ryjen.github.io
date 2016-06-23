---
title: C Sqlite Tricks
tags:
  - c
  - programming
  - sqlite
date: 2012-05-15
description: "database mapping"
---

Well, I thought I would share some tricks I use for easy data CRUD's in C (potentially C++/ObjC but its lacking typesafety).  I'm using sqlite here, but could apply to any database.

This is how my data access works - I'm not saying its the best approach, its just how its evolved for me.

```c
    /* The account table name */
    #define ACCOUNT_TABLE "account"

    /* a structure representing the account fields */
    field_map account_values[] = {
      {"login", &acc->login, SQL_TEXT},
      {"email", &acc->email, SQL_TEXT},
      {"password", &acc->password, SQL_TEXT},
      {"timezone", &acc->timezone, SQL_INT},
      {0}
    };

    /* saves the fields to the database */
    acc->id = db_save(account_values, ACCOUNT_TABLE, acc->id);
```

As you can see, saving a structure is as simple as creating a field_map table and calling db_save.
```c
   /* loads one account by id
    * the query results are assigned to the pointers in the table
    */
    if(db_load_by_id(account_values, ACCOUNT_TABLE, acc->id) != SQL_OK)
      fprintf(stderr, "could not load account");

    /* a callback method */
    void load_account_callback(sql_stmt *stmt);

    /* load all accounts using the callback method
     * query results are sent to the callback
     */
    if(db_load_all(ACCOUNT_TABLE, load_account_callback) != SQL_OK)
      fprintf(stderr, "could not load accounts");
```
Loading is the same for single instances, but I use a callback method to load multiple instances.

The core of my data access is the field_map structure, which determines how to save each field to the database.
```c
    /*
     * this is the magical table used to communicate between memory and the database
     */
    typedef struct field_map {
      const char   *name;        /* name of the field */
      void        *value;        /* a pointer to the value of the field */
      int         type;          /* type of value */
      const void   *arg1;        /* additional argument */
      const void   *arg2;        /* additional argument */
      int         flags;         /* usage flags */
    } field_map;

    /* callback for custom field types */
    typedef int (*custom_field_t) (sql_stmt *, int column, field_map *field);

    typedef void (*sql_callback_t) (sql_stmt *);
```
  The implementations for save/load are basically just wrappers for the actual insert/update/select query methods.
```c
    /**
     * saves a field_map.  does an insert/update based on id == 0
     */
    sql_int64 db_save(field_map * table, const char *tableName, sql_int64 id)
    {
      if (id == 0) {
        if (sql_insert_query(table, tableName) != SQL_OK)
            fprintf(stderr, "could not insert to %s", tableName);
        return db_last_insert_rowid();
      } else {
        if (sql_update_query(table, tableName, id) != SQL_OK)
            fprintf(stderr, "could not update %s", tableName);

        return id;
      }
    }

    /**
    * loads a field_map.
    * @param baseData is the base structure used in the field_map
    * @param table the field_map
    * @param tableName the name of the table
    * @param alloc the callacbk to create a new instance of data structure
    * @param on_load callback when a row has been loaded
    * @param constraints contraints for the sql query
    */
    int db_load_all(const char *tableName, sql_callback_t callback, const char *constraints, ...)
    {
      char buf[1024] = {0};

      if(constraints) {
        va_list args;

        va_start(args, constraints);

        vsnprintf(buf, sizeof(buf), constraints, args);

        va_end(args);
      }

      if (sql_select_query(0, tableName, callback, buf) != SQL_OK) {
        fprintf(stderr, "could not load from %s", tableName);
        return 0;
      }

      return 1;
    }

    /**
     * loads a field_map by id.  Data will be loaded to the base structure used in the field_map table.
     */
    int db_load_by_id(field_map *table, const char *tablename, sql_int64 id)
    {
      char buf[1024] = {0};

      sprintf(buf, "where %s='%lld'", tablenameid(tablename), id);

      if(sql_select_query(0, table, tablename, 0, buf) != SQL_OK) {
        fprintf(stderr, "could not load from %s", tablename);
        return 0;
      }

      return 1;
    }
```
Nothing too crazy there, except for the sql_select_query parameters which I'll get to later.

We have to have a way to bind the field_map to the queries, so the following implementations take care of that:
```c
    /**
     * binds a single field_map value to a query
     */
    int sql_bind_table_value(sql_stmt * stmt, int column, field_map * field)
    {
      if (field->value == 0) {
        return sql_bind_null(stmt, column);
      }
      switch (field->type) {
      case SQL_INT:
        return sql_bind_int(stmt, column, *((int*) field->value));
      case SQL_TEXT:
        {
            const char *str = *((const char *) field->value);
            return sql_bind_text(stmt, column, str, strlen(str), 0);
        }
      case SQL_DOUBLE:
        return sql_bind_double(stmt, column, *((double*) field->value));
      case SQL_FLOAT:
        return sql_bind_float(stmt, column, *((float*) field->value));
      case SQL_CUSTOM:
        {
            custom_sql func = (custom_sql) (field->arg1);
            assert(func != 0);
            return (*func) (stmt, column, field);
        }
      default:
        fprintf(stderr, "unknown save type for field %s", field->name);
        return SQL_NONTYPE;
      }
    }

    /**
     * binds a field_map values to a query
     */
    int sql_bind_values(sql_stmt * stmt, field_map * table)
    {
      for (int i = 0; table[i].name != 0; i++) {
        int err = sql_bind_table_value(stmt, i + 1, &table[i]);

        if (err != SQL_OK)
            return err;
      }

      return SQL_OK;
    }
```
Note: I use SQL_FLOAT and SQL_DOUBLE, they both point to SQLITE3_FLOAT, however when casting we need to know the actual type.

Now for the query methods.  They try to follow the same basic principle - create the query, bind the values, execute
```c
    /**
     * insert query using a field_map
     */
    int sql_insert_query(field_map * table, const char *tablename)
    {
      sql_stmt *stmt;
      char buf[1024] = { 0 };
      char columns[1024] = { 0 };
      char params[1024] = { 0 };
      int i, len;

      for (i = 0; table[i].name != 0; i++) {
        strcat(columns, table[i].name);
        strcat(params, "?");

        if (table[i + 1].name != 0) {
            strcat(columns, ",");
            strcat(params, ",");
        }
      }

      len =  sprintf(buf, "insert into %s (%s) values(%s)", tablename, columns,
            params);

      if (sql_query(buf, len, &stmt) != SQL_OK) {
        return sql_finalize(stmt);
      }

      if (sql_bind_values(stmt, table) != SQL_OK) {
        return sql_finalize(stmt);
      }

      /* execute */
      sql_step(stmt);

      return sql_finalize(stmt);
    }

    /**
     * updates query using a field_map
     */
    int sql_update_query(field_map * table, const char *tablename, sql_int64 id)
    {
      sql_stmt *stmt;
      char buf[1024] = { 0 };
      char params[1024] = { 0 };
      int i, len;

      for (i = 0; table[i].name != 0; i++) {
        strcat(params, table[i].name);
        strcat(params, "=?");

        if (table[i + 1].name != 0) {
            strcat(params, ",");
        }
      }

      len = sprintf(buf, "update %s set %s where %s=%" PRId64, tablename,
              params, tablenameid(tablename), id);

      if (sql_query(buf, len, &stmt) != SQL_OK) {
        return sql_finalize(stmt);
      }

      if (sql_bind_values(stmt, table) != SQL_OK)
        return sql_finalize(stmt);

      /* execute */
      sql_step(stmt);

      return sql_finalize(stmt);
    }
```
The select query is simplified by having a callback for custom loading.  You can however use a field_map table to load a single instance.
```c
    /**
     * we have a pointer to a field value, so if we do pointer math we can apply the field value to
     * structures of the same type/size.  Thats what the optional base/data parameters are for.
     */
    void sql_load_columns(sql_stmt *stmt, int i, field_map *field)
    {
      switch (field->type) {
      case SQL_INT:
          field_value(int, field, base, data) =  sql_column_int(stmt, i);
          break;
      case SQL_TEXT:
          field_value(const char *, field, base, data) = str_dup(sql_column_str(stmt, i));
          break;
      case SQL_FLOAT:
          field_value(float, field, base, data) = sql_column_float(stmt, i);
          break;
      case SQL_DOUBLE:
          field_value(double, field, base, data) = sql_column_double(stmt, i);
          break;
      case SQL_CUSTOM:
          {
              custom_sql *func =  (custom_sql *) field->arg1;
              assert(func != 0);
              (*func) (stmt, i, field);
              break;
          }
      }
    }

    /**
     * create the select query and step through the results using callbacks
     */
    int sql_select_query(field_map * table, const char *tablename, sql_callback_t callback, const char *constraints)
    {
      sql_stmt *stmt;
      char buf[1024] = { 0 };
      char columns[1024] = { 0 };
      int i, len;

      for (i = 0; table[i].name != 0; i++) {
          strcat(columns, table[i].name);

          if (table[i + 1].name != 0) {
              strcat(columns, ",");
          }
      }

      len = sprintf(buf, "select %s,%s from %s %s",
                tablenameid(tablename), columns,
                tablename,
                constraints ? constraints : "");

      if (sql_query(buf, len, &stmt) != SQL_OK) {
          return sql_finalize(stmt);
      }
      for (err = sql_step(stmt); err != SQL_DONE; err = sql_step(stmt)) {

          /* check for a table to load */
          for (int i = 0; table && table[i].name != 0; i++) {

              sql_load_columns(stmt, i+2, &table[i]);
          }

          /* check for a callback */
          if(callback) {
              callback(stmt);
          }
      }
      return sql_finalize(stmt);
    }
```
There are still some utility functions and defines used throughout this code.  There is a lot of cleanup and error checking to do here as well.   But you should get the general idea.
