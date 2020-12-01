---
title: C Sqlite Tricks
tags:
  - c
  - programming
  - sqlite
date: 2012-05-15
description: "database mapping"
---

#### Introduction

Thought I would share some tricks I use for easy data CRUD's in C.  I'm using Sqlite here, but could apply to any database.

Not saying its the best approach at all (nor [ryjen/db](https://github.com/ryjen/db)), this is just how it evolved for me.

#### Mapping

The core of my data access is the FieldMap structure, which determines how to save each field to the database.

```c
    /*
     * this is the magical table used to communicate between memory and the database
     */
    typedef struct FieldMap {
      const char   *name;        /* name of the field */
      void        *value;        /* a pointer to the value of the field */
      int         type;          /* type of value */
      const void   *arg1;        /* additional argument */
      const void   *arg2;        /* additional argument */
      int         flags;         /* usage flags */
    } FieldMap;

    /* callback for custom field types */
    typedef int (*CustomField) (sqlite3_stmt *, int column, FieldMap *field);

    typedef void (*DbCallback) (sqlite3_stmt *);
```

<div class="card bg-default">
<b>Note</b>: these examples will create this table dynamically with an object, however this can be used as a static table.

Basically you would have to:<br><br>

<ol>
<li>define a static dummy variable (for account in this case)</li>
<li>build the static mapping table with the dummy variable</li>
<li>do pointer math to subtract the dummy variable and add the real variable</li>
</div>

##### Example 1 - Saving

This high level example shows building a quick table for each field we want to save in the database.   In this case, an account object.


```c
/* The account table name */
#define ACCOUNT_TABLE "account"

/* a structure representing the account fields */
FieldMap account_values[] = {
  {"login", &acc->login, SQL_TEXT},
  {"email", &acc->email, SQL_TEXT},
  {"password", &acc->password, SQL_TEXT},
  {"timezone", &acc->timezone, SQL_INT},
  {0}
};

/* saves the fields to the database */
acc->id = db_save(account_values, ACCOUNT_TABLE, acc->id);
```

```c
sqlite3_int64 db_save(FieldMap *table, const char *tableName, sqlite3_int64 *id)
{
  if (id == 0) {
    if (db_insert_query(table, tableName) != SQL_OK)
        error("could not insert");
    return db_last_insert_rowid();
  } else {
    if (db_update_query(table, tableName, *id) != SQL_OK)
        error("could not update",);
    return id;
  }
}
```

#### Example 2 - Deeper into Saving

The first part of saving is inserting.  The steps are to build a query, bind the values, and execute.  In the case the values from the field map table for an account.


```c
int sql_insert_query(FieldMap *table, const char *tablename)
{
  sqlite3_stmt *stmt;
  char buf[1024] = { 0 };
  char columns[1024] = { 0 };
  char params[1024] = { 0 };
  int len;

  /* create a csv list of columns and params */
  db_build_columns(table, columns);
  db_build_params(table, params);

  len =  sprintf(buf, "INSERT INTO %s (%s) VALUES(%s)", tablename, columns,
        params);

  if (sqlite3_query(buf, len, &stmt) != SQL_OK) {
    return sql_finalize(stmt);
  }

  if (sqlite3_bind_values(stmt, table) != SQL_OK) {
    return sql_finalize(stmt);
  }

  /* execute */
  sqlite3_step(stmt);

  return sqlite3_finalize(stmt);
}
```

<div class="card bg-default">
Updating is basically the same steps, just a different query.
</div>

#### Example 3 - Binding


Have to have a way to bind the FieldMap to the queries, so the following implementations take care of that.

```c
int db_bind_values(sql_stmt *stmt, FieldMap *table)
{
  for (int i = 0; table[i].name != 0; i++) {
    int err = sql_bind_table_value(stmt, i+1, &table[i]);

    if (err != SQL_OK)
        return err;
  }

  return SQL_OK;
}
```


```c
/*
 * binds a single FieldMap value to a query
 */
int db_bind_table_value(sqlite3_stmt *stmt, int column, FieldMap *field)
{
  if (field->value == 0) {
    return sqlite3_bind_null(stmt, column);
  }

  switch (field->type) {
  case SQL_INT:
    return sqlite3_bind_int(stmt, column, *((int*) field->value));
  case SQL_TEXT:
    {
        const char *str = *((const char *) field->value);
        return sqlite3_bind_text(stmt, column, str, strlen(str), 0);
    }
  case SQL_DOUBLE:
    return sqlite3_bind_double(stmt, column, *((double*) field->value));
  case SQL_FLOAT:
    return sqlite3_bind_float(stmt, column, *((float*) field->value));
  case SQL_CUSTOM:
    {
        custom_sql func = (custom_sql) (field->arg1);
        assert(func != 0);
        return (*func) (stmt, column, field);
    }
  default:
    error("unknown save type for field %s", field->name);
    return SQL_NONTYPE;
  }
}
```

#### Example 4 - Loading

This high level example shows loading an account by an id using the same table.

The the query results are assigned to the pointers in the table.

```c
/* loads one account by id */
res = db_load_by_id(account_values, ACCOUNT_TABLE, acc->id);
```


```c
int db_load_by_id(FieldMap *table, const char *tablename, sql_int64 id)
{
  char buf[1024] = {0};

  sprintf(buf, "where %s='%lld'", tablenameId(tablename), id);

  if(db_select_query(0, table, tablename, 0, buf) != SQL_OK) {
    error("could not load");
    return 0;
  }

  return 1;
}
```


Load multiple accounts by using a callback method.

```c
res = db_load_all(ACCOUNT_TABLE, load_account_callback);
```

```c
int db_load_all(const char *tableName, DbCallback callback)
{
  if (db_select_query(0, tableName, callback, 0) != SQL_OK) {
    error("could not load");
    return 0;
  }

  return 1;
}
```

#### Example 5 - Querying

Querying is not too complicated.  Its the typical process of create and execute looping the results.  For each row it will:

1. loading columns into the field map
4. issues the callback if provided


```c
int sql_select_query(FieldMap *table, const char *tablename, DbCallback callback, const char *constraints)
{
  sqlite3_stmt *stmt;
  char buf[1024] = { 0 };
  char columns[1024] = { 0 };
  int column, len;

  /* creates a csv list of columns */
  db_build_columns(table, columns);

  len = sprintf(buf, "SELECT %s,%s FROM %s %s",
            tablenameId(tablename), columns,
            tablename,
            constraints ? constraints : "");

  if (sqlite3_query(buf, len, &stmt) != SQL_OK) {
      return sqlite3_finalize(stmt);
  }
  for (err = sqlite3_step(stmt); err != SQL_DONE; err = sqlite3_step(stmt)) {

      /* check for a table to load */
      for (column = 0; table && table[column].name != 0; column++) {

          /* pass a pointer to the current position in the table */
          db_load_column(stmt, column+1, &table[column]);
      }

      /* check for a callback */
      if(callback) {
          callback(stmt);
      }
  }
  return sqlite3_finalize(stmt);
}
```

#### Example 6 - Deeper into Querying

You saw that querying will load each column in a row.  This function shows how that is done.

```c

void db_load_column(sqlite3_stmt *stmt, int column, FieldMap *field)
{
  switch (field->type) {
  case SQL_INT:
      field_value(int, field) =  sqlite3_column_int(stmt, column);
      break;
  case SQL_TEXT:
      field_value(const char *, field) = str_dup(sqlite3_column_str(stmt, column));
      break;
  case SQL_FLOAT:
      field_value(float, field) = sqlite3_column_float(stmt, column);
      break;
  case SQL_DOUBLE:
      field_value(double, field) = sqlite3_column_double(stmt, column);
      break;
  case SQL_CUSTOM:
      {
          custom_sql *func =  (custom_sql *) field->arg1;
          assert(func != 0);
          (*func) (stmt, column, field);
          break;
      }
  }
}
```

The `field_value` macro turns the field map into something we can assign a result to.


#### Conclusion

C is already a very verbose language, but defining and using a table structure for database operations saves a lot of boiler plate code.


