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
import { Suspense } from 'react';
import "react-toastify/dist/ReactToastify.css";
import ListQuiz from "./Components/User/ListQuiz";
import DetailQuiz from "./Components/User/DetailQuiz";
import NotFound from "./Components/Home/NotFound";
import ManageQuiz from "./Components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./Components/Admin/Content/Question/Questions";
import PrivateRoute from "../src/Routes/PrivateRoute";

const Layout = (props) => {
    return (
        <Suspense fallback={<h2>🌀 Loading...</h2>}>
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
                    <Route
                        path="/user"
                        element={
                            <PrivateRoute requiredRole="USER">
                                <ListQuiz />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route
                    path="/admin"
                    element={
                        <PrivateRoute requiredRole="ADMIN">
                            <Admin />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<DashBoard />} />
                    <Route path='/admin/manage-user' element={<ManageUser />} />
                    <Route path='/admin/manage-quizzes' element={<ManageQuiz />} />
                    <Route path='/admin/manage-questions' element={<Questions />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}

export default Layout;