// イベント管理クラス
export class EventManager {
    events;
    eventInterval = 300;
    eventState = false;
    intervalID;

    constructor (events) {
        this.events = events;
    }

    /**
     * 発生するイベントをランダムに選択し返却
     *  @return {Event}
     */
    getRandomEvent() {
        return this.events[Math.floor(Math.random() * this.events.length)];
    }

    /**
     * イベント発生モーダルの作成
     * @param {Event} event
     */
    createEventModal(event) {

    }

    startEventInterval() {
        this.intervalID = setInterval(() => {
            console.log("start event");
            this.handleEvent();
            this.resetEventInterval();
        }, 30 * 1000);
    }

    resetEventInterval() {
        clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout(() => {
          this.startEventInterval();
        }, 30 * 1000);
    }

    handleEvent() {
        const randomNumber = Math.floor(Math.random() * 100);
        console.log(`イベント発生！ランダムな数値は ${randomNumber} です。`);
    }


}