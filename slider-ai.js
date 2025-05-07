if (document.querySelector(".home-slider")) {
  const $sliderItems = $(".home-slider__set > .home-slider__item");
  const $backgroundItems = $(".home-background__set > .home-background__item");
  const $sliderDots = $(".home-slider__dot-bar__dot");
  const $sliderCards = $(".home-slider__card");
  const $pauseBtn = $(".home-slider__pause-btn");
  const $sliderContainer = $(".home-slider__set");
  const $curves = $(".home-slider__curves__color");

  let totalSlides = $backgroundItems.length;
  let currentSlide = 1;
  let intervalId;
  let isScrolling = false;

  function goToSlide(index, noTransition = false) {
    currentSlide = index;

    // Background image and video logic
    $backgroundItems.removeClass("active");
    $backgroundItems.eq(index - 1).addClass("active");

    $("video", $backgroundItems).each((_, video) => video.pause());
    $("video", $backgroundItems.eq(index - 1)).each((_, video) => video.play());

    // Main slider items
    $(".home-slider__item").removeClass("active active--no-transition");
    const $targetSlide = $sliderItems.eq(index - 1);
    if (noTransition) {
      $pauseBtn.addClass("is-paused");
      $targetSlide.addClass("active active--no-transition");
    } else {
      $targetSlide.addClass("active");
    }

    // Scroll to active
    const scrollPosition = (index - 1) * $(window).width();
    isScrolling = true;
    $sliderContainer.scrollLeft(scrollPosition);
    setTimeout(() => { isScrolling = false }, 100);

    // Update dot & card states
    $sliderCards.removeClass("active");
    $sliderCards.eq(index - 1).addClass("active");

    $sliderDots.removeClass("active");
    $sliderDots.eq(index - 1).addClass("active");

    // Animate curves
    $curves.addClass("tuck-away");
    setTimeout(() => $curves.removeClass("tuck-away"), 1000);
  }

  function autoSlideStart() {
    intervalId = setInterval(() => {
      let next = currentSlide < totalSlides ? currentSlide + 1 : 1;
      goToSlide(next);
    }, 10000);
  }

  function autoSlideStop() {
    clearInterval(intervalId);
  }

  // Init
  $sliderItems.each((i, el) => $(el).attr("data-slide-index", i + 1));
  goToSlide(1);
  autoSlideStart();

  // Events
  $sliderDots.on("click", function (e) {
    e.preventDefault();
    autoSlideStop();
    const index = $(this).index() + 1;
    goToSlide(index);
    $pauseBtn.addClass("is-paused");
  });

  $pauseBtn.on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("is-paused")) {
      goToSlide(currentSlide);
      autoSlideStart();
      $(this).removeClass("is-paused");
    } else {
      autoSlideStop();
      $(this).addClass("is-paused");
      $("video", $backgroundItems).each((_, video) => video.pause());
    }
  });

  // Intersection observer for visibility
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isScrolling) {
        const slideIndex = parseInt($(entry.target).data("slide-index"));
        goToSlide(slideIndex, true);
      }
    });
  }, {
    root: document.querySelector(".home-slider__set"),
    threshold: 0.51
  });

  $sliderItems.each((_, el) => observer.observe(el));
}
