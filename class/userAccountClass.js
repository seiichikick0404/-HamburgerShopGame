export class UserAccount {
    /**
     * @param {string} name 　　         ユーザー名
     * @param {Number} age     　　         年齢
     * @param {Number} days    　　         経過日数
     * @param {Number} assetValue          資産額
     * @param {Hamburger} hamburgerInfo ハンバーガー売上情報
     * @param {Array[Item]} items       所持してるアイテム情報
     */
    constructor(name, age, days, assetValue, hamburgerInfo, items) {
        this.name = name;
        this.age = age;
        this.days = days;
        this.assetValue = assetValue;
        this.hamburgerInfo = hamburgerInfo;
        this.items = items;
    }
}