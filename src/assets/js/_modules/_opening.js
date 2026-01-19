export default () => {
  setTimeout(() => {
    document.querySelector(".start-modal").classList.add("is-loaded");
    document.querySelector(".start").classList.add("is-loaded");
  }, 10);
};
