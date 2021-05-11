const DELAY_PAUSE = 3000,
  ANIMATION_TIME = 150,
  IMAGE_WIDTH = 940,
  IMAGE_HEIGHT = 627,
  SLIDER_BUTTON_ICON_COLOR = "white",
  INACTIVE_CAROUSEL_INDICATOR_BG_COLOR = "rgba(255, 255, 255, 0.7)",
  ACTIVE_CAROUSEL_INDICATOR_BG_COLOR = "rgb(0,150,255)";

const CAROUSEL_CONTAINER = document.querySelector(".carousel-container");
const CAROUSEL_IMAGE_WRAPPER = document.querySelector(
  ".carousel-image-wrapper"
);

CAROUSEL_CONTAINER.style.display = "none";

const IMAGES = document.querySelectorAll(".carousel-image-wrapper img");
const NUMBER_OF_IMAGE = IMAGES.length;

let sliderBtnContainer = document.createElement("div"),
  previousButton = document.createElement("i"),
  nextButton = document.createElement("i");

// Previous Button
previousButton.setAttribute("id", "#prev-btn");
previousButton.setAttribute("class", "fas fa-chevron-left");
previousButton.style.position = "absolute";
previousButton.style.top = "50%";
previousButton.style.left = "0";
previousButton.style.padding = "100px 50px";
previousButton.style.transform = "translate(0, -50%)";
previousButton.style.color = SLIDER_BUTTON_ICON_COLOR;
previousButton.style.fontSize = "30px";
previousButton.style.border = "none";
previousButton.style.cursor = "pointer";

// Next Button
nextButton.setAttribute("id", "#nextButton");
nextButton.setAttribute("class", "fas fa-chevron-right");
nextButton.style.position = "absolute";
nextButton.style.top = "50%";
nextButton.style.right = "0";
nextButton.style.padding = "100px 50px";
nextButton.style.transform = "translate(0,-50%)";
nextButton.style.color = SLIDER_BUTTON_ICON_COLOR;
nextButton.style.fontSize = "30px";
nextButton.style.border = "none";
nextButton.style.cursor = "pointer";

sliderBtnContainer.appendChild(previousButton);
sliderBtnContainer.appendChild(nextButton);
CAROUSEL_CONTAINER.appendChild(sliderBtnContainer);

// Carousel Container
CAROUSEL_CONTAINER.style.width = IMAGE_WIDTH + "px";
CAROUSEL_CONTAINER.style.height = IMAGE_HEIGHT + "px";
CAROUSEL_CONTAINER.style.overflow = "hidden";
CAROUSEL_CONTAINER.style.margin = "0 auto";
CAROUSEL_CONTAINER.style.position = "relative";

// Carousel Image Wrapper
CAROUSEL_IMAGE_WRAPPER.style.marginLeft = "0px";
CAROUSEL_IMAGE_WRAPPER.style.width = IMAGE_WIDTH * NUMBER_OF_IMAGE + "px";
CAROUSEL_IMAGE_WRAPPER.style.height = IMAGE_HEIGHT;

// Indicator Dot
let indicatorDot = document.createElement("div");
indicatorDot.className = "dots-wrapper";
indicatorDot.style.display = "inline-block";
indicatorDot.style.position = "absolute";
indicatorDot.style.left = "50%";
indicatorDot.style.transform = "translate(-50%, 0%)";
indicatorDot.style.bottom = "5px";
indicatorDot.margin = "0, auto";
CAROUSEL_CONTAINER.appendChild(indicatorDot);

for (image of IMAGES) {
  image.style.maxWidth = IMAGE_WIDTH + "px";
  image.style.height = IMAGE_HEIGHT + "px";
  image.style.float = "left";

  // Carousel Indicator
  let indicator = document.createElement("div");
  indicator.className = "indicator";
  indicator.style.display = "inline-block";
  indicator.style.height = "15px";
  indicator.style.width = "15px";
  indicator.style.background = INACTIVE_CAROUSEL_INDICATOR_BG_COLOR;
  indicator.style.borderRadius = "50%";
  indicator.style.marginRight = "15px";
  indicator.style.cursor = "pointer";
  indicatorDot.appendChild(indicator);
}

let listOfIndicator = document.querySelectorAll(".dots-wrapper .indicator");

