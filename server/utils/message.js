var moment=require('moment');


var generateMessage = (from, text) => {
  var someTimestamp=moment().valueOf();
  var date =moment();
  var formattedTime=date.format('h:mm a');
  return {
    from,
    text,
    createdAt: formattedTime
  };
};

var generateLocationMessage = (from,latitude,longitude) => {
    var someTimestamp=moment().valueOf();
    var date =moment();
    var formattedTime=date.format('h:mm a');
      return{
        from,
        url:`http://www.google.com/maps?q${latitude},${longitude}`,
        createdAt: formattedTime
      };
};
module.exports = {generateMessage,generateLocationMessage};
