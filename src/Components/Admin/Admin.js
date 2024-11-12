import AdminSideBar from "./AdminSideBar";
import './Admin.scss';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from "../Header/Language";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaBars } from "react-icons/fa";

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
                        <span onClick={() => setCollapsed(!collapsed)}>
                            <FaBars className="leftside"/>
                        </span>
                        <div className="rightside">
                            <Language />
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item>My profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </div>

                    <div className="admin-main">
                        <PerfectScrollbar>
                            <Outlet />
                        </PerfectScrollbar>
                    </div>
                </div>


            </div>
        </>
    );
}

export default Admin;