import { axios_instance } from "./axiosConfig";

export const updateUser = (user) => axios_instance.patch("/user", user)

export const getUser = () => axios_instance.get("/user")

export const deleteUser = () => axios_instance.delete("/user")
