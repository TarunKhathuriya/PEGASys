import api from "./api.service";
export default {
  async fetchRatingsGivenByUserToUser(to, from) {
    return await api().get(`/skillRatings/user/` + to + `/` + from)
  },

  async fetchRatingsGivenByUserBySkill(skillId, from) {
    return await api().get(`/skillRatings/` + skillId + `/` + from)
  },

  async fetchAllSkills() {
    return await api().get(`/skills/all`)
  },

  async fetchAllRatingByUser(id) {
    return await api().get(`/skillRatings/user/all/` + id)
  },
  async fetchAllRatingBySkill(id){
       return await api().get(`/skillRatings/all/`+id)
  },

  async fetchAllUsersBySkill(id){
    return await api().get(`/skillRatings/all/`+id)
  },
  async addSkillsRating(data) {
    console.log(data);
        return await api().post("/skillRatings/addRatings", data)
    },
  async deleteSkill(data) {
      return await api().post("/skillRatings/deleteSkill", data)
  },
 
}
