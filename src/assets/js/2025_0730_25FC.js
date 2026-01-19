import opening from "./_modules/_opening.js";
import chartApp from "./_modules/_chartApp.js";
import gradientCanvas from "./_modules/_gradientCanvas.js";
import goToBtn from "./_modules/_goToBtn.js";
import recommendLayardBtn from "./_modules/_recommendLayardBtn.js";
import copyUrlBtn from "./_modules/_copyUrlBtn.js";
import spTouchHandler from "./_modules/_spTouchHandler.js";
// import loading from "./_modules/_loading.js";

window.onload = async () => {
  gradientCanvas();
  const instance = new chartApp();
  instance.showResultByURLParams().then(() => {
    opening();
    goToBtn();
    recommendLayardBtn();
    copyUrlBtn();
    spTouchHandler();
    // loading();
  });
};
