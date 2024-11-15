import ModalCreateUser from "./ModalCreateUser";
import { useEffect, useState } from "react";
import { getUserWithPaginate } from "../../../Utils/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
    const LIMIT_USER = 5;
    const [pageCount, setPageCount] = useState(0);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataView, setDataView] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        fetchListUserWithPaginate(1);
    }, []);

    // const fetchListUser = async () => {
    //     const res = await getAllUserService()
    //     if (res.EC === 0) {
    //         setListUsers(res.DT);
    //     }
    // }
    const fetchListUserWithPaginate = async (page) => {
        const res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages)
        }
    }
    const handleClickUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }
    const handleClickView = (user) => {
        setShowModalViewUser(true);
        setDataView(user);
    }
    const handleClickDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }

    //render UI
    return (
        <>
            <div className="manage-user-container">
                <div className="title">
                    Manage User
                </div>
                <div className="users-content">
                    <div>
                        <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}>Add new users</button>
                    </div>
                    <div>
                        {/* <TableUser
                        /> */}
                        <TableUserPaginate 
                            listUsers={listUsers}
                            handleClickUpdate={handleClickUpdate}
                            handleClickView={handleClickView}
                            handleClickDelete={handleClickDelete}
                            fetchListUserWithPaginate={fetchListUserWithPaginate}
                            pageCount={pageCount}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                    <ModalCreateUser
                        show={showModalCreateUser}
                        setShow={setShowModalCreateUser}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        setCurrentPage={setCurrentPage}
                        />
                    <ModalUpdateUser
                        show={showModalUpdateUser}
                        setShow={setShowModalUpdateUser}
                        dataUpdate={dataUpdate}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        currentPage={currentPage}
                        />
                    <ModalViewUser
                        show={showModalViewUser}
                        setShow={setShowModalViewUser}
                        dataView={dataView}
                    />
                    <ModalDeleteUser
                        show={showModalDeleteUser}
                        setShow={setShowModalDeleteUser}
                        dataDelete={dataDelete}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        setCurrentPage={setCurrentPage}
                        />
                </div>
            </div>
        </>
    );
}

export default ManageUser;