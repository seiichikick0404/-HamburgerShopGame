// イベント管理クラス
export class EventManager {
    events;
    eventInterval = 300;
    modalState = false;
    intervalID;
    modal;

    constructor (events) {
        this.events = events;
    }

    /**
     * 発生するイベントをランダムに選択し返却
     *  @return {Event}
     */
    getRandomEvent() {
        console.log("eventsからランダムで選ばれます");
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

        // モーダルを表示
        this.modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        this.modal.show();

        //Closeボタンが押された際の処理
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
        setTimeout(() => {
            console.log("start event");  // デバッグ用
            // モーダル多重表示防止
            if (this.modalState) this.closeModal();

            let currEvent = this.getRandomEvent();

            currEvent.execute(userAccount);

            this.openModal(currEvent);

            this.startEventInterval(userAccount, currEvent);
        }, 180 * 1000);
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
            alert("イベントが終了しました")
            // イベントの値を初期化
            currEvent.resetEventValue(userAccount);
            this.startEvent(userAccount);
        }, 120 * 1000);
    }

    /**
     * モーダルを閉じる
     * @return {void}
     */
    closeModal() {
        this.modal.hide();
        document.querySelector("#exampleModal").remove();
        this.modalState = false;
    }
}