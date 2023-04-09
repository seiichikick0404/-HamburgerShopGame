import { Item } from './itemClass.js';
import { UserAccount } from './userAccountClass.js';
import { Hamburger } from './hamburgerClass.js';



export class Game {

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

        // 空欄の場合は戻す
        const userName = document.querySelector(`input[name="userName"]`).value;
        if (userName === "" || userName === undefined) {
            alert("ユーザー名を入力して下さい");
            return;
        }


        // 重複データは登録できない
        const userList = JSON.parse(localStorage.getItem('users')) || [];
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].name === userName) {
                alert("このユーザネームは既に存在します");
                return;
            }
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
        // 初期化処理
        if (!localStorage.getItem('users')) {
            this.setUsers();
        }

        const userList = JSON.parse(localStorage.getItem('users')) || [];
        const inputName = document.querySelector('input[name="userName"]').value.trim();

        if (!inputName) {
          alert('ユーザー名を入力してください');
          return;
        }

        const userAccount = userList.find(user => user.name === inputName);

        if (userAccount) {
          this.loginUser = userAccount;
          alert('ログイン完了。ゲームを開始します');
          this.config.initialForm.classList.add('d-none');
          this.config.mainPage.append(this.createMainPage(this.loginUser));
        } else {
          alert(inputName + 'というユーザーは存在しません。新規登録をしてゲームを開始しよう');
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
        userAccount.hamburgerInfo.count++;
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
        mainContainer.classList.add("main-container", "bg-navy", "col-md-11", "col-12", "d-md-flex", "p-5", "m-md-4");
        container.append(mainContainer);

        // 左半分を作成
        const mainPageLeft = this.createMainPageLeft(userAccount);

        // 右半分を作成
        const mainPageRight = this.createMainPageRight(userAccount);

        // 各種ボタンコンテナを作成
        mainPageRight.append(this.createMainPageBtn(userAccount))

        // イベントモーダルを作成
        events = [new StockPriceRiseEvent(), new StockPriceCrashEvent()];
        eventManager = new EventManager(events);
        this.createEvent(userAccount, eventManager);

        mainContainer.append(mainPageLeft, mainPageRight);


        this.hamburgerClickEvent(userAccount, mainContainer);


        // 日数経過処理と年齢経過処理
        setInterval(function(){
            userAccount.days += 1;
            if (userAccount.days % 365 === 0) {
                // 年齢の経過
                userAccount.age += 1;
                mainContainer.querySelector("#age").innerHTML = `${userAccount.age} years old`;
            }
            mainContainer.querySelector("#days").innerHTML = `${userAccount.days} days`;

            // ETF, Bondsの利益反映
            let total = 0;


            for (let i = 1; i < userAccount.items.length; i++) {
                let item = userAccount.items[i];
                if (userAccount.items[i].purchaseCount > 0){
                    // ETF
                    if (item.itemName === "ETF Stock") total += parseInt(item.totalInvestment * item.profit);
                    // 債権
                    if (item.itemName === "ETF Bonds") total += parseInt(item.totalBond * item.profit);
                    // 不動産
                    if (item.type === "realEstate") total += parseInt(item.purchaseCount * item.profit);
                }
            }


            userAccount.assetValue += total;
            mainContainer.querySelector("#totalMoney").innerHTML = `
                $${userAccount.assetValue}
            `;


        },1000);

        // 商品購入画面クリックイベント
        const _this_ = this;
        const itemCards = mainContainer.querySelectorAll(".item-card-box");
        for (let i = 0; i < itemCards.length; i++) {
            itemCards[i].addEventListener("click", function() {
                // 商品一覧画面を非表示にする
                mainPageRight.querySelector("#items").classList.remove("d-block");
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
        const {count, profitPerClick} = userAccount.hamburgerInfo;
        const container = document.createElement("div");
        container.classList.add("col-md-5", "col-12", "m-md-2", "p-1", "px-3", "bg-dark");
        container.setAttribute("id", "mainPageLeft");
        container.innerHTML = `
            <div class="text-center my-3 bg-navy p-2 text-light">
                <h5 id="numberOfBurger">${count} Burgers</h5>
                <h5 id="profitPerClick">One click $${profitPerClick}</h5>
            </div>
            <div class="col-12">
                <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" class="burger" id="burgerImg">
            </div>
        `;
        return container;
    }

    /**
     * 右半分を作成
     * @param {UserAccount} userAccount
     * @return {Object}
     */
    createMainPageRight(userAccount) {
        const { name, age, days, assetValue } = userAccount;

        let mainPageRightContainer = document.createElement("div");
        mainPageRightContainer.classList.add("col-md-7", "col-12", "my-md-2");
        mainPageRightContainer.setAttribute("id", "mainPageRight");

        let mainPageRightTop =
        `
            <div class="bg-dark p-3 text-light">
                <div class="d-md-flex text-center p-1">
                    <h5 class="col-md-6 col-12 mx-1 bg-navy">${name}</h5>
                    <h5 class="col-md-6 col-12 mx-1 bg-navy" id="age">${age} years old</h5>
                </div>
                <div class="d-md-flex text-center p-1">
                    <h5 class="col-md-6 col-12 bg-navy mx-1" id="days">${days} days</h5>
                    <h5 class="col-md-6 col-12 bg-navy mx-1" id="totalMoney">$${assetValue}</h5>
                </div>
            </div>
        `;

        const mainPageRightBottom = document.createElement("div");
        mainPageRightBottom.classList.add("scroll", "my-2", "bg-dark");
        mainPageRightBottom.append(this.createItemList(userAccount));

        mainPageRightContainer.innerHTML = `${mainPageRightTop}`;
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

      const detailPageHTML = `
        <div class="bg-danger detail-container">
          <div class="container py-3 bg-dark text-light">
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
            <div>
              <h5>How many would you like to buy?</h5>
              <input class="col-12 bill-input" type="number" min="1" placeholder="0" value="1">
              <h5 id="buy-total" class="text-right">total: $${item.price}</h5>
            </div>
            <div class="d-flex justify-content-around">
              <button id="btnBack" class="btn btn-light back-btn">Go Back</button>
              <button id="btnPurchase" class="btn btn-primary purchase-btn">Purchase</button>
            </div>
          </div>
        </div>
      `;

      const container = document.createElement("div");
      container.innerHTML = detailPageHTML.trim();

      const detailPageMiddle = container.querySelector(".bill-input");
      const buyTotal = container.querySelector("#buy-total");
      const btnBack = container.querySelector("#btnBack");
      const btnPurchase = container.querySelector("#btnPurchase");

      // 入力値が変更されたときに合計価格を更新する
      detailPageMiddle.addEventListener("change", function(event) {
        const total = item.price * event.target.value;
        buyTotal.innerHTML = `total: $${total}`;
      });

      const _this_ = this;
      // 戻るボタンでトップページに戻る
      btnBack.addEventListener("click", function() {
        _this_.returnMainPage(userAccount);
      });

      // 購入ボタンクリックで商品購入
      btnPurchase.addEventListener("click", function() {
        const totalText = mainPageRight.querySelector("#buy-total").innerHTML;
        const total = parseInt(totalText.slice(8));

        if (userAccount.assetValue < total) {
          alert("所持金が不足しています");
        } else {
          _this_.itemPurchase(userAccount, item, mainPageRight);
          _this_.returnMainPage(userAccount);
        }
      });

      return container.firstChild;
    }


    /**
     * ボタンコンテナ作成
     * @param {UserAccount} userAccount
     * @return {Object}
     */
    createMainPageBtn(userAccount) {
        const btnDiv = document.createElement("div");
        btnDiv.classList.add("text-right", "btn-box");
        btnDiv.innerHTML = `
            <button class="btn btn-info reset-btn">reset</button>
            <button class="btn btn-info save-btn">save</button>
        `;

        const _this_ = this;

        const saveBtn = btnDiv.querySelector(".save-btn");
        saveBtn.addEventListener("click", function() {
            _this_.saveUserAccountData(userAccount);
        });

        const resetBtn = btnDiv.querySelector(".reset-btn");
        resetBtn.addEventListener("click", function() {
            _this_.resetUserAccountData(userAccount);
        });

        return btnDiv;
    }

    /**
     * ランダムイベント作成
     * @param {UserAccount} userAccount
     */
    createEvent(userAccount, eventManager) {
        currEvent = eventManager.getRandomEvent();
        // イベントの実行
        currEvent.execute(userAccount);
        // イベント告知モーダルの作成
        eventModal = eventManager.createEventModal(currEvent);
    }


    /**
     * 商品購入時の処理
     * @param {UserAccount} userAccount
     * @param {Item} item
     * @param {Object} mainPageRight
     * @return {void}
     */
    itemPurchase(userAccount, item,  mainPageRight) {
        const purchaseLimitExceeded = () => alert("購入上限数を超えています");

        let purchaseCount = parseInt(mainPageRight.querySelector(".bill-input").value);
        if (item.type === "ability") {
            if (item.maxPurchase - purchaseCount < 0) purchaseLimitExceeded();
            else this.abilityAssignment(userAccount, item, purchaseCount);

        } else if (item.type === "investment") {
            this.investmentAssignment(userAccount, item, purchaseCount);

        } else if (item.type === "realEstate") {
            if (item.maxPurchase - purchaseCount < 0) purchaseLimitExceeded();
            else this.realEstateAssignment(userAccount, item, purchaseCount);
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
        const total = parseInt(item.price * purchaseCount);
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
        const total = parseInt(item.price * purchaseCount);

        item.maxPurchase -= purchaseCount;
        item.purchaseCount += purchaseCount;
        userAccount.assetValue -= total;
        item.totalRealEstate += total;
    }


    /**
     * アイテム一覧を作成
     * @param {UserAccount} userAccount
     * @return {Object}
     */
    createItemList(userAccount) {
        const items = document.createElement("div");
        items.setAttribute("id", "items");

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
                        <h5 class="clickOrs">$${userAccount.items[i].profit} /${clickOrs}</h5>
                    </div>
                </div>
            `;

            items.append(item);
        }

        const itemCards = items.querySelectorAll(".item-card-box");
        const _this_ = this;
        const mainPageRight =  document.querySelector("#mainPageRight");
        if (mainPageRight) {
            for (let i = 0; i < itemCards.length; i++) {
                itemCards[i].addEventListener("click", function() {
                    // 商品一覧画面を非表示にする
                    mainPageRight.querySelector("#items").classList.remove("d-block");
                    mainPageRight.querySelector("#items").classList.add("d-none");

                    // 詳細ページを作成する
                    let detailPage = _this_.createDetailPage(userAccount, i, mainPageRight);
                    mainPageRight.querySelector(".scroll").append(detailPage);
                });
            }
        }

        return items;
    }


    /**
     * 現在の進行状況を保存
     * @param {UserAccount} userAccount
     * @return {void}
     */
    saveUserAccountData(userAccount) {
        const userList = JSON.parse(localStorage.getItem('users')) || [];

        for (let i = 0; i < userList.length; i++) {
            if (userList[i].name === userAccount.name){
                userList[i] = userAccount;
                break;
            }
        }

        localStorage.setItem("users", JSON.stringify(userList));
        alert("データの保存が完了しました");
    }

    /**
     * データをリセット
     * @param {UserAccount} userAccount 
     * @return {void}
     */
    resetUserAccountData(userAccount) {
        // ユーザーデータの初期化
        userAccount.age = 20;
        userAccount.days = 0;
        userAccount.assetValue = 50000;

        // アイテムデータの初期化
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
        userAccount.items = items;

        // ハンバーガーデータの初期化
        userAccount.hamburgerInfo = new Hamburger(0, 25);

        const userList = JSON.parse(localStorage.getItem('users')) || [];
        const loginUserIndex = userList.findIndex(user => user.name === userAccount.name);
        if (loginUserIndex !== -1) {
            userList[loginUserIndex] = userAccount;
            localStorage.setItem("users", JSON.stringify(userList));
            this.config.mainPage.innerHTML = "";
            this.config.mainPage.append(this.createMainPage(userAccount));
        }
    }


    /**
     * ハンバーガークリックイベント
     * @param {UserAccount} userAccount
     * @param {Object} mainContainer
     */
    hamburgerClickEvent(userAccount, mainContainer){
        const burgerImg = mainContainer.querySelector("#burgerImg");
        const _this_ = this
        burgerImg.addEventListener("click", function() {

            _this_.sellBurger(userAccount);

            // 更新した内容を反映させる
            mainContainer.querySelector("#numberOfBurger").innerHTML =`${userAccount.hamburgerInfo.count} Burgers`;
            mainContainer.querySelector("#profitPerClick").innerHTML =`One click $${userAccount.hamburgerInfo.profitPerClick}`;
            mainContainer.querySelector("#totalMoney").innerHTML = `$${userAccount.assetValue}`;
        });
    }

    /**
     * メインページへ戻る
     * @param {UserAccount} userAccount
     * @return {void}
     */
    returnMainPage(userAccount) {
        // 一覧ページの更新
        const scroll =  document.querySelector(".scroll");
        scroll.querySelector(".detail-container").remove();
        scroll.querySelector("#items").remove();
        scroll.append(this.createItemList(userAccount));
        // 左ページの更新
        const mainContainer = document.querySelector(".main-container");
        document.querySelector("#mainPageLeft").remove();
        document.querySelector(".main-container").prepend(this.createMainPageLeft(userAccount));
        this.hamburgerClickEvent(userAccount, mainContainer);
    }
}