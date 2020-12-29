import api from "./api.service";
export default{
async login(userData){
       return await api().post("/users/loginUser",userData);
   }
}