import { Route, Routes } from "react-router-dom";
import App from './App';
import Admin from './Components/Admin/Admin';
// import User from './Components/User/User';
import HomePage from './Components/Home/HomePage';
import ManageUser from './Components/Admin/Content/ManageUser';
import DashBoard from './Components/Admin/Content/DashBoard';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ListQuiz from "./Components/User/ListQuiz";
import DetailQuiz from "./Components/User/DetailQuiz";
import NotFound from "./Components/Home/NotFound";
import ManageQuiz from "./Components/Admin/Content/Quiz/ManageQuiz";

const Layout = (props) => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="/user" element={<ListQuiz />} />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admin" element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path='/admin/manage-user' element={<ManageUser />} />
                    <Route path='/admin/manage-quizzes' element={<ManageQuiz />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default Layout;