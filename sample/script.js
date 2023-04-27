// 5秒後に自動的にモーダルを開く
setTimeout(function() {
  var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
  modal.show();
}, 5000);