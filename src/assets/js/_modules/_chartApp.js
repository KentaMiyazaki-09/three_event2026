import {
  toggleStart,
  toggleQuestion,
  toggleQuestionItem,
  toggleQuestionHeadernum,
  // toggleLoading,
  toggleResult,
  togglePrevBtn,
} from "./_chartApp/changeDomByState";
import {
  startButton,
  answerButtons,
  restartButton,
  prevButton,
  questionFooterLogo,
  resultLogo,
} from "./_chartApp/changeStateByDom";

class chartApp {
  constructor() {
    // この２つでresultが変化する
    this.totalPoint = []; // 現在の合計ポイント -6~６

    // result
    this.resultID = "";
    this.bgColor = "";
    this.scrollTrigger = "";
    this.scrollTriggerCanvas = "";

    // 出現させる画面のトリガー
    this.isStart = true; // スタート画面の表示
    this.isQuestion = false; // 質問画面の表示
    this.questionNum = 0; // 現在の質問 1to3
    this.loading = false;
    this.isResult = false; // result画面の表示

    // this.isStart = false; // スタート画面の表示
    // this.isQuestion = true; // 質問画面の表示
    // this.questionNum = 3; // 現在の質問 1to3

    // 前に戻るトリガー
    this.prevPoint = 0;

    this.changeStateByDom();
    this.changeDomByState();
  }

  /**
   * timeの時間待ってからresolveを返す
   * @param { number } time
   */
  tick = (time) => {
    return new Promise((resolve) => setTimeout(() => resolve(), time));
  };

  /**
   * URLパラメーターに応じてResultを表示
   * recommend this.totalPointの数字
   * favo this.favoの数字
   *
   * Example
   * 合計点数=-4, 好みの香り=1
   * https://hoge.com?recommend=-4&favo=1
   */
  showResultByURLParams = async () => {
    const params = new URLSearchParams(window.location.search);
    const recommend = Number(params.get("recommend"));
    const showResult = Number(params.get("showResult"));

    const isRecommendValid = recommend >= -6 && recommend <= 6;
    const isShowResult = showResult === 1;

    if (isRecommendValid && isShowResult) {
      
      this.totalPoint.push(recommend);
      this.isStart = false;
      this.isQuestion = false;
      this.loading = false;
      this.isResult = true;
      this.changeDomByState();

      await this.tick(500);
      document.querySelector(".three-25FC").classList.add("is-loaded");
    } else {
      await this.tick(1500);
      document.querySelector(".three-25FC").classList.add("is-loaded");
    }
  };

  /**
   * dom操作でstateを変更　まとめ
   */
  changeStateByDom = () => {
    startButton(this);
    answerButtons(this);
    restartButton(this);
    prevButton(this);
    questionFooterLogo(this);
    resultLogo(this);
  };

  /**
   * stateを元にdom要素の表示切り替え
   */
  changeDomByState = () => {
    toggleStart(this.isStart);
    toggleQuestion(this.isQuestion);
    toggleQuestionItem(this.isQuestion, this.questionNum, this.loading);
    toggleQuestionHeadernum(
      this.isStart,
      this.isQuestion,
      this.questionNum,
      this.loading
    );
    // toggleLoading(this.loading);
    toggleResult(this.isResult, this.totalPoint, this.favo, this);
    togglePrevBtn(this.questionNum, this.loading, this.isResult);
  };
}

export default chartApp;
