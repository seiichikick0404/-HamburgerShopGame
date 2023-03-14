const config = {
    initialForm: document.getElementById("initial-form"),
    bankPage: document.getElementById("mainPage")
}

class UserAccount {
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

class Hamburger{
    /**
     * 
     * @param {Number} count ハンバーガーの売上数
     * @param {Number} profitPerClick 1クリックあたりの利益
     */
    constructor(count, profitPerClick) {
        this.count = count;
        this.profitPerClick = profitPerClick;
    }
}

class Item {
    /**
     * @param {string} itemName       商品名
     * @param {Number} price          購入価格
     * @param {string} type           能力タイプ
     * @param {string} imgUrl         画像URL
     * @param {Number} purchaseCount  購入数
     * @param {Number} profit         1クリックまたは毎秒当たりの利益
     * @param {Number} maxPurchase    購入できる最大数
     */
    constructor(itemName, type, price, imgUrl, purchaseCount, profit, maxPurchase) {
        this.itemName = itemName;
        this.type = type;
        this.price = price;
        this.imgUrl = imgUrl;
        this.purchaseCount = purchaseCount;
        this.profit = profit;
        this.maxPurchase = maxPurchase;
    }
}

class Game {

    config = {
        initialForm: document.getElementById("initial-form"),
        mainPage: document.getElementById("mainPage"),
        sidePage: document.getElementById("sidePage"),
    }

    loginUser;
    

