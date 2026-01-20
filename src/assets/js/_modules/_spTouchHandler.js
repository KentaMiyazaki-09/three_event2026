/**
 * タップした時にclassを付与
 */
function addTouchHandler(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    let timer = null;

    const onDown = () => {
      el.classList.add("is-hover");
      clearTimeout(timer);
      // 保険： 1秒後には必ず消す
      timer = setTimeout(() => el.classList.remove("is-hover"), 1000);
    };

    const onUp = () => {
      clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove("is-hover"), 300);
    };

    const onCancel = () => {
      clearTimeout(timer);
      el.classList.remove("is-hover");
    };

    // 画面操作
    el.addEventListener("pointerdown", onDown, { passive: true });
    el.addEventListener("pointerup", onUp, { passive: true });
    el.addEventListener("pointercancel", onCancel, { passive: true });
    el.addEventListener("pointerleave", onCancel, { passive: true });
  });
}

export default () => {
  addTouchHandler("#start-button");
  addTouchHandler(".button");
};
