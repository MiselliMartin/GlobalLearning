import { axios_instance } from "./axiosConfig";


export const registerRequest = (user) => axios_instance.post("/register", user);

export const loginRequest = (user) => axios_instance.post("/login", user);

export const logoutRequest = () => axios_instance.post("/logout")

export const verifyRequest = () => axios_instance.get("/verify")
