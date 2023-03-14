const config = {
    initialForm: document.getElementById("initial-form"),
    bankPage: document.getElementById("mainPage")
}

class UserAccount {
    /**
     * @param {string} name 　　         ユーザー名
     * @param {int} age     　　         年齢
     * @param {int} days    　　         経過日数
     * @param {int} assetValue          資産額
     * @param {Hamburger} hamburgerInfo ハンバーガー売上情報
     */
    constructor(name, age, days, assetValue, hamburgerInfo) {
        this.name = name;
        this.age = age;
        this.days = days;
        this.assetValue = assetValue;
        this.hamburgerInfo = hamburgerInfo;
    }
}

class Hamburger{
    /**
     * 
     * @param {int} count ハンバーガーの売上数
     * @param {int} profitPerClick 1クリックあたりの利益
     */
    constructor(count, profitPerClick) {
        this.count = count;
        this.profitPerClick = profitPerClick;
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

        const savedUsers = JSON.parse(localStorage.getItem('users'));
        const userName = document.querySelector(`input[name="userName"]`).value;
        const userAccount = new UserAccount(userName, 20, 0, 50000, new Hamburger(0, 25));
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
                    <h5 class="col-md-6 col-12 bg-secondary mx-1" id="days">4186 days</h5>
                    <h5 class="col-md-6 col-12 bg-secondary mx-1" id="totalMoney">$${userAccount.assetValue}</h5>
                </div>
            </div>
        `;

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
            </div><div>
            <div class="d-md-flex bg-dark text-light p-3">
                <div class="col-md-2 d-md-block d-none">
                    <img src="./img/etf.png" class="itemImg col-md-12">
                </div>
                <div class="col-md-6 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>ETF Stock</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$300000</h5>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>0</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$0.1 /s</h5>
                    </div>
                </div>
            </div>
            </div><div>
            <div class="d-md-flex bg-dark text-light p-3">
                <div class="col-md-2 d-md-block d-none">
                    <img src="./img/etf.png" class="itemImg col-md-12">
                </div>
                <div class="col-md-6 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>ETF Bonds</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$300000</h5>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>0</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$0.07 /s</h5>
                    </div>
                </div>
            </div>
            </div><div>
            <div class="d-md-flex bg-dark text-light p-3">
                <div class="col-md-2 d-md-block d-none">
                    <img src="./img/lemonade.png" class="itemImg col-md-12">
                </div>
                <div class="col-md-6 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>Lemonade Stand</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$30000</h5>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>0</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$30 /s</h5>
                    </div>
                </div>
            </div>
            </div><div>
            <div class="d-md-flex bg-dark text-light p-3">
                <div class="col-md-2 d-md-block d-none">
                    <img src="./img/ice_cream.webp" class="itemImg col-md-12">
                </div>
                <div class="col-md-6 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>Ice Cream Truck</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$100000</h5>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>0</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$120 /s</h5>
                    </div>
                </div>
            </div>
            </div><div>
            <div class="d-md-flex bg-dark text-light p-3">
                <div class="col-md-2 d-md-block d-none">
                    <img src="./img/house.webp" class="itemImg col-md-12">
                </div>
                <div class="col-md-6 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>House</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$20000000</h5>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>0</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$32000 /s</h5>
                    </div>
                </div>
            </div>
            </div><div>
            <div class="d-md-flex bg-dark text-light p-3">
                <div class="col-md-2 d-md-block d-none">
                    <img src="./img/town_house.webp" class="itemImg col-md-12">
                </div>
                <div class="col-md-6 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>TownHouse</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$40000000</h5>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>0</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$64000 /s</h5>
                    </div>
                </div>
            </div>
            </div><div>
            <div class="d-md-flex bg-dark text-light p-3">
                <div class="col-md-2 d-md-block d-none">
                    <img src="./img/condominium.webp" class="itemImg col-md-12">
                </div>
                <div class="col-md-6 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>Condominium</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$250000000</h5>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>0</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$500000 /s</h5>
                    </div>
                </div>
            </div>
            </div><div>
            <div class="d-md-flex bg-dark text-light p-3">
                <div class="col-md-2 d-md-block d-none">
                    <img src="./img/factory.webp" class="itemImg col-md-12">
                </div>
                <div class="col-md-6 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>Industrial Space</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$100000000</h5>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>0</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$2200000 /s</h5>
                    </div>
                </div>
            </div>
            </div><div>
            <div class="d-md-flex bg-dark text-light p-3">
                <div class="col-md-2 d-md-block d-none">
                    <img src="./img/skyscraper.webp" class="itemImg col-md-12">
                </div>
                <div class="col-md-6 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>Hotel Skyscraper</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$10000000000</h5>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>0</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$25000000 /s</h5>
                    </div>
                </div>
            </div>
            </div><div>
            <div class="d-md-flex bg-dark text-light p-3">
                <div class="col-md-2 d-md-block d-none">
                    <img src="./img/train.webp" class="itemImg col-md-12">
                </div>
                <div class="col-md-6 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>Bullet-Speed Sky Railway</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$10000000000000</h5>
                    </div>
                </div>
                <div class="col-md-4 col-12">
                    <div class="justify-content-center d-md-flex">
                        <h5>0</h5>
                    </div>
                    <div class="justify-content-center d-md-flex">
                        <h5>$30000000000 /s</h5>
                    </div>
                </div>
            </div>
            </div></div></div>
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








