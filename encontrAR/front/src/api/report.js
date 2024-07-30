import { axios_instance } from "./axiosConfig";

export const createReport = (report) => axios_instance.post('/report', report)

export const getReportsByUser = () => axios_instance.get("/report")

export const getReportById = (id) => axios_instance.get(`/report/${id}`)

export const updateReport = (id, report) => axios_instance.patch(`/report/${id}`, report)

export const deleteReport = (id) => axios_instance.delete(`/report/${id}`)

export const getAllReports = () => axios_instance.get('/allReports')

export const getNearReports = (lat, lng) => axios_instance.get(`/nearReports?lat=${lat}&lng=${lng}`)