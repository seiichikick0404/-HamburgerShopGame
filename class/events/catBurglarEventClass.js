import { Event } from "./eventClass.js";


// 空き巣被害のイベント
export class CatBurglarEvent extends Event {
    beforeProfitPerClick;
    beforePurchaseCount;

    constructor() {
        super();
        this.title = "ハンバーガーショップに空き巣被害！！";
        this.description = "やばい、店の金庫ごと持ち去られた！！";
        this.description2 = "タンス預金はほどほどに...";
        this.probability = 0;
        this.imgUrl = "images/2602724.png";
    }

    /**
     * イベントの効果を反映
     * 新たな投資商品が増えた際の拡張性が必要かも
     * @param {UserAccount} userAccount
     * @return {void}
     */
    execute(userAccount) {
        // 資産の10分の1を失う
        userAccount.assetValue -= Math.floor(userAccount.assetValue / 10);
    }

    /**
     * イベントで変動した値を元の状態に戻す
     * @param {UserAccount} userAccount
     * @return {void}
     */
    resetEventValue(userAccount) {

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
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal${this.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${this.imgUrl}" alt="${this.title}" />
                        <h4>${this.description}</h4>
                        <h4>${this.description2}</h4>
                    </div>
                    <div class="modal-footer">
                        <button id="close-btn" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        return modalContainer;
    }
}