import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import ChatPage from '../../pages/chat';
import LoginPage from '../../pages/login';
import { LoginRequest } from '../../utils/types/accounts';
import PrivateRoute from '../private';

const RouterApp = () => {
  const [user] = useLocalStorage<LoginRequest | null>('user', null)
  
  return (
    <Router>
      <Routes>
        <Route path='/'
          element={
            <PrivateRoute element={<ChatPage />} isAuthenticated={!!user} />
          } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={
          !!user ?
            <Navigate to="/" /> :
            <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  )
}

export default RouterApp
