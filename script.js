//--------------Typewriter Texts Takes Place Here---------------------------------------------------
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};
TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="typewriter">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }
    setTimeout(function() {
    that.tick();
    }, delta);
};
window.addEventListener("load", function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS 
    var css = document.createElement("style");
    css.text = "text/css";
    document.body.appendChild(css);
});

//-------------------CodeHelp Blur Loader------------------------------------------

const loader = document.getElementById("blur-container");
const wrapper = document.getElementById("container");

function animateEffects() {
  let scaleValue = 0; // Initial scale value

  const animationInterval = setInterval(() => {
    scaleValue += 0.02; // Adjust the increment for a smoother transition
    loader.style.transform = `scale(${scaleValue})`;

    if (scaleValue >= 1) {
      clearInterval(animationInterval);
      setTimeout(zoomInImage, 1500); // Call the zoomInImage function after a delay
    }
  }, 25); // Adjust the interval for smoother animation
}

function zoomInImage() {
  let blurAmount = 0; 
  let scaleValue = 1; 

  const zoomInterval = setInterval(() => {
    blurAmount += 1;
    scaleValue += 0.1;
    loader.style.filter = `blur(${blurAmount}px)`;
    loader.style.transform = `scale(${scaleValue})`;
  
    if (blurAmount >= 20) {
      clearInterval(zoomInterval);
      loader.style.display = "none";
      loader.style.opacity = 0;
      wrapper.style.display = "block";
    }
  }, 60); // Adjust the interval for smoother animation
}
window.addEventListener("load", animateEffects);

//-------------Animations Takes Place Here----------------------------------------------------

const sections = document.querySelectorAll('section');
let prevScrollY = window.scrollY;
window.onscroll = () => {
  const currentScrollY = window.scrollY;
  // Check if scrolling down (currentScrollY > prevScrollY)
  if (currentScrollY > prevScrollY) {
    sections.forEach(sec => {
      let offset = sec.offsetTop - 500;
      let height = sec.offsetHeight;
      if (currentScrollY >= offset && currentScrollY < offset + height) {
        sec.classList.add('animate__animated');
      } else {
        sec.classList.remove('animate__animated');
      }
    });
  }     
  prevScrollY = currentScrollY; // Update the previous scroll position
};

//-------------------CodeHelp ToggleDark Mode------------------------------------------
// document.getElementById('svg1').addEventListener('click', function() {
//   document.getElementById('svg1').style.display = 'none';
//   document.getElementById('svg2').style.display = 'block';
// });
// // Add a click event listener to the second SVG
// document.getElementById('svg2').addEventListener('click', function() {
//   document.getElementById('svg2').style.display = 'none';
//   document.getElementById('svg1').style.display = 'block';
// });


// Function to increase numbers with varying speeds
const valueDisplays = document.querySelectorAll('#num');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounting(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

valueDisplays.forEach(valueDisplay => {
  observer.observe(valueDisplay);
});

function startCounting(valueDisplay) {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute('data-val'));
  let duration = 2000; // Duration for the count-up animation in milliseconds
  let startTime;

  function updateNumber(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const percentage = Math.min(progress / duration, 1);
    valueDisplay.textContent = Math.floor(percentage * endValue);
    if (progress < duration) {
      requestAnimationFrame(updateNumber);
    } else {
      valueDisplay.textContent = endValue; // Ensure the final value is accurate
    }
  }

  requestAnimationFrame(updateNumber);
}
