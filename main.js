import { Game } from './class/gameClass.js';




/**
 * ゲームの実行関数
 * @param {string} newOrLogin
 * @return {void}
 */
window.startGame = (newOrLogin) => {
    const game = new Game();
    if (newOrLogin === "new") {
        game.initializeUserAccount();
    } else if (newOrLogin === "login") {
        game.loginUserAccount();
    }
}

function getRule(inputRule) {
    if (inputRule === "normal") {
        console.log("ノーマルモードで開始");
    } else if (inputRule === "timeAttack") {
        console.log("タイムアタックモード");
    }
}




function deleteUsers() {
    // デバッグ用
    localStorage.removeItem("users");
    console.log(JSON.parse(localStorage.getItem("users")));
    alert("初期化完了");
    return;
}



