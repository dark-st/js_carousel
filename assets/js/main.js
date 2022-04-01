(function () {
  const carousel = document.querySelector('#carousel');
  const slidesContainer = carousel.querySelector('#slides-container');
  const slides = slidesContainer.querySelectorAll('.slide');
  const indicatorsContainer = carousel.querySelector('.indicators');
  const indicators = indicatorsContainer.querySelectorAll('.indicator');
  const pauseBtn = carousel.querySelector('#pause-btn');
  const prevBtn = carousel.querySelector('#prev-btn');
  const nextBtn = carousel.querySelector('#next-btn');

  const SLIDES_COUNT = slides.length;
  const CODE_LEFT_ARROW = 'ArrowLeft';
  const CODE_RIGHT_ARROW = 'ArrowRight';
  const CODE_SPACE = 'Space';
  const FA_PAUSE = '<i class="fa-solid fa-circle-pause"></i>';
  const FA_PLAY = '<i class="fa-solid fa-circle-play"></i>';

  let currentSlide = 0;
  let interval = 2000;
  let timerID = null;
  let isPlaying = true;
  let swipeStartX = null;
  let swipeEndX = null;
  function gotoNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  }

  function gotoNext() {
    gotoNth(currentSlide + 1);
  }

  function gotoPrev() {
    gotoNth(currentSlide - 1);
  }
  function play() {
    timerID = setInterval(gotoNext, interval);
    pauseBtn.innerHTML = FA_PAUSE;
    isPlaying = true;
  }
  function pause() {
    clearInterval(timerID);
    pauseBtn.innerHTML = FA_PLAY;
    isPlaying = false;
  }

  const pausePlay = () => (isPlaying ? pause() : play());

  function prev() {
    pause();
    gotoPrev();
  }

  function next() {
    pause();
    gotoNext();
  }

  function indicate(e) {
    const target = e.target;

    if (target && target.classList.contains('indicator')) {
      gotoNth(+target.dataset.slideTo);
      pause();
    }
  }

  function pressKey(e) {
    if (e.code === CODE_LEFT_ARROW) prev();
    if (e.code === CODE_RIGHT_ARROW) next();
    if (e.code === CODE_SPACE) pausePlay();
  }

  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
  }

  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    swipeStartX - swipeEndX < -100 && prev();
    swipeStartX - swipeEndX > 100 && next();
  }

  function initListeners() {
    pauseBtn.addEventListener('click', pausePlay);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    indicatorsContainer.addEventListener('click', indicate);
    slidesContainer.addEventListener('touchstart', swipeStart);
    slidesContainer.addEventListener('touchend', swipeEnd);
    document.addEventListener('keydown', pressKey);
  }

  function init() {
    initListeners();
    timerID = setInterval(gotoNext, interval);
  }

  init();
})();
