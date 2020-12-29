import api from "./api.service";
export default{
    async fetchUsers() {
        return await api().get("/users/all");
    },
    async fetchUserByID(id) {
        return await api().get("/users/"+id)
    },
    async updateUserByID(id, editedData, blobFile) {
        const file = new File([blobFile.file], { type: blobFile.file.type })
        var formData = new FormData();
        formData.append("data",JSON.stringify(editedData));
        formData.append("file", file)
        return await api().post("users/updateUser/"+id, formData);
    },
    async addNewUser(data, blobFile) {
        const file = new File([blobFile.file], { type: blobFile.file.type })
        var formData = new FormData();
        formData.append("data",JSON.stringify(data));
        formData.append("file", file)
        return await api().post("users/addUser", formData);   
    },
    async deleteUser(userId) {
        return await api().post("users/deleteUser", {id: userId})
    },
    async getMyMentees(userId) {
        return await api().post("users/getMentees",{id: userId});
    }
   
   
}