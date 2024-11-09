import { useState, useEffect } from 'react';
import Select from 'react-select'
import { getAllQuizForAdmin, getAllUser, assignQuizForUser } from "../../../../Utils/apiServices";
import { toast } from 'react-toastify';

const AssignQuiz = () => {
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        const fetchQuiz = async () => {
            const res = await getAllQuizForAdmin();
            if (res && res.EC === 0) {
                let newQuiz = res.DT.map((item) => (
                    {
                        value: item.id,
                        label: `${item.id} - ${item.description}`
                    }
                ));
                setListQuiz(newQuiz);
            }
        }
        const fetchUser = async () => {
            const res = await getAllUser();
            if (res && res.EC === 0) {
                let newUser = res.DT.map((item) => (
                    {
                        value: item.id,
                        label: `${item.id} - ${item.username}`
                    }
                ));
                setListUser(newUser);
            }
        }
        fetchUser();
        fetchQuiz();
    }, []);

    const handleAssignQuizForUser = async() => {
        const res = await assignQuizForUser(selectedQuiz.value, selectedUser.value);
        res.DT && res.EC === 0 ? toast.success(res.EM) : toast.error(res.EM);
    };

    return (
        <>
            <div className="title">
                Assign Quizz for an User
            </div>
            <hr />
            <div className='assign-quiz row'>
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz: </label>
                    <Select
                        options={listQuiz}
                        onChange={setSelectedQuiz}
                        defaultValue={selectedQuiz}
                    />
                </div>
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select User: </label>
                    <Select
                        options={listUser}
                        onChange={setSelectedUser}
                        defaultValue={selectedUser}
                    />
                </div>
            </div>
            <button
                className='btn btn-warning mt-3'
                onClick={() => handleAssignQuizForUser()}
            >
                Assign Quiz
            </button>
        </>
    )
}

export default AssignQuiz;

