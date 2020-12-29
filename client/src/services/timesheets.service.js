import api from "./api.service";
export default {
    async fetchMyTimeSheets(id){
       return await api().get(`timesheets/all/`+id)
    },
    async getTimeSpentByUser(id, startDate, endDate) {
        const data = {
            startDate: startDate,
            endDate: endDate
        }
        return await api().post(`timesheets/user/project/dateRange/`+id, data)
    },
    async fetchAllTimeSheetsByUserIdByDay(id, date) {
        const data = {
            date: date
        }
        return await api().post(`timesheets/user/day/`+id, data)
    },
    async fetchMenteesTimeSheets(id) {
        return await api().post("timesheets/all/mentees/"+id)
    },

    async addTimeSheets(data) {
        return await api().post("timesheets/addMultiple", data)
    },
    async fetchAllTimeSheets() {
        return await api().get("timesheets/all")
    },
     async editTimesheet(data) {
        return await api().post("timesheets/editTimeSheets",data)
     },
    async approveTimeSheetForDay(objdata) {
        const data = {
            isApproved: objdata.isApprove,
            date: objdata.sheetsDate
        }
        return await api().post("timesheets/approve/day/"+objdata.userId, data);
    }
    
}