import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://pointos-backend.herokuapp.com/products";
class UserService {
  getPublicContent() {
    return axios.get(API_URL);
  }
}
export default new UserService();
