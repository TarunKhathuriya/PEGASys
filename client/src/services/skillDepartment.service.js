import api from "./api.service";
export default{

fetchAllSkillDepartments(){
       return api().get(`skillDepartments/all`)
   },
fetchAllSkillDepartmentById(id){
       return api().get(`skillDepartments/`+id)
   },
}