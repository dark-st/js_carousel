// import Carousel from './basic-carousel';
import SwipeCarousel from './advanced-carousel.js';

const carousel = new SwipeCarousel({
  containerID: '#carousel',
  slideID: '.slide',
  interval: 2000,
  isPlaying: true,
});

carousel.init();
