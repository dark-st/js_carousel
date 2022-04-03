import Carousel from './basic-carousel.js';

class SwipeCarousel extends Carousel {
  _initListeners() {
    super._initListeners();
    this.slidesContainer.addEventListener(
      'touchstart',
      this._swipeStart.bind(this)
    );
    this.slidesContainer.addEventListener(
      'touchend',
      this._swipeEnd.bind(this)
    );
  }

  _swipeStart(e) {
    this.swipeStartX = e.changedTouches[0].pageX;
  }

  _swipeEnd(e) {
    this.swipeEndX = e.changedTouches[0].pageX;
    this.swipeStartX - this.swipeEndX < -100 && this.prev();
    this.swipeStartX - this.swipeEndX > 100 && this.next();
  }
}

export default SwipeCarousel;
