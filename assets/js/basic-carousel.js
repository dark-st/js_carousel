class Carousel {
  constructor(o) {
    const settings = {
      ...{
        containerID: '#carousel',
        slideID: '.slide',
        interval: 5000,
        isPlaying: true,
      },
      ...o,
    };
    this.container = document.querySelector(settings.containerID);
    this.slidesContainer = this.container.querySelector('#slides-container');
    this.slides = this.slidesContainer.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlaying = settings.isPlaying;
  }

  _initProps() {
    this.SLIDES_COUNT = this.slides.length;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE = '<i class="fa-solid fa-circle-pause"></i>';
    this.FA_PLAY = '<i class="fa-solid fa-circle-play"></i>';
    this.FA_PREV = '<i class="fa-solid fa-circle-arrow-left"></i>';
    this.FA_NEXT = '<i class="fa-solid fa-circle-arrow-right"></i>';

    this.currentSlide = 0;
  }

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = `<span class="control control--pause" type="button" id="pause-btn">
    <span id="fa-pause-icon">${this.FA_PAUSE}</span>
    <span id="fa-play-icon">${this.FA_PLAY}</span>
    </span>`;
    const PREV = `<span class="control control--prev" type="button" id="prev-btn">${this.FA_PREV}</span>`;
    const NEXT = ` <span class="control control-=next" type="button" id="next-btn">${this.FA_NEXT}</span>`;

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.append(controls);

    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');
    this.nextBtn = this.container.querySelector('#next-btn');

    this.pauseIcon = this.container.querySelector('#fa-pause-icon');
    this.playIcon = this.container.querySelector('#fa-play-icon');

    this.isPlaying ? this._pauseVisible() : this._playVisible();
  }

  _initIndicators() {
    const indicators = document.createElement('div');
    indicators.setAttribute('class', 'indicators');

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('div');
      indicator.setAttribute(
        'class',
        i !== 0 ? 'indicator' : 'indicator active'
      );
      indicator.dataset.slideTo = `${i}`;

      indicators.append(indicator);
    }

    this.container.append(indicators);

    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
  }

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.slidesContainer.addEventListener('mouseenter', this._pause.bind(this));
    this.slidesContainer.addEventListener('mouseleave', this._play.bind(this));
    this.indicatorsContainer.addEventListener(
      'click',
      this._indicate.bind(this)
    );
    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
  }

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  }

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  }

  _play() {
    if (!this.isPlaying) {
      this._pauseVisible();
      this.isPlaying = true;
      this._tick();
    }
  }

  _pause() {
    if (this.isPlaying) {
      this._playVisible();
      this.isPlaying = false;
      clearInterval(this.timerID);
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }

  _indicate(e) {
    const target = e.target;

    if (target && target.classList.contains('indicator')) {
      this._gotoNth(+target.dataset.slideTo);
      this._pause();
    }
  }

  _tick(flag = true) {
    if (!flag) return;
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  }

  _pauseVisible(isVisible = true) {
    isVisible
      ? (this.pauseIcon.style.opacity = 1)
      : (this.pauseIcon.style.opacity = 0);
    isVisible
      ? (this.playIcon.style.opacity = 0)
      : (this.playIcon.style.opacity = 1);
  }

  _playVisible() {
    this._pauseVisible(false);
  }

  pausePlay() {
    this.isPlaying ? this._pause() : this._play();
  }

  prev() {
    this._pause();
    this._gotoPrev();
  }

  next() {
    this._pause();
    this._gotoNext();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick(this.isPlaying);
  }
}

export default Carousel;
