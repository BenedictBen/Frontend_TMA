// Navbar
document.addEventListener("DOMContentLoaded", function() {
    // Fetch the navbar HTML content
    fetch('navbar.html')
      .then(response => response.text())
      .then(data => {
        // Insert the navbar content into the container
        document.getElementById('navbar-container').innerHTML = data;
      })
      .catch(error => {
        console.error('Error loading the navbar:', error);
      });
  });

  document.addEventListener("DOMContentLoaded", function() {
    // Fetch the footer HTML content
    fetch('footer.html')
      .then(response => response.text())
      .then(data => {
        // Insert the footer content into the container
        document.getElementById('footer-container').innerHTML = data;
      })
      .catch(error => {
        console.error('Error loading the footer:', error);
      });
  });




//   Slide show
let slideIndex = 0;

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Reset all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Show the next slide
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";

  // Change slide every 2 seconds
  setTimeout(showSlides, 2000); // 2000ms = 2 seconds
}

// Initialize the slideshow
showSlides();
  

