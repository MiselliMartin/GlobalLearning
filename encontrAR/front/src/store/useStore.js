import {create} from 'zustand';
import {
  createReport,
  getAllReports,
  getReportsByUser,
  getReportById,
  updateReport,
  deleteReport,
  getNearReports
} from '../api/report';
import { loginRequest, logoutRequest, registerRequest, verifyRequest } from '../api/auth';

export const useStore = create((set) => ({
  user: null,
  reports: [],
  reportsByUser: [],
  isLoading: false,
  error: null,
  reportById: null,
  nearReports: [],
  userCoordinates: [],

  setUser: (user) => set({ user }),
  setReports: (reports) => set({ reports }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setNearReports: (nearReports) => set({nearReports}),
  setUserCoordinates: (userCoordinates) => set({ userCoordinates }),

  login: async(credentials) => {
    set({ isLoading: true })
    console.log(credentials)
    try {
      const response = await loginRequest(credentials)
      const { data } = response.data
      console.log(data)
      set({ user: data, isLoading: false })
      return true
    } catch(error) {
      set({ error: error.response.data.message, isLoading: false });
      return false
    }
  },

  logout: async() => {
    try {
      await logoutRequest()
      set({ user: null });
      return true
    } catch(error) {
      set({ error: error.response.data.message });
      return false
    }
  },

  register: async(user) => {
    set({ isLoading: true })
    try {
      const response = await registerRequest(user)
      const { data } = response.data
      set({ user: data, isLoading: false })
      return true
    } catch(error) {
      set({ error: error.response.data.message, isLoading: false });
      return false
    }
  },

  verify: async() => {
    set({ isLoading: true })
    try {
      const response = await verifyRequest()
      const { data } = response.data
      set({ user: data, isLoading: false })
      return true
    } catch(error) {
      console.log(error.response)
      set({ error: error.response.data.message, isLoading: false });
      return false
    }
  },

  fetchReports: async () => {
    set({ isLoading: true });
    try {
      const response = await getAllReports();
      const { data } = response.data;
      set({ reports: data, isLoading: false });
      return true
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
    }
  },

  createReport: async (report) => {
    set({ isLoading: true });
    try {
      const response = await createReport(report);
      const { data } = response.data
      set((state) => ({ reports: [...state.reports, data], isLoading: false }));
      return data
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
    }
  },

  editReport: async (id, updatedReport) => {
    set({ isLoading: true });
    try {
      const response = await updateReport(id, updatedReport);
      const { data } = response.data
      set((state) => ({
        reports: state.reports.map((report) =>
          report.id === id ? data : report
        ),
        isLoading: false
      }));
      return data
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
    }
  },

  deleteReport: async (id) => {
    set({ isLoading: true });
    try {
      await deleteReport(id);
      set((state) => ({
        reports: state.reports.filter((report) => report.id !== id),
        isLoading: false
      }));
      return true
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      return false
    }
  },

  fetchReportsByUser: async () => {
    set({ isLoading: true });
    try {
      const response = await getReportsByUser();
      const { data } = response.data
      set({ reportsByUser: data, isLoading: false });
      return true
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      return false
    }
  },

  fetchReportById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await getReportById(id);
      const { data } = response.data
      set({ reportById: data, isLoading: false });
      return data
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      return false
    }
  },

  fetchNearReports : async (lat, lng) => {
    set({ isLoading: true })
    try {
      console.log('fetcheandoLosNear')
      const response = await getNearReports(lat, lng)
      const { data } = response.data
      console.log(data)
      set({ nearReports: data, isLoading: false})
      return data
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      return false
    }
  }
}));

