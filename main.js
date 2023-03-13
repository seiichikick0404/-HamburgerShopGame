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



class Game {

    config = {
        initialForm: document.getElementById("initial-form"),
        bankPage: document.getElementById("mainPage"),
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
            setUsers();
        }

        const savedUsers = JSON.parse(localStorage.getItem('users'));
        const userName = document.querySelector(`input[name="userName"]`).value;
        const userAccount = new UserAccount(userName, 20, 0, 50000);
        this.loginUser = userAccount;

        savedUsers.push(userAccount);
        localStorage.setItem("users", JSON.stringify(savedUsers));

        this.config.initialForm.classList.add("d-none");
        alert("新規登録完了。ゲームへ進みます");

        createMainPage(userAccount);
    }

    /**
     * ユーザーアカウントにログイン
     * @return {void}
     */
    loginUserAccount() {
        // 保存されてるusersを取得
        const userList = JSON.parse(localStorage.getItem("users"));
        const inputName = document.querySelector(`input[name="userName"]`).value;
        let userFlag = false;
        let userAccount ;

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
                alert("新規登録完了。ゲームを開始します");
                this.config.initialForm.classList.add("d-none");
                this.createMainPage(userAccount);

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

    createMainPage(userAccount) {

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








