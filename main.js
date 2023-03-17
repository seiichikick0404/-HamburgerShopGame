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
            new Item("Flip machine", "ability", 15000, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png", 0, 25, 500, 0, 0, 0),
            new Item("ETF Stock", "investment", 300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", 0, 0.1, Infinity, 0, 0, 0),
            new Item("ETF Bonds", "investment", 300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", 0, 0.07, Infinity, 0, 0, 0),
            new Item("Lemonade Stand", "realEstate", 30000, "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png", 0, 30, 1000, 0, 0, 0),
            new Item("Ice Cream Truck", "realEstate", 100000, "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png", 0, 120, 500, 0, 0, 0),
            new Item("House", "realEstate", 20000000, "	https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png", 0, 32000, 100, 0, 0, 0),
            new Item("TownHouse", "realEstate", 40000000, "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png", 0, 64000, 100, 0, 0, 0),
            new Item("Mansion", "realEstate", 250000000, "	https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png", 0, 500000, 20, 0, 0, 0),
            new Item("Industrial Space", "realEstate", 1000000000, "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png", 0, 2200000, 10, 0, 0, 0),
            new Item("Hotel Skyscraper", "realEstate", 10000000000, "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png", 0, 25000000, 5, 0, 0, 0),
            new Item("Bullet-Speed Sky Railway", "realEstate", 10000000000000, "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png", 0, 30000000000, 1, 0, 0, 0),
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

        mainContainer.append(mainPageLeft, mainPageRight);

        const burgerImg = mainContainer.querySelector("#burgerImg");
        let _this_ = this /* thisを_this_に代入 */
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

        // 商品購入画面
        const itemCards = mainContainer.querySelectorAll(".item-card-box");
        for (let i = 0; i < itemCards.length; i++) {
            itemCards[i].addEventListener("click", function() {
                // 商品一覧画面を非表示にする
                mainPageRight.querySelector("#items").classList.add("d-none");
                // 詳細ページを作成する
                let detailPage = _this_.createDetailPage(userAccount, i, mainPageRight);
                mainPageRight.querySelector(".scroll").append(detailPage);

            });
        }


        return container;
    }

    /**
     * 左半分を作成
     * @param {UserAccount} userAccount
     * @return {Object}
     */
     createMainPageLeft(userAccount) {
        let container = document.createElement("div");
        container.classList.add("col-md-5", "col-12", "m-md-2", "p-1", "px-3", "bg-dark");
        container.setAttribute("id", "mainPageLeft");
        container.innerHTML = `
            <div class="text-center my-3 bg-secondary p-2 text-light">
                <h5 id="numberOfBurger">${userAccount.hamburgerInfo.count} Burgers</h5>
                <h5 id="profitPerClick">One click $${userAccount.hamburgerInfo.profitPerClick}</h5>
            </div>
            <div class="col-12">
                <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" class="burger" id="burgerImg">
            </div>
        `;
        return container;
    }

    /**
     * @param {UserAccount} userAccount
     * @return {Object}
     */
    createMainPageRight(userAccount) {
        let mainPageRightContainer = document.createElement("div");
        mainPageRightContainer.classList.add("col-md-7", "col-12", "my-md-2");
        mainPageRightContainer.setAttribute("id", "mainPageRight");

        let mainPageRightTop =
        `
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


        let mainPageRightBottom = document.createElement("div");
        mainPageRightBottom.classList.add("scroll", "my-2", "bg-dark");
        let items = document.createElement("div");
        items.setAttribute("id", "items");
        mainPageRightBottom.append(items);


        for (let i = 0; i < userAccount.items.length; i++) {
            let clickOrs = i < 1 ? "click" : "s";
            let item = document.createElement("div");
            item.classList.add("item-card-box", "d-md-flex", "bg-dark", "text-light", "p-3");
            item.innerHTML = `
                <div class="col-md-2 d-md-block d-none">
                    <img src="${userAccount.items[i].imgUrl}" class="img-fluid itemImg col-md-12">
                </div>
                <div class="col-md-6 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>${userAccount.items[i].itemName}</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$${userAccount.items[i].price}</h5>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>${userAccount.items[i].purchaseCount}</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$${userAccount.items[i].profit} /${clickOrs}</h5>
                    </div>
                </div>
            `;

            items.append(item);
        }


        mainPageRightContainer.innerHTML = `
        ${mainPageRightTop}
        `;
        mainPageRightContainer.append(mainPageRightBottom);

        return mainPageRightContainer;
    }

    /**
     * 商品詳細ページの作成
     * @param {UserAccount} userAccount 
     * @param {Number} itemIndex 
     * @param {Object} mainPageRight
     * @return {Object}
     */
    createDetailPage(userAccount, itemIndex, mainPageRight) {
        const item = userAccount.items[itemIndex];

        let container = document.createElement("div");
        container.classList.add("bg-danger");
        let detailContainer = document.createElement("div");
        detailContainer.classList.add("container", "py-3", "bg-dark", "text-light");
        container.append(detailContainer);

        // 詳細画面上部
        let detailPageTop = document.createElement("div");
        detailPageTop.classList.add("d-flex", "justify-content-between");
        detailPageTop.innerHTML = `
        <div class="d-flex justify-content-between">
            <div>
                <h3>${item.itemName}</h3>
                <h5>Max purchases: ${item.maxPurchase}</h5>
                <h5>Price: ${item.price}</h5>
                <h5>Get $${item.profit}/sec</h5>
            </div>
            <div class="col-5 d-flex justify-content-center align-items-center">
                <img src="${item.imgUrl}" width="100px" height="100px">
            </div>
        </div>
        `;

        // 詳細画面中部
        let detailPageMiddle = document.createElement("div");
        detailPageMiddle.innerHTML = `
            <h5>How many would you like to buy?</h5>
            <input class=" col-12 bill-input" type="number" min="1" placeholder="0" value="1">
            <h5 id="buy-total" class="text-right">total: $${item.price}</h5>
        `;

        // 詳細画面下部
        let detailPageBottom = document.createElement("div");
        detailPageBottom.classList.add("d-flex", "justify-content-around");
        detailPageBottom.innerHTML = `
            <button id="btnBack" class="btn btn-light back-btn">Go Back</button>
            <button id="btnPurchase" class="btn btn-primary purchase-btn">Purchase</button>
        `;

        // 合計金額を表示する処理
        detailPageMiddle.querySelector(".bill-input").addEventListener("change", function(event) {
            let total = item.price * event.target.value;
            detailPageMiddle.querySelector("#buy-total").innerHTML = `total: $${total}`;
        });


        //戻るボタンでアイテムリストページに戻る
        detailPageBottom.querySelector("#btnBack").addEventListener("click", function(){
            _this_.returnMainPage(userAccount, _this_);
        });

        // 購入時の処理
        const _this_ = this;
        detailPageBottom.querySelector("#btnPurchase").addEventListener("click", function(){
            console.log("ボタンがクリックされました");
            let totalText = mainPageRight.querySelector("#buy-total").innerHTML;
            let total = parseInt(totalText.slice(8));

            // 所持金が足りない場合
            if (userAccount.assetValue < total) {
                alert("所持金が不足しています");
            } else {
                // 購入できた場合
                _this_.itemPurchase(userAccount, item, mainPageRight);

                // メインページに戻る
                _this_.returnMainPage(userAccount, _this_);

            }
        });

        detailContainer.append(detailPageTop, detailPageMiddle, detailPageBottom);

        return container;
    }

    /**
     * 商品購入時の処理
     * @param {UserAccount} userAccount 
     * @param {Item} item
     * @param {Object} mainPageRight 
     * @return {void}
     */
    itemPurchase(userAccount, item,  mainPageRight) {
        // 商品の効力を反映 能力, 投資、不動産投資
        let _this_ = this;
        let purchaseCount = parseInt(mainPageRight.querySelector(".bill-input").value);
        if (item.type === "ability") {
            if (item.maxPurchase - purchaseCount < 0) alert("購入上限数を超えています");
            else _this_.abilityAssignment(userAccount, item, purchaseCount);

        } else if (item.type === "investment") {
            _this_.investmentAssignment(userAccount, item, purchaseCount);

        } else if (item.type === "realEstate") {
            if (item.maxPurchase - purchaseCount < 0) alert("購入上限数を超えています");
            else _this_.realEstateAssignment(userAccount, item, purchaseCount);
        }
    }


    /**
     * ability効果の反映
     * @param {UserAccount} userAccount 
     * @param {Item} item
     * @param {Number} purchaseCount 購入する個数
     */
     abilityAssignment(userAccount, item, purchaseCount) {
        const profitIncrease = 25;

        item.maxPurchase -= purchaseCount;
        item.purchaseCount += purchaseCount;
        userAccount.assetValue -= parseInt(item.price * purchaseCount);
        userAccount.hamburgerInfo.profitPerClick += profitIncrease * purchaseCount;
    }


    /**
     * 債権,ETF購入処理
     * @param {UserAccount} userAccount
     * @param {Item} item
     * @return {void}
     */
    investmentAssignment(userAccount, item, purchaseCount) {
        let total = parseInt(item.price * purchaseCount);
        item.purchaseCount += purchaseCount;
        userAccount.assetValue -= total;

        if (item.itemName === "ETF Stock") {
            item.totalInvestment += total;
            // ETFの場合購入の度に購入金額が10%上乗せ
            item.price += parseInt(item.price * item.profit);
        }
        else item.totalBond += total
    }


    /**
     * 不動産購入処理
     * @param {UserAccount} userAccount
     * @param {Item} item
     * @return {void}
     */
    realEstateAssignment(userAccount, item, purchaseCount) {
        let total = parseInt(item.price * purchaseCount);

        item.maxPurchase -= purchaseCount;
        item.purchaseCount += purchaseCount;
        userAccount.assetValue -= total;
        item.totalRealEstate += total;
    }

    /**
     * メインページへ戻る
     * @param {UserAccount} userAccount
     * @param {Game} _this_
     */
    returnMainPage(userAccount, _this_) {
        _this_.config.mainPage.innerHTML = "";
        _this_.config.mainPage.append(_this_.createMainPage(userAccount));
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