    /**
     * ユーザーアカウントの新規作成
     * @return {void}
     */
    initializeUserAccount() {
        // 初期化処理
        if (!localStorage.getItem('users')) {
            this.setUsers();
        }

        const items = [
            new Item("Flip machine", "ability", 1500, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png", 0, 25, 500),
            new Item("ETF Stock", "investment", 300000, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png", 0, 0.1, Infinity),
            new Item("ETF Bonds", "investment", 300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", 0, 0.07, Infinity),
            new Item("Lemonade Stand", "realEstate", 30000, "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png", 0, 30, 1000),
            new Item("Ice Cream Truck", "realEstate", 100000, "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png", 0, 120, 500),
            new Item("House", "realEstate", 20000000, "	https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png", 0, 32000, 100),
            new Item("TownHouse", "realEstate", 40000000, "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png", 0, 64000, 100),
            new Item("Mansion", "realEstate", 250000000, "	https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png", 0, 500000, 20),
            new Item("Industrial Space", "realEstate", 1000000000, "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png", 0, 2200000, 10),
            new Item("Hotel Skyscraper", "realEstate", 10000000000, "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png", 0, 25000000, 5),
            new Item("Bullet-Speed Sky Railway", "realEstate", 10000000000000, "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png", 0, 30000000000, 1),
        ];

        const savedUsers = JSON.parse(localStorage.getItem('users'));
        const userName = document.querySelector(`input[name="userName"]`).value;
        const userAccount = new UserAccount(userName, 20, 0, 50000, new Hamburger(0, 25), items);
        this.loginUser = userAccount;

        savedUsers.push(userAccount);
        localStorage.setItem("users", JSON.stringify(savedUsers));

        this.config.initialForm.classList.add("d-none");
        alert("新規登録完了。ゲームへ進みます");

        this.config.mainPage.append(this.createMainPage(userAccount));
    }

    /**
     * ユーザーアカウントにログイン
     * @return {void}
     */
    loginUserAccount() {
        // デバッグ用
        // localStorage.removeItem("users");
        // console.log(JSON.parse(localStorage.getItem("users")));
        // return;

        // 初期化処理
        if (!localStorage.getItem('users')) {
            this.setUsers();
        }

        // 保存されてるusersを取得
        const userList = JSON.parse(localStorage.getItem("users"));
        const inputName = document.querySelector(`input[name="userName"]`).value;
        let userFlag = false;
        let userAccount;

        if (inputName === undefined || inputName === null || inputName === "") {
            alert("名前を入力してください");
        } else {
            for (let i = 0; i < userList.length; i++) {
                if (userList[i].name === inputName) {
                    this.loginUser = userList[i];
                    userFlag = true;
                    userAccount = userList[i];
                    break;
                }
            }

            if (userFlag) {
                alert("ログイン完了。ゲームを開始します");
                this.config.initialForm.classList.add("d-none");
                this.config.mainPage.append(this.createMainPage(userAccount));

            } else alert(inputName + "というユーザーは存在しません。新規登録をしてゲームを開始しよう");
        }
    }

    /**
     * 保存処理の初期設定
     * @return {void}
     */
    setUsers() {
        localStorage.setItem('users', JSON.stringify([]));
    }

    /**
     * ハンバーガーを1つ売る
     * @param {userAccount} userAccount
     * @return {void}
     */
     sellBurger(userAccount) {
        // 個数を追加
        userAccount.hamburgerInfo.count += 1;
        // 売上を資産額に追加
        userAccount.assetValue += userAccount.hamburgerInfo.profitPerClick;
    }

    /**
     * mainページの作成
     * @param {UserAccount} userAccount
     * @return {object} HTMLオブジェクト
     */
    createMainPage(userAccount) {
        let container = document.createElement("div");
        container.classList.add("vh-100", "d-md-flex", "justify-content-center", "container");
        let mainContainer = document.createElement("div");
        mainContainer.classList.add("bg-secondary", "col-md-11", "col-12", "d-md-flex", "p-5", "m-md-4");
        container.append(mainContainer);

        // 左半分を作成
        let mainPageLeft = this.createMainPageLeft(userAccount);

        // 右半分を作成
        let mainPageRight = this.createMainPageRight(userAccount);

        mainContainer.innerHTML = `
        ${mainPageLeft}
        ${mainPageRight}
        `;

        const burgerImg = mainContainer.querySelector("#burgerImg");
        var _this_ = this /* thisを_this_に代入 */
        burgerImg.addEventListener("click", function() {
            // ハンバーガーを1つ売る
            _this_.sellBurger(userAccount);

            // 更新した内容を反映させる
            mainContainer.querySelector("#numberOfBurger").innerHTML =`${userAccount.hamburgerInfo.count} Burgers`;
            mainContainer.querySelector("#profitPerClick").innerHTML =`One click $${userAccount.hamburgerInfo.profitPerClick}`;
            mainContainer.querySelector("#totalMoney").innerHTML = `$${userAccount.assetValue}`;

        });

        // 日数経過処理と年齢経過処理
        setInterval(function(){
            userAccount.days += 1;
            if (userAccount.days % 365 === 0) {
                // 年齢の経過
                userAccount.age += 1;
                mainContainer.querySelector("#age").innerHTML = `${userAccount.age} years old`;
            }
            mainContainer.querySelector("#days").innerHTML = `${userAccount.days} days`;

        },1000);


        return container;
    }

    /**
     * 左半分を作成
     * @param {UserAccount} userAccount
     * @return {string}
     */
     createMainPageLeft(userAccount) {
        let container = `
        <div class="col-md-5 col-12 m-md-2 p-1 px-3 bg-dark" id="mainPageLeft">
            <div class="text-center my-3 bg-secondary p-2 text-light">
                <h5 id="numberOfBurger">${userAccount.hamburgerInfo.count} Burgers</h5>
                <h5 id="profitPerClick">One click $${userAccount.hamburgerInfo.profitPerClick}</h5>
            </div>
            <div class="col-12">
                <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" class="burger" id="burgerImg">
            </div>
        </div>
        `;

        return container;
    }

    createMainPageRight(userAccount) {
        let mainPageRightTop = `
        <div class="col-md-7 col-12 my-md-2" id="mainPageRight">
            <div class="bg-dark p-3 text-light">
                <div class="d-md-flex text-center p-1">
                    <h5 class="col-md-6 col-12 mx-1 bg-secondary">${userAccount.name}</h5>
                    <h5 class="col-md-6 col-12 mx-1 bg-secondary" id="age">${userAccount.age} years old</h5>
                </div>
                <div class="d-md-flex text-center p-1">
                    <h5 class="col-md-6 col-12 bg-secondary mx-1" id="days">${userAccount.days} days</h5>
                    <h5 class="col-md-6 col-12 bg-secondary mx-1" id="totalMoney">$${userAccount.assetValue}</h5>
                </div>
            </div>
        `;
        


        // テスト------------------------------------------------
        let itemCard = "";
        

        // -----------------------------------------------------

        let mainPageRightBottom = `
        <div class="scroll my-2 bg-dark">
            <div id="items"><div><div>
            <div class="d-md-flex bg-dark text-light p-3">
                <div class="col-md-2 d-md-block d-none">
                    <img src="./img/flip_machine.png" class="itemImg col-md-12">
                </div>
                <div class="col-md-6 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>Flip machine</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$15000</h5>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>0</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$25 /click</h5>
                    </div>
                </div>
            </div>
            
        </div>
        `;


        let mainPageRight = `
        ${mainPageRightTop}
        ${mainPageRightBottom}
        `;

        return mainPageRight;
    }
}



/**
 * ゲームの実行関数
 * @param {string} newOrLogin
 * @return {void}
 */
function startGame(newOrLogin) {
    const game = new Game();
    if (newOrLogin === "new") {
        game.initializeUserAccount();
    } else if (newOrLogin === "login") {
        game.loginUserAccount();
    }
}








