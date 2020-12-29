 import api from "./api.service";
 export default{
 async fetchAllProjects(id){
        return await api().get("/projects/all/"+id);
    },
    async fetchProjectsByUserId(id){
        return await api().get("/projects/"+id);
    }
}