let isTransiting = false;
// Current Image
let currentImageIndicator = () => {
  listOfIndicator.forEach((eachIndicator, index) => {
    eachIndicator.style.background = INACTIVE_CAROUSEL_INDICATOR_BG_COLOR;

    eachIndicator.addEventListener("click", (e) => {
      if (!isTransiting) {
        listOfIndicator[
          currentIndex - 1
        ].style.background = INACTIVE_CAROUSEL_INDICATOR_BG_COLOR;
        if (currentIndex != index + 1)
          currentIndex = carouselTransition(currentIndex, index + 1);
        listOfIndicator[
          currentIndex - 1
        ].style.background = ACTIVE_CAROUSEL_INDICATOR_BG_COLOR;
      }
    });

    eachIndicator.addEventListener("mouseenter", (e) => {
      clearInterval(autoAnimate);
      autoAnimate = null;
    });

    eachIndicator.addEventListener("mouseout", (e) => {
      if (!autoAnimate) autoAnimate = setInterval(animate, DELAY_PAUSE);
    });
  });

  listOfIndicator[
    currentIndex - 1
  ].style.background = ACTIVE_CAROUSEL_INDICATOR_BG_COLOR;
};

let isNextImageReq,
  isPrevImageReq,
  marginLeft = 0,
  currentIndex = 1;

let carouselTransition = (currentIndex, nextIndex) => {
  isTransiting = true;
  let indexDiff = nextIndex - currentIndex;
  let totalMarginDistance = indexDiff * IMAGE_WIDTH;
  let transitionSpeed = totalMarginDistance / ANIMATION_TIME;
  isNextImageReq = nextIndex > currentIndex ? true : false;
  isPrevImageReq = nextIndex < currentIndex ? true : false;

  var transition = setInterval(() => {
    marginLeft -= transitionSpeed;
    CAROUSEL_IMAGE_WRAPPER.style.marginLeft = `${marginLeft}px`;

    if (isNextImageReq && marginLeft < -(nextIndex - 1) * IMAGE_WIDTH) {
      clearInterval(transition);
      marginLeft = -(nextIndex - 1) * IMAGE_WIDTH;
      CAROUSEL_IMAGE_WRAPPER.style.marginLeft = `${marginLeft}px`;
      isTransiting = false;
    }

    if (isPrevImageReq && marginLeft > -(nextIndex - 1) * IMAGE_WIDTH) {
      clearInterval(transition);
      marginLeft = -(nextIndex - 1) * IMAGE_WIDTH;
      CAROUSEL_IMAGE_WRAPPER.style.marginLeft = `${marginLeft}px`;
      isTransiting = false;
    }
  }, 1);

  return (currentIndex = nextIndex);
};

// Animate Carousel
let animate = () => {
  if (currentIndex == NUMBER_OF_IMAGE) {
    currentIndex = 1;
    currentIndex = carouselTransition(NUMBER_OF_IMAGE, currentIndex);
  } else if (currentIndex < 1) {
    currentIndex = NUMBER_OF_IMAGE;
    currentIndex = carouselTransition(1, NUMBER_OF_IMAGE);
  } else {
    currentIndex = carouselTransition(currentIndex, currentIndex + 1);
  }
  currentImageIndicator();
};

let autoAnimate;
window.onload = (e) => {
  CAROUSEL_CONTAINER.style.display = "block";
  autoAnimate = setInterval(animate, DELAY_PAUSE);
  currentImageIndicator();
};

// Previous button functionality
previousButton.addEventListener("click", (e) => {
  if (!isTransiting) {
    if (currentIndex < 2) {
      currentIndex = NUMBER_OF_IMAGE;
      currentIndex = carouselTransition(1, NUMBER_OF_IMAGE);
    } else {
      currentIndex = carouselTransition(currentIndex, currentIndex - 1);
    }
  }
  currentImageIndicator();
});

// Next button functionality
nextButton.addEventListener("click", (e) => {
  if (!isTransiting) {
    if (currentIndex == NUMBER_OF_IMAGE) {
      currentIndex = 1;
      currentIndex = carouselTransition(NUMBER_OF_IMAGE, currentIndex);
    } else {
      currentIndex = carouselTransition(currentIndex, currentIndex + 1);
    }
  }
  currentImageIndicator();
});
