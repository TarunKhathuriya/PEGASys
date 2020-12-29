 import api from "./api.service";
 export default{
 fetchUpcomingEvents(){
        return api().get("/events/allUpcomingEvents")
    }
}