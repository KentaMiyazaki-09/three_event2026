import EmblaCarousel from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";

export default () => {
  const node = document.querySelector(".loading__slider");
  const options = { loop: true, draggable: false, align: "start" };
  const plugins = [
    AutoScroll({
      speed: 0.5,
      stopOnInteraction: false,
    }),
  ];

  EmblaCarousel(node, options, plugins);
};
