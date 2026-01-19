import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default () => {
  const goToBtn = document.querySelectorAll(".goToBtn");

  goToBtn.forEach((btn) => {
    const targetLayered = btn.nextElementSibling;

    const result = btn.closest(".result");

    // レイアードが見えたら消す
    ScrollTrigger.create({
      scroller: result,
      trigger: targetLayered,
      start: "top-=180 center",
      toggleClass: { targets: btn, className: "hide" },
      // markers: true,
      // once: true,
    });

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
