//Jan 1st 1970 UNIX EPIC
var moment=require('moment');


var someTimestamp=moment().valueOf();
console.log(someTimestamp)
var createdAt=1234;
var date =moment(createdAt);
console.log(date.format('h:mm a'));
