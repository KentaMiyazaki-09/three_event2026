/* スタートボタン */
const startButton = (appInstance) => {
  const startButtonElemenet = document.getElementById("start-button");
  if (!startButtonElemenet) return;
  startButtonElemenet.addEventListener("click", () => {
    appInstance.isStart = false;
    appInstance.isQuestion = true;
    appInstance.questionNum = 1;
    appInstance.changeDomByState();
  });
};

/* 回答ボタン */
const answerButtons = (appInstance) => {
  const answerButtonsElemenet = document.querySelectorAll(".button");
  if (answerButtonsElemenet.length < 0) return;

  answerButtonsElemenet.forEach((button) => {
    button.addEventListener("click", async (el) => {
      const element = el.currentTarget;

      /* 質問３まではポイント計算 */
      if (appInstance.questionNum <= 2) {
        appInstance.totalPoint.push(parseInt(element.dataset.point, 10));
        appInstance.questionNum += 1;
      } else {
        /* 質問4はタイプを選択 */
        // appInstance.favo = parseInt(element.dataset.favo, 10);

        /* 質問4以上の場合はローディングを表示 */
        // appInstance.loading = true;

        /* 結果画面を表示 */
        appInstance.isQuestion = false;
        appInstance.isResult = true;
      }

      appInstance.changeDomByState();

      /* ローディング表示中の場合は3秒待ってから結果表示 */
      // if (appInstance.loading) {
      //   await appInstance.tick(0);
      //   appInstance.isQuestion = false;
      //   appInstance.loading = false;
      //   appInstance.isResult = true;
      //   appInstance.changeDomByState();
      // }
    });
  });
};

/* Re:スタートボタン */
const restartButton = (appInstance) => {
  const restartButtonElemenets = document.querySelectorAll(".restart-btn");
  if (!restartButtonElemenets.length) return;
  restartButtonElemenets.forEach((element) => {
    element.addEventListener("click", () => {
      appInstance.totalPoint = [];
      appInstance.favo = "0";
      appInstance.isStart = true;
      appInstance.isQuestion = false;
      appInstance.questionNum = 0;
      appInstance.loading = false;
      appInstance.isResult = false;
      appInstance.changeDomByState();

      // urlからパラメーターを削除
      const url = new URL(window.location.href);
      url.search = ""; // ?xxx=u¥yyy削除
      window.history.replaceState({}, document.title, url.toString());
    });
  });
};

/* 前の質問に戻るボタン */
const prevButton = (appInstance) => {
  const prevButtonElemenet = document.getElementById("prev-btn");
  if (!prevButtonElemenet) return;

  prevButtonElemenet.addEventListener("click", () => {
    appInstance.questionNum -= 1;
    appInstance.totalPoint.pop();
    appInstance.changeDomByState();
  });
};

/* 質問画面のフッターロゴ */
const questionFooterLogo = (appInstance) => {
  const questionFooterLogo = document.getElementById("question-footer-logo");

  if (!questionFooterLogo) return;
  questionFooterLogo.addEventListener("click", () => {
    appInstance.totalPoint = [];
    appInstance.favo = "0";
    appInstance.isStart = true;
    appInstance.isQuestion = false;
    appInstance.questionNum = 0;
    appInstance.loading = false;
    appInstance.isResult = false;
    appInstance.changeDomByState();

    // テスト用
    removeTotalPoint();
  });
};

/* 結果画面のロゴ */
const resultLogo = (appInstance) => {
  const resultLogo = document.getElementById("result-logo");

  if (!resultLogo) return;
  resultLogo.addEventListener("click", () => {
    appInstance.totalPoint = [];
    appInstance.favo = "0";
    appInstance.isStart = true;
    appInstance.isQuestion = false;
    appInstance.questionNum = 0;
    appInstance.loading = false;
    appInstance.isResult = false;
    appInstance.changeDomByState();

    // テスト用
    removeTotalPoint();
  });
};

export {
  startButton,
  answerButtons,
  restartButton,
  prevButton,
  questionFooterLogo,
  resultLogo,
};
