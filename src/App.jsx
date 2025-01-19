import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home';
import Register from './pages/Register';
import 'react-toastify/ReactToastify.css';
import ForgetPass from './pages/ForgetPass';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import BlogEkle from './pages/BlogEkle';
import BlogDetail from './pages/BlogDetail';
function App() {


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        {/* <Route path='/' element={<Layout><Home/></Layout>} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forget-pass' element={<ForgetPass />} />
        <Route path='/profile' element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path='/add-blog' element={<PrivateRoute><BlogEkle /></PrivateRoute>} />
        <Route path='/blogdetail/:id' element={<BlogDetail />} />
      </Routes>
    </>
  )
}

export default App
