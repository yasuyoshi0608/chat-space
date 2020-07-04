$(function(){

      function buildHTML(message){
        if ( message.image ) {
          var html =
          `<div class="content" data-message-id=${message.id}>
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
        //同様にdata-idが反映されるようにしている
        var html =
          `<div class="content" data-message-id=${message.id}>
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
          </div>`
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
        
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.content:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {

      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.chat-main-contents').append(insertHTML);
      $('.chat-main-contents').animate({ scrollTop: $('.chat-main-contents')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
