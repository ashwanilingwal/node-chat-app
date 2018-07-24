
var socket = io();

function scrollToBottom(){
    //selectors and heights
    var messages=jQuery('#messages');
    var newMessage=messages.children('li:last-child')
    //heights
    var clientHeight=messages.prop('clientHeight');
    var scrollTop=messages.prop('scrollTop');
    var scrollHeight=messages.prop('scrollHeight');
    var newMessageHeight=newMessage.innerHeight();
    var lastMessageHeight=newMessage.prev().innerHeight();
    //also account padding
    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight)
    {
      messages.scrollTop(scrollHeight);
      //jquery
    }
}


socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime=message.createdAt;
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage',function(message){
  var li=jQuery('<li></li>');
  var formattedTime=message.createdAt;
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});



jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled','disabled').text('Sending location....');


  navigator.geolocation.getCurrentPosition(function (position) {
    //Button reenabling
    locationButton.removeAttr('disabled');

    locationButton.text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    );
  }, function () {
    alert('Unable to fetch location.');
  });
});
