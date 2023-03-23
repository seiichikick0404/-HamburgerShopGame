import { Game } from './class/gameClass.js';
import { GameTimeAttack } from './class/gameTimeAttackClass.js';




/**
 * ゲームの実行関数
 * @param {string} newOrLogin
 * @return {void}
 */
window.startGame = (newOrLogin) => {
    let selectElement = document.getElementById("select");
    let selectedOption = selectElement.options[selectElement.selectedIndex];
    const selectedValue = selectedOption.value;

    const game = getRule(selectedValue);
    if (newOrLogin === "new") {
        game.initializeUserAccount();
    } else if (newOrLogin === "login") {
        game.loginUserAccount();
    }
}

function getRule(inputRule) {
    if (inputRule === "normal") {
        console.log("ノーマルモードで開始");
        return new Game();
    } else if (inputRule === "time") {
        console.log("タイムアタックモード");
        return new GameTimeAttack();
    }
}




function deleteUsers() {
    // デバッグ用
    localStorage.removeItem("users");
    console.log(JSON.parse(localStorage.getItem("users")));
    alert("初期化完了");
    return;
}



