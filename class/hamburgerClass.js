export class Hamburger{
    /**
     * @param {Number} count ハンバーガーの売上数
     * @param {Number} profitPerClick 1クリックあたりの利益
     */
    constructor(count, profitPerClick) {
        this.count = count;
        this.profitPerClick = profitPerClick;
    }
}