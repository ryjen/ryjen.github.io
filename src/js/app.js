
var slides = document.querySelectorAll('#doodles .slider .slide');
var currentSlide = 0;
var slideInterval = null;
var SLIDE_TIME = 10000;


function changeSlide(getter) {
  slides[currentSlide].className = 'slide';
  currentSlide = getter()
  slides[currentSlide].className = 'slide showing';
}

function nextSlideIndex() {
  return (currentSlide+1)%slides.length;
}

function prevSlideIndex() {
  var value = currentSlide;
  if (--value < 0) {
    value = slides.length-1;
  }
  return value
}

function nextSlide() {
  changeSlide(nextSlideIndex);
}

function prevSlide() {
  changeSlide(prevSlideIndex);
}

function resumeSliding() {
  if (slideInterval == null) {
    slideInterval = setInterval(nextSlide, SLIDE_TIME);
  }
}

function pauseSliding() {
  if (slideInterval != null){
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

function scaleImage() {
  this.classList.toggle("expand");
}

var images = document.querySelectorAll('#doodles .slider .slide img');

for (var i = 0; i < images.length; i++) {
  images[i].onclick = scaleImage.bind(images[i]);
}

var nextButton = document.getElementById('next')
if (nextButton != null) {
  nextButton.onclick = nextSlide
}
var prevButton = document.getElementById('prev')
if (prevButton != null) {
  prevButton.onclick = prevSlide
}

var pauseButton = document.getElementById('pause')
if (pauseButton != null) {
  pauseButton.onclick = pauseSliding;
}

var resumeButton = document.getElementById('resume')
if (resumeButton != null) {
  resumeButton.onclick = resumeSliding;
}

changeSlide(function() { return 0; });
resumeSliding();
