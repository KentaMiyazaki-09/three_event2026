import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * isStartがtrueならスタート画面とグラデーション　grayを表示
 * @param { boolean } isStart
 */
const toggleStart = (isStart) => {
  document.getElementById("start-modal").classList.toggle("active", isStart);

  // グラデーション　gray
  document.querySelector(".gradations").classList.toggle("is-gray", isStart);
};

/**
 * isQuestionがtrueなら質問とグラデーション　questionを表示
 * @param { boolean } isQuestion
 * @param { boolean } isLoading
 */
const toggleQuestion = (isQuestion) => {
  document
    .getElementById("question-modal")
    .classList.toggle("active", isQuestion);

  // グラデーション　question
  document
    .querySelector(".gradations")
    .classList.toggle("is-question", isQuestion);
};

/*
 * isQuestionがtrueなら表示、questionNumで表示する質問を選択
 * @param { boolean } isQuestion
 * @param { Number } questionNum
 * @param { boolean } isLoading
 */
const toggleQuestionItem = (isQuestion, questionNum, isLoading) => {
  document.querySelectorAll(".question-item").forEach((item) => {
    item.classList.remove("active");
  });
  if (!isQuestion) return;

  const questionElement = document.querySelector(
    `.question-item[data-question-item="${questionNum}"]`
  );
  if (!questionElement || isLoading) return;
  questionElement.classList.add("active");
};

/**
 * questionNumでサークルの表示変更
 * @param { boolean } isStart
 * @param { boolean } isQuestion
 * @param { Number } questionNum
 * @param { boolean } isLoading
 */
const circleTotalLength = 370;
const toggleQuestionHeadernum = (
  isStart,
  isQuestion,
  questionNum,
  isLoading
) => {
  // サークルをリセット
  const questionHeaderCircleElement = document.querySelector(
    ".question-header__circle"
  );
  if (isStart) {
    questionHeaderCircleElement.style.strokeDashoffset = circleTotalLength;
  }

  if (!isQuestion) return;
  // 状態のリセット
  document.querySelectorAll(".question-header__num__item").forEach((item) => {
    item.classList.remove("active");
  });

  const questionHeaderElement = document.querySelector(".question-header");
  if (questionHeaderElement) {
    questionHeaderElement.classList.toggle("active", !isLoading);
  }

  // 数字のテキストアクティブ
  const questionHeaderNumElement = document.querySelector(
    `.question-header__num__item--${questionNum}`
  );
  if (questionHeaderNumElement) {
    questionHeaderNumElement.classList.add("active");
  }

  // サークルのアニメーション
  if (questionHeaderElement) {
    const progress = questionNum / 4;
    const offset = circleTotalLength * (1 - progress);
    questionHeaderCircleElement.style.strokeDashoffset = offset;
  }
};

/**
 * isLoadingがtrueならローディング画面を表示
 * @param { boolean } isLoading
 */
const toggleLoading = async (isLoading) => {
  // document.getElementById("loading").classList.toggle("active", isLoading);
};

/**
 * リザルト画面を表示
 * @param { boolean } isResult
 * @param { Array } totalPoint
 * @param { String } favo
 */
