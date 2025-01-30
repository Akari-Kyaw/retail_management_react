import axios from "../../config/axios"
import { Login } from "./types"

const baseURL='User'
const login = async (credentials: Login) => {
    const request = await axios.post(`${baseURL}/UserLogin`, credentials)
    return request.data.data
}

export default { login }