function addTouchHandler(name) {
  document.querySelectorAll(name).forEach((el) => {
    el.addEventListener("touchstart", function () {
      this.classList.add("is-hover");
    });
    el.addEventListener("touchend", function () {
      setTimeout(() => {
        this.classList.remove("is-hover");
      }, 500);
    });
  });
}

export default () => {
  addTouchHandler("#start-button");
  addTouchHandler(".button");
};
