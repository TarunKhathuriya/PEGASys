import api from "./api.service";

export default{
    async fetchAllClientsProjects() {
        return await api().get("/projects/allProjectsWithClients");
    },
    async fetchAllProjects() {
        return await api().get("/projects/all");
    },
    async getClients() {
        return await api().get("/projects/allClients");
    },
    async addProject(data){
        return await api().post("/projects/addProject", data);
    },
    async editProject(id, data){
        return await api().put("/projects/updateProject/"+id, data);
    }
   
}