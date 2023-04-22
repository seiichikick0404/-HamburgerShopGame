"use strict";

// モーダルを開くためのボタンを取得する
const modalBtn = document.getElementById("modal-btn");

// モーダルウィンドウ要素を取得する
const modal = document.getElementById("modal");

// モーダル内の閉じるボタンを取得する
const closeBtn = document.getElementsByClassName("close")[0];

// モーダルを開く関数
function openModal() {
  modal.style.display = "block";
}

// モーダルを閉じる関数
function closeModal() {
  modal.style.display = "none";
}

// モーダルを開くためのイベントリスナーを登録する
modalBtn.addEventListener("click", function () {
  openModal();
});

// モーダル内の閉じるボタンにイベントリスナーを登録する
closeBtn.addEventListener("click", function () {
  closeModal();
});

// モーダルの外側をクリックしたらモーダルを閉じる
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    closeModal();
  }
});

// モーダルを閉じるためのキー操作を追加する
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});
