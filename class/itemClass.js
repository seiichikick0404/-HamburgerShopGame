export class Item {
    /**
     * @param {string} itemName        商品名
     * @param {Number} price           購入価格
     * @param {string} type            能力タイプ
     * @param {string} imgUrl          画像URL
     * @param {Number} purchaseCount   購入数
     * @param {Number} profit          1クリックまたは毎秒当たりの利益
     * @param {Number} maxPurchase     購入できる最大数
     * @param {Number} totalInvestment 保有してる株式資産額
     * @param {Number} totalBond       保有してる債権資産額
     * @param {Number} totalRealEstate 保有してる不動産資産額
     */
    constructor(itemName, type, price, imgUrl, purchaseCount, profit, maxPurchase, totalInvestment, totalBond, totalRealEstate) {
        this.itemName = itemName;
        this.type = type;
        this.price = price;
        this.imgUrl = imgUrl;
        this.purchaseCount = purchaseCount;
        this.profit = profit;
        this.maxPurchase = maxPurchase;
        this.totalInvestment = totalInvestment;
        this.totalBond = totalBond;
        this.totalRealEstate = totalRealEstate;
    }
}
// export default ItemSample;