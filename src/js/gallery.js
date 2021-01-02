var Gallery = (function() {
  var gallery = {}

  var slides = null
  var currentSlide = 0
  var slideInterval = null
  var SLIDE_TIME = 10000


  function changeSlide(getter) {
    if (!slides || slides.length === 0) { return }
    slides[currentSlide].className = 'slide'
    currentSlide = getter()
    slides[currentSlide].className = 'slide showing'
  }

  function nextSlideIndex() {
    if (!slides) { return 0 }
    return (currentSlide+1)%slides.length
  }

  function prevSlideIndex() {
    if (!slides) { return 0 }
    var value = currentSlide
    if (--value < 0) {
      value = slides.length-1
    }
    return value
  }

  function nextSlide() {
    changeSlide(nextSlideIndex)
  }

  function prevSlide() {
    changeSlide(prevSlideIndex)
  }

  function resumeSliding() {
    if (slideInterval == null) {
      slideInterval = setInterval(nextSlide, SLIDE_TIME)
    }
  }

  function pauseSliding() {
    if (slideInterval != null){
      clearInterval(slideInterval)
      slideInterval = null
    }
  }

  function scaleImage() {
    this.classList.toggle("expand")
  }

  function initUI() {
    slides = $('#doodles .slider .slide')

    var images = $('#doodles .slider .slide img')

    if (images) {
      for (var i = 0; i < images.length; i++) {
        images[i].click(scaleImage)
      }
    }

    var nextButton = $('#next')
    if (nextButton != null) {
      nextButton.click(nextSlide)
    }
    var prevButton = $('#prev')
    if (prevButton != null) {
      prevButton.click(prevSlide)
    }

    var pauseButton = $('#pause')
    if (pauseButton != null) {
      pauseButton.click(function() {
        if ($(this).hasClass("fa-pause")) {
          pauseSliding()
          $(this).find('[data-fa-i2svg]')
            .toggleClass("fa-play")
        } else {
          resumeSliding()
          $(this).find('[data-fa-i2svg]')
            .toggleClass("fa-pause")
        }
      })
    }
  }

  gallery.start = function() {
    initUI()
    changeSlide(function() { return 0 })
    resumeSliding()
  }
  return gallery
})()
