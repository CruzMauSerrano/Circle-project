document.querySelector(".burger-menu").addEventListener("click", function () {
    document.querySelector(".main-nav").classList.toggle("nav-active");
    document.querySelector(".burger-menu").classList.toggle("grey-background");
    const burgerLines = document.querySelectorAll(".burger-menu .line");
    burgerLines.forEach((line) => {
      line.classList.toggle("white");
    });
  
    document.body.classList.toggle("no-scroll");
  });
  