import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../Utils/apiServices";

const TableQuiz = () => {
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        const fetchQuiz = async () => {
            const res = await getAllQuizForAdmin();
            if (res && res.EC === 0) {
                setListQuiz(res.DT);
            }
        }
        fetchQuiz();
    }, []);

    return (
        <>
            <div>List Quizzes</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listQuiz && listQuiz.length > 0 && listQuiz.map((item, index) => (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{ display: "flex", gap: "15px" }}>
                                    <button className="btn btn-warning">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableQuiz;