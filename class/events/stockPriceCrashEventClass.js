import { Event } from "./eventClass.js";
import { UserAccount } from "../userAccountClass.js";

// 株価暴落イベント
export class StockPriceCrashEvent extends Event {
    differenceInvestment
    differenceBond

    constructor() {
        super();
        this.title = "バブル崩壊！";
        this.description = "株価大暴落中！ハンバーガーをもっと売るしかない！";
        this.probability = 0.5;
        this.imgUrl = "images/1337082.jpg";
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

        let currTotalInvestment = beforeTotalInvestment - Math.floor(this.probability * beforeTotalInvestment);
        currTotalInvestment = currTotalInvestment < 0 ? 0 : currTotalInvestment;

        let currTotalBond = beforeTotalBond - Math.floor(this.probability * beforeTotalBond);
        currTotalBond = currTotalBond < 0 ? 0 : currTotalBond;

        // 株と債券の価格の減少処理
        items[1].totalInvestment = currTotalInvestment;
        items[2].totalBond = currTotalBond;

        // イベントによる差額の設定
        this.differenceInvestment = Math.abs(beforeTotalInvestment - currTotalInvestment);
        this.differenceBond = Math.abs(beforeTotalBond - currTotalBond);

        console.log("株価暴落中");
    }

    /**
     * イベントで変動した値を元の状態に戻す
     * @param {UserAccount} userAccount
     * @return {void}
     */
    resetEventValue(userAccount) {
        const items = userAccount.items;

        // 株と債券の価格を通常時に戻す
        items[1].totalInvestment += this.differenceInvestment;
        items[2].totalBond += this.differenceBond;
    }

    /**
     * イベントモーダルの生成
     */
    generateEventModal() {
        const modalContainer = document.createElement("div");
        modalContainer.classList.add("modal-container");
        console.log(modalContainer);
        // 現在の総資産
        modalContainer.innerHTML = `
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title" id="staticBackdropLabel">${this.title}</h2>
                    </div>
                    <div class="modal-body">
                        <img src="${this.imgUrl}" alt="${this.title}" />
                        <p>${this.description}</p>
                    </div>
                    <div class="modal-footer">
                        <button id="close-btn" type="button" class="btn btn-secondary" data-bs-dismiss="modal">close</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        return modalContainer;
    }
}