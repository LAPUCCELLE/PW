import { Autoplay, Pagination } from 'swiper/modules';

const getSwiperSettings = () => ({
  modules: [Autoplay, Pagination],
  spaceBetween: 30,
  slidesPerView: 6,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: { clickable: true },
  breakpoints: {
    768: { slidesPerView: 1 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 6 }
  }
});

export default getSwiperSettings;