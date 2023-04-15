import { Event } from "./eventClass.js";
import { UserAccount } from "./userAccountClass.js";

// 株価暴落イベント
export class StockPriceCrashEvent extends Event {
    totalInvestment;

    constructor() {
        super();
        this.description = "株価暴落イベント";
        this.probability = 0.5
    }

    /**
     * イベントの効果を反映
     * @param {UserAccount} userAccount
     * @return {void}
     */
    execute(userAccount) {
        const items = userAccount.items;
        for (let i=0; i < items.length; i++) {
            let currTotalInvestment = items[i].totalInvestment -= Math.floor(this.probability * items[i].totalInvestment);
            currTotalInvestment = currTotalInvestment < 0 ? 0 : currTotalInvestment;

            let currTotalBond = items[i].totalBond -= Math.floor(this.probability * items[i].totalBond);
            currTotalBond = currTotalBond < 0 ? 0 : currTotalBond

            // 株と債券の価格の減少処理
            if (items[i].itemName === "ETF Stock") items[i].totalInvestment = currTotalInvestment;
            else if (items[i].itemName === "ETF Bonds") items[i].totalBond = currTotalBond;
        }
        console.log("株価暴落中");
    }

    /**
     * イベントで変動した値を元の状態に戻す
     * @param {UserAccount} userAccount
     * @return {void}
     */
    resetEventValue(userAccount) {
        // todo 元に戻すロジックに穴がある
        // -50%した値に+50%しても元の値に戻らない
        // 元の値を保持したりの対応が必要
        const items = userAccount.items;
        console.log(userAccount);
        for (let i=0; i < items.length; i++) {
            let currTotalInvestment = items[i].totalInvestment += Math.floor(this.probability * items[i].totalInvestment);

            let currTotalBond = items[i].totalBond += Math.floor(this.probability * items[i].totalBond);
            currTotalBond = currTotalBond < 0 ? 0 : currTotalBond

            // 株と債券の価格を通常時に戻す
            if (items[i].itemName === "ETF Stock") items[i].totalInvestment = currTotalInvestment;
            else if (items[i].itemName === "ETF Bonds") items[i].totalBond = currTotalBond;
        }
    }
}