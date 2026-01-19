import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default () => {
  const recommendLayardBtn = document.querySelectorAll(".recommend-layard-btn");

  recommendLayardBtn.forEach((btn) => {
    const targetLayered = btn.closest(".result-item").querySelector(".layered");

    // レイアードまでスクロール
    btn.addEventListener("click", (e) => {
      targetLayered.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    });
  });
};
