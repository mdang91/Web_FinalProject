import NavBar from './components/NavBar/NavBar';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import LoginPage from './components/LoginPage/LoginPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import DashboardPage from './components/DashboardPage/DashboardPage';
import HomeRegisterPage from './components/DashboardPage/HomeRegisterPage/HomeRegisterPage';
import HomeEditPage from './components/DashboardPage/HomeEditPage/HomeEditPage';
import HomeDetailPage from './components/DashboardPage/HomeDetailPage/HomeDetailPage';
import './App.scss';
import PaymentPage from './components/PaymentPage/PaymentPage';
import WishlistPage from './components/DashboardPage/WishlistPage/WishlistPage';
import AdminEditPage from './components/DashboardPage/AdminEditPage/AdminEditPage';

const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } >

          <Route path="/dashboard/" element={<Navigate to="/dashboard" />} />
        </Route>
        <Route path="/home/register" element={
          <PrivateRoute>
            <HomeRegisterPage />
          </PrivateRoute>
        } >
        </Route>
        <Route path="/home/edit" element={
          <PrivateRoute>
            <HomeEditPage />
          </PrivateRoute>
        } >
        </Route>
        <Route path="/home/detail" element={
          <PrivateRoute>
            <HomeDetailPage />
          </PrivateRoute>
        } >
        </Route>
        <Route path="/home/payment" element={
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        } >
        </Route>
        <Route path="/home/wishlist" element={
          <PrivateRoute>
            <WishlistPage />
          </PrivateRoute>
        } >
        </Route>
        <Route path="/admin/edit" element={
          <PrivateRoute>
            <AdminEditPage />
          </PrivateRoute>
        } >
        </Route>
      </Routes>
    </>

  );
}

export default App;
