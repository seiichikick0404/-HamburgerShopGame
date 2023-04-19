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
     * イベント発生時モーダルの呼び出し
     * @param {Event} event
     * @return {void}
     */
    openModal(event) {
        let modalContainer = event.generateEventModal();

        document.getElementById("mainPage").append(modalContainer);

        document.getElementById('staticBackdrop').classList.add('show');
        document.getElementById('staticBackdrop').style.display = 'block';
        var backdrop = document.createElement('div');
        backdrop.classList.add('modal-backdrop', 'fade', 'show');
        document.body.appendChild(backdrop);

        // Closeボタンが押された際の処理
        modalContainer.querySelector("#close-btn").addEventListener("click", function() {
            // window.location.reload();
            // モーダルを削除
            document.querySelector(".modal-container").remove();
            backdrop.remove();
        });
    }

    /**
     * 一定時間おきにイベントを実行
     * @param {UserAccount} userAccount
     * @return {void}
     */
    startEvent(userAccount) {
        console.log("変動前保有株" + userAccount.items[1].totalInvestment);
        setTimeout(() => {
            console.log("start event");  // デバッグ用
            let currEvent = this.getRandomEvent();
            currEvent.execute(userAccount);

            // モーダルの出力処理----
            this.openModal(currEvent);
            // デバッグ中ーーーーー

            console.log("変動後保有株" + userAccount.items[1].totalInvestment);
            this.startEventInterval(userAccount, currEvent);
        }, 10 * 1000);
    }

    /**
     * イベント間のインターバル
     * @param {UserAccount} userAccount
     * @param {Event} currEvent
     * @return {void}
     */
    startEventInterval(userAccount, currEvent) {
        // イベントタイマーを停止
        setTimeout(() => {
            console.log("イベントまで30秒間待機中"); //デバッグ用
            // イベントの値を初期化
            currEvent.resetEventValue(userAccount);
            console.log("初期化後保有株" + userAccount.items[1].totalInvestment);
            this.startEvent(userAccount);
        }, 10 * 1000);
    }
}