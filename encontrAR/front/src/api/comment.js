import { axios_instance } from "./axiosConfig";

export const createComment = (id, comment) => axios_instance.post(`/comment/${id}`, comment)

export const deleteComment = (id) => axios_instance.delete(`/comment/${id}`)