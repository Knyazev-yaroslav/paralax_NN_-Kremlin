"use strict";

window.onload = function () {
  const parallax = document.querySelector(".parallax");

  if (parallax) {
    const content = document.querySelector(".parallax__container");
    const clouds = document.querySelector(".images-parallax__clouds");
    const mountains = document.querySelector(".images-parallax__mountains");
    const city = document.querySelector(".images-parallax__city");

    // Коэффициенты
    const forClouds = 40;
    const forMountains = 30;
    const forCity = 25;

    //Скорость анимации
    const speed = 0.05;

    let positionX = 0,
      positionY = 0;
    let coordXprocent = 0,
      coordYprocent = 0;

    const setMaouseParallaxStyle = () => {
      const distX = coordXprocent - positionX;
      const distY = coordYprocent - positionY;

      positionX = positionX + distX * speed;
      positionY = positionY + distY * speed;

      clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${
        positionY / forClouds
      }%);`;
      mountains.style.cssText = `transform: translate(${
        positionX / forMountains
      }%, ${positionY / forMountains}%);`;
      city.style.cssText = `transform: translate(${positionX / forCity}%, ${
        positionY / forCity
      }%);`;

      requestAnimationFrame(setMaouseParallaxStyle);
    };
    setMaouseParallaxStyle();

    parallax.addEventListener("mousemove", (e) => {
      const parallaxWidth = parallax.offsetWidth;
      const parallaxHeight = parallax.offsetHeight;

      const coordX = e.pageX - parallaxWidth / 2;
      const coordY = e.pageY - parallaxHeight / 2;

      coordXprocent = (coordX / parallaxWidth) * 100;
      coordYprocent = (coordY / parallaxHeight) * 100;
    });

    let thresholdSets = [];
    for (let i = 0; i <= 1.0; i += 0.005) {
      thresholdSets.push(i);
    }
    const callback = (entries, observer) => {
      const scrollTopProcent =
        (window.pageYOffset / parallax.offsetHeight) * 100;
      setParallaxItemsStyle(scrollTopProcent);
    };

    const observer = new IntersectionObserver(callback, {
      threshold: thresholdSets,
    });

    observer.observe(document.querySelector(".content"));

    const setParallaxItemsStyle = (scrollTopProcent) => {
      content.style.cssText = `tranform: translate(0%, -${
        scrollTopProcent / 9
      }%);`;
      mountains.parentElement.style.cssText = `transform: translate(0%,-${
        scrollTopProcent / 6
      }%);`;
      city.parentElement.style.cssText = `transform: translate(0%,-${
        scrollTopProcent / 3
      }%);`;
    };
  }
};
