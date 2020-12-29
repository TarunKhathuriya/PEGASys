import api from "./api.service";
export default{
fetchAllDepartment(){
       return api().get(`departments/all`)
   },
}