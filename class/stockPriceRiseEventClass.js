import { Event } from "./eventClass.js";


// 株価暴騰イベント
export class StockPriceRiseEvent extends Event {
    beforeTotalInvestment;

    constructor() {
        super();
        this.description = "株価上昇イベント";
        this.probability = 0.2;
    }

    /**
     * イベントの効果を反映
     * 新たな投資商品が増えた際の拡張性が必要かも
     * @param {UserAccount} userAccount
     * @return {void}
     */
    execute(userAccount) {
        const items = userAccount.items;
        // 変更前株価
        let beforeTotalInvestment = items[1].totalInvestment;
        let beforeTotalBond = items[2].totalBond;

        let currTotalInvestment = beforeTotalInvestment + Math.floor(this.probability * beforeTotalInvestment);
        currTotalInvestment = currTotalInvestment < 0 ? 0 : currTotalInvestment;

        let currTotalBond = beforeTotalBond + Math.floor(this.probability * beforeTotalBond);
        currTotalBond = currTotalBond < 0 ? 0 : currTotalBond;

        // 株と債券の価格の減少処理
        items[1].totalInvestment = currTotalInvestment;
        items[2].totalBond = currTotalBond;

        // イベントによる差額の設定
        this.differenceInvestment = Math.abs(beforeTotalInvestment - currTotalInvestment);
        this.differenceBond = Math.abs(beforeTotalBond - currTotalBond);

        console.log("株価上昇中");
    }

    /**
     * イベントで変動した値を元の状態に戻す
     * @param {UserAccount} userAccount
     * @return {void}
     */
    resetEventValue(userAccount) {
        const items = userAccount.items;

        // 株と債券の価格を通常時に戻す
        items[1].totalInvestment -= this.differenceInvestment;
        items[2].totalBond -= this.differenceBond;
    }
}