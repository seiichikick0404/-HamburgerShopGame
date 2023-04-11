import { Event } from "./eventClass.js";

// 株価暴騰イベント
export class StockPriceRiseEvent extends Event {
    constructor() {
        super('株価爆上げイベント', 0.1);
    }

    /**
     * イベントの効果を反映
     * @param {UserAccount} userAccount
     * @return {void}
     */
    execute(userAccount) {
        console.log(userAccount.items);
        // 暴騰の仕様
        // ①保有してるETF・債券の価格が+50%
        // ②1秒当たりの利益も増加
        // ③これらは一定時間後元に戻る
    }
}