const config = {
    initialForm: document.getElementById("initial-form"),
    bankPage: document.getElementById("mainPage"),
    sidePage: document.getElementById("sidePage"),
}

class UserAccount {
    /**
     * @param {string} name 　　 ユーザー名
     * @param {int} age     　　 年齢
     * @param {int} days    　　 経過日数
     * @param {int} assetValue  資産額
     */
    constructor(name, age, days, assetValue) {
        this.name = name;
        this.age = age;
        this.days = days;
        this.assetValue = assetValue;
    }
}

/**
 * @return {void}
 */
function initializeUserAccount() {
    const userName = document.querySelector(`input[name="userName"]`).value;
    let userAccount = new UserAccount(userName, 20, 0, 50000);
}



