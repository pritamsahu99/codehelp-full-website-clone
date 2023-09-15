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
window.onload = function() {
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
    css.t = "text/css";
    document.body.appendChild(css);
};
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