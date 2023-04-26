// 5秒後に自動的にモーダルを開く
setTimeout(function() {
  var modal = new bootstrap.Modal(document.getElementById('exampleModalToggle'));
  modal.show();
}, 5000);