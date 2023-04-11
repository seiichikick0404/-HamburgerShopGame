import { Event } from "./eventClass.js";
import { UserAccount } from "./userAccountClass.js";

// 株価暴落イベント
export class StockPriceCrashEvent extends Event {
    constructor() {
        super('株価暴落イベント', 0.3);
    }

    /**
     * イベントの効果を反映
     * @param {UserAccount} userAccount
     * @return {void}
     */
    execute(userAccount) {
        const items = userAccount.items;
        for (let i=0; i < items.length; i++) {
            let currTotalInvestment = items[i].totalInvestment *= Math.floor(-super.probability);
            currTotalInvestment = currTotalInvestment < 0 ? 0 : currTotalInvestment;

            let currTotalBond = items[i].totalBond *= Math.floor(-super.probability);
            currTotalBond = currTotalBond < 0 ? 0 : currTotalBond

            // 株と債券の価格の減少処理
            if (items[i].itemName === "ETF Stock") items[i].totalInvestment = currTotalInvestment;
            else if (items[i].itemName === "ETF Bonds") items[i].totalBond = currTotalBond;

            // 1秒当たりの利益減少処理
            items[i].profit *= Math.floor(-super.probability);
        }
    }
}