import AdminSideBar from "./AdminSideBar";
import './Admin.scss';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <div className="admin-container">
                <div className="admin-sidebar">
                    <AdminSideBar collapsed={collapsed} />
                </div>
                <div className="admin-content">
                    <div className="admin-header">
                        <button onClick={() => setCollapsed(!collapsed)}>
                            Toggle Sidebar
                        </button>
                    </div>
                    <div className="admin-main">
                        <Outlet />
                    </div>

                </div>

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
            </div>
        </>
    );
}

export default Admin;