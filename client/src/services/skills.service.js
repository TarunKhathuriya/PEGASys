import api from "./api.service";
export default{

fetchAllSkills(){
       return api().get(`/skills/all`)
   },
async addSkill(data) {
    console.log(data);
    return await api().post("/skills/addSkill", data)
},
}
