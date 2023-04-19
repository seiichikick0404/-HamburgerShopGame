// イベント管理クラス
export class EventManager {
    events;
    eventInterval = 300;
    modalState = false;
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
        this.modalState = true;

        let modalContainer = event.generateEventModal();

        document.getElementById("mainPage").append(modalContainer);
        document.getElementById('staticBackdrop').classList.add('show');
        document.getElementById('staticBackdrop').style.display = 'block';
        var backdrop = document.createElement('div');
        backdrop.classList.add('modal-backdrop', 'fade', 'show');
        document.body.appendChild(backdrop);

        // Closeボタンが押された際の処理
        const _this = this;
        modalContainer.querySelector("#close-btn").addEventListener("click", function() {
            // モーダルを閉じる
            _this.closeModal();
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
            // モーダル多重表示防止
            if (this.modalState) this.closeModal();

            let currEvent = this.getRandomEvent();
            currEvent.execute(userAccount);

            // モーダルの出力処理----
            this.openModal(currEvent);
            // デバッグ中ーーーーー

            console.log("変動後保有株" + userAccount.items[1].totalInvestment); // デバッグ用
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

    /**
     * モーダルを閉じる
     * @return {void}
     */
    closeModal() {
        document.querySelector(".modal-container").remove();
        document.querySelector(".modal-backdrop").remove();
        this.modalState = false;
    }
}