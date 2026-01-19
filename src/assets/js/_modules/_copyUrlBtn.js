export default () => {
  const copyBtn = document.querySelectorAll(".share-list__item--copy");
  const toast = document.getElementById("toast");

  copyBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      /* URLをコピー */
      const url = decodeURIComponent(e.currentTarget.dataset.url);
      navigator.clipboard.writeText(url);

      /* トーストを表示 */
      toast.classList.add("active");
      setTimeout(() => {
        toast.classList.remove("active");
      }, 1500);
    });
  });
};
