let currentSlide = 1;
showSlide(currentSlide);

function changeSlide(direction) {
  currentSlide += direction;

  if (currentSlide > 5) {
    currentSlide = 1;
  } else if (currentSlide < 1) {
    currentSlide = 5;
  }

  showSlide(currentSlide);
}

function showSlide(slideNumber) {
  const slides = document.querySelectorAll(".slide");

  slides.forEach(slide => slide.style.display = "none");

  switch(slideNumber) {
    case 1:
      slides[0].style.display = "block";
      break;
    case 2:
      slides[1].style.display = "block";
      break;
    case 3:
      slides[2].style.display = "block";
      break;
    case 4:
      slides[3].style.display = "block";
      break;
    case 5:
      slides[4].style.display = "block";
      break;
    default:
      slides[0].style.display = "block";
  }
}

document.querySelector(".prev").addEventListener("click", function() {
  changeSlide(-1);
});

document.querySelector(".next").addEventListener("click", function() {
  changeSlide(1);
});