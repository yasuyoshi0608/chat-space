$(function(){
      function buildHTML(message){
        if ( message.image ) {
          var html =
          `<div class="content">
          <div class="user-date">
          <div class="user-date__user-name">
          ${message.user_name}
          </div>
          <div class="user-date__message-time">
          ${message.created_at}
          </div>
          </div>
          <div class="message-talk">
          <p class="message-talk__content">
          ${message.content}
          </p>
          
          </div>
          <img src=${message.image} >
          </div>`
          
          return html;
        } else {
          var html =
          `<div class="content">
          <div class="user-date">
          <div class="user-date__user-name">
          ${message.user_name}
          </div>
          <div class="user-date__message-time">
          ${message.created_at}
          </div>
          </div>
          <div class="message-talk">
          <p class="message-talk__content">
          ${message.content}
          </p>`
          return html;
        };
      }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $('.chat-main__submit-btn').removeAttr('data-disable-with');
        
    $.ajax({
      url: url,
      // 取得したurl
      type: "POST",
      // HTTPメソッド
      data: formData,
      // 取得したformData
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main-contents').append(html);
      $('form')[0].reset();
      $('.chat-main-contents').animate({ scrollTop: $('.chat-main-contents')[0].scrollHeight});
        
      // 受け取ったHTMLを、appendメソッドによって.messagesというクラスが適用されているdiv要素の子要素の一番最後に追加します。また、フォームを空にする処理も書きます。
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});
