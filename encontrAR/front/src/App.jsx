import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { AuthProvider } from './contexts/AuthContext'
import { HomePage } from './pages/HomePage'
import { NearByReports } from './pages/NearByReportsPage'
import { MyReportsPage } from './pages/MyReportsPage'
import { ProfilePage } from './pages/ProfilePage'
import { AboutPage } from './pages/AboutPage'
import { LoginPage } from './pages/LoginPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { useStore } from './store/useStore.js'
import { useEffect } from 'react'


function App() {
  const { fetchReports, verify } = useStore()

  useEffect(() => {
    fetchReports()
    verify()

  }, [fetchReports, verify])


  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/*' element={<HomePage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>

            <Route path='/nearby' element={<NearByReports />}></Route>
            <Route path='/my-reports' element={<MyReportsPage />}></Route>
            <Route path='/profile' element={<ProfilePage />}></Route>
            <Route path='/about' element={<AboutPage />}></Route>
          </Routes>

          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