const toggleResult = async (isResult, totalPoint, favo, appInstance) => {
  document.getElementById("result").classList.toggle("active", isResult);

  if (isResult) {
    const point = totalPoint.reduce(
      (accumulator, currentValue) => (accumulator += currentValue),
      0
    );

    let ID = "";
    let bgColor = "";

    // 01 flower
    if (point === -3 || point === -4) {
      bgColor = "RELAXING";
      switch (favo) {
        case 1:
          ID = "result-flower-woody";
          break;
        case 2:
          ID = "result-flower-spicy";
          break;
        case 3:
          ID = "result-flower-clean";
          break;
      }
    }

    // 02 trees
    if (point === -5 || point === -6) {
      bgColor = "RELAXING";
      switch (favo) {
        case 1:
          ID = "result-trees-floral";
          break;
        case 2:
          ID = "result-trees-spicy";
          break;
        case 3:
          ID = "result-trees-clean";
          break;
      }
    }

    // 03 beret
    if (point === 4 || point === 3) {
      bgColor = "INSPIRING";
      switch (favo) {
        case 1:
          ID = "result-beret-floral";
          break;
        case 2:
          ID = "result-beret-spicy";
          break;
        case 3:
          ID = "result-beret-clean";
          break;
      }
    }

    // 04 eden
    if (point === 6 || point === 5) {
      bgColor = "INSPIRING";
      switch (favo) {
        case 1:
          ID = "result-eden-floral";
          break;
        case 2:
          ID = "result-eden-fruity";
          break;
        case 3:
          ID = "result-eden-clean";
          break;
      }
    }

    // 00 stone
    if (point === 2 || point === 1) {
      bgColor = "NEUTRAL";
      switch (favo) {
        case 1:
          ID = "result-stone-floral";
          break;
        case 2:
          ID = "result-stone-spicy";
          break;
        case 3:
          ID = "result-stone-earthy";
          break;
      }
    }

    // 05 rain
    if (point === 0 || point === -1 || point === -2) {
      bgColor = "NEUTRAL";
      switch (favo) {
        case 1:
          ID = "result-rain-floral";
          break;
        case 2:
          ID = "result-rain-spicy";
          break;
        case 3:
          ID = "result-rain-clean";
          break;
      }
    }

    appInstance.resultID = ID;
    appInstance.bgColor = `${bgColor}`;
    document.getElementById(ID).classList.add("active");
    document
      .querySelector(".gradations")
      .classList.add(`is-gradient-canvas-${bgColor}`);

    setTimeout(() => {
      document.getElementById(ID).classList.add("animation");
    }, 500);

    const btn = document.getElementById(ID).querySelector(".goToBtn");

    // スクロールトリガーを付与
    const targetLayered = btn.nextElementSibling;

    appInstance.scrollTrigger = ScrollTrigger.create({
      scroller: document.querySelector(".result"),
      trigger: targetLayered,
      start: "top-=180 center",
      toggleClass: { targets: btn, className: "hide" },
      once: true,
    });

    appInstance.scrollTriggerCanvas = gsap.to(`.gradations__item--${bgColor}`, {
      scale: 2.5,
      ease: "none",
      scrollTrigger: {
        scroller: document.querySelector(".result"),
        trigger: targetLayered,
        start: "top-=150 center",
        end: "bottom center",
        scrub: true,
      },
    });
  } else {
    if (appInstance.scrollTrigger) {
      appInstance.scrollTrigger.kill();
      document.querySelectorAll(".goToBtn").forEach((btn) => {
        btn.classList.remove("hide");
      });
    }

    if (appInstance.scrollTriggerCanvas) {
      appInstance.scrollTriggerCanvas.kill();

      gsap.set(`.gradations__item--${appInstance.bgColor}`, {
        clearProps: "all",
      });
    }

    if (appInstance.resultID.match(/.+/)) {
      document.getElementById(appInstance.resultID).classList.remove("active");
      document
        .getElementById(appInstance.resultID)
        .classList.remove("animation");
    }

    if (appInstance.bgColor.match(/.+/)) {
      const gradations = document.querySelector(".gradations");
      gradations.classList.remove(`is-gradient-canvas-${appInstance.bgColor}`);
    }
  }
};

/**
 * 前に戻るボタンを表示
 * @param { Number } questionNum
 * @param { boolean } isLoading
 */
const togglePrevBtn = async (questionNum, isLoading, isResult) => {
  document
    .querySelector(".prev-btn-box")
    .classList.toggle("active", questionNum >= 2 && !isLoading && !isResult);
};

export {
  toggleStart,
  toggleQuestion,
  toggleQuestionItem,
  // toggleLoading,
  toggleResult,
  togglePrevBtn,
  toggleQuestionHeadernum,
};
