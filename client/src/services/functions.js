const moment = require('moment');
export default{
    convertDateToDate(dateTime) {
        return moment(dateTime).format('MMMM Do YYYY') == "Invalid date" ? null : moment(dateTime).format('MMMM Do YYYY');
    },
    convertDateToDateReverse(dateTime) {
        return moment(dateTime).format();
    },
    convertDateInCalenderFormat(date) {
        var d = new Date(date);
        var year = d.getFullYear();
        var month = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
        var sdate = (d.getDate() > 9) ? d.getDate() : '0' + d.getDate();
        return year + "/" + month + "/" + sdate;
    },
}