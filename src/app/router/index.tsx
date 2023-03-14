import { Navigate, useRoutes } from 'react-router-dom';
import ErrorPage from '@/pages/404';
import ChatPage from '@/pages/chat';
import LoginPage from '@/pages/login';
import { getItemLocalStorage } from '@/utils/helpers';
import PrivateRoute from '../private';

export interface Route {
  path: string;
  element: JSX.Element;
}

const isAuthenticated = (): boolean => {
  const user = getItemLocalStorage("user")
  return !!user;
};

const routes: Route[] = [
  { path: '/chat', element: <PrivateRoute element={<ChatPage />} isAuthenticated={isAuthenticated()} /> },
  { path: '/*', element: <PrivateRoute element={<ErrorPage />} isAuthenticated={isAuthenticated()} /> },
  { path: '/', element: <Navigate to="/chat" /> },
  { path: '/login', element: <LoginPage /> },
];

const RouterApp = () => {

  const routing = useRoutes(routes);
  return routing
}

export default RouterApp