let listBg = document.querySelectorAll('.bg');
let banner = document.querySelector('.banner');
let sections = document.querySelectorAll('.section');
let container = document.querySelector('.container');
let heightDefault = container.offsetHeight;
let topBefore = 0;
let body = document.querySelector('body');

window.addEventListener(
  'wheel',
  function (event) {
    event.preventDefault();
    const scrollSpeed = 0.2;
    const scrollValue = window.scrollY + (event.deltaY / 3) * scrollSpeed;
    window.scrollTo(0, scrollValue);

    let top = scrollValue;
    listBg.forEach((bg, index) => {
      if (index != 0) {
        bg.animate(
          {
            transform: `translateY(${-top * index}px)`,
          },
          { duration: 1000, fill: 'forwards' }
        );
      }
      if (index == listBg.length - 1) {
        sections.forEach((section) => {
          section.animate(
            {
              transform: `translateY(${-top * index}px)`,
            },
            { duration: 500, fill: 'forwards' }
          );
        });

        if (topBefore < top) {
          setHeight = heightDefault - window.scrollY * index;
          container.animate(
            {
              height: `${setHeight + 100}px`,
            },
            { duration: 50, fill: 'forwards' }
          );
          topBefore = window.scrollY;
        }
      }
      sections.forEach((section, index) => {
        // console.log(section.offsetTop - top, window.innerHeight);
        if (section.offsetTop - top <= window.innerHeight * (index + 1)) {
          let content = section.getElementsByClassName('content')[0];
          let transformContent = window.innerHeight * (index + 1) - (section.offsetTop - top);
          console.log(section);
          content.animate(
            {
              transform: `translateY(${-transformContent + 100 * index}px)`,
            },
            { duration: 500, fill: 'forwards' }
          );
        }
      });
    });
  },
  { passive: false }
);
