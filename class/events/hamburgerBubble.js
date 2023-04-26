import { Event } from "./eventClass.js";


// ハンバーガーバブルのイベント
export class HamburgerBubbleEvent extends Event {
    beforeProfitPerClick;
    beforePurchaseCount;

    constructor() {
        super();
        this.title = "ハンバーガーバブル到来！！";
        this.description = "世界中で世紀のハンバーガーブームだ！！";
        this.description2 = "さあ今こそクリックしまくれ！！";
        this.probability = 0.2;
        this.imgUrl = "images/23686234.jpg";
    }

    /**
     * イベントの効果を反映
     * 新たな投資商品が増えた際の拡張性が必要かも
     * @param {UserAccount} userAccount
     * @return {void}
     */
    execute(userAccount) {
        const hamburgerInfo = userAccount.hamburgerInfo;
        const items = userAccount.items;

        // 変更前の1クリックあたりの単価
        this.beforeProfitPerClick = hamburgerInfo.profitPerClick;

        // 変更前ハンバーガー設備購入数
        this.beforePurchaseCount = items[0].purchaseCount;

        // 単価を3倍にする
        hamburgerInfo.profitPerClick = Math.floor(this.beforeProfitPerClick * 3);
        console.log(Math.floor(this.beforeProfitPerClick * 3));

        // 更新した内容を反映させる
        document.querySelector("#profitPerClick").innerHTML =`One click $${userAccount.hamburgerInfo.profitPerClick}`;

        console.log("ハンバーガーの単価上昇中");
    }

    /**
     * イベントで変動した値を元の状態に戻す
     * @param {UserAccount} userAccount
     * @return {void}
     */
    resetEventValue(userAccount) {
        const hamburgerInfo = userAccount.hamburgerInfo;
        const items = userAccount.items;
        const profitIncrease = 25;

        console.log("変更前の値：" + this.beforePurchaseCount);
        console.log("変更後の値：" + items[0].purchaseCount);

        // 元の単価に戻す
        if (this.beforePurchaseCount < items[0].purchaseCount) {
            // 初期値25がなので+1としてる
            hamburgerInfo.profitPerClick = parseInt(profitIncrease * (items[0].purchaseCount + 1));
        } else {
            hamburgerInfo.profitPerClick = this.beforeProfitPerClick;
        }

        // 更新した内容を反映させる
        document.querySelector("#profitPerClick").innerHTML =`One click $${userAccount.hamburgerInfo.profitPerClick}`;
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
                        <h4>${this.description}</h4>
                        <h4>${this.description2}</h4>
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