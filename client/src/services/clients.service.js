import api from "./api.service";
// const URLDomain = "/users"
export default{
    async fetchAllClients() {
        return await api().get("/clients/all");
    },
    async fetchClientByID(id) {
        return await api().get("/clients/"+id)
    },
    async addClient(data) {
        return await api().post("/clients/addClient", data);
    },
    
}