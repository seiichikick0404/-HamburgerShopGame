// イベント管理クラス
export class EventManager {
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


}