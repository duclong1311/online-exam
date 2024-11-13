import { useEffect, useState } from "react";
import { getHistoryDoingQuiz } from "../../Utils/apiServices";
import moment from 'moment'
import { toast } from "react-toastify";


const QuizHistory = () => {

    const [quizHistory, setQuizHistory] = useState([]);

    useEffect(() => {
        const fetchDoingQuizHistory = async () => {
            const res = await getHistoryDoingQuiz();
            res && res.EC === 0 ? setQuizHistory(res.DT.data) : toast.error("Can not connect to server");
        }
        fetchDoingQuizHistory();
    }, []);

    return (
        <>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Quiz's name</th>
                        <th scope="col">Total Question</th>
                        <th scope="col">Correct Question</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        quizHistory && quizHistory.length > 0 && quizHistory.map(
                            (item, index) => (
                                <tr key={`${item}-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.quizHistory.name}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{moment(item.createAt).utc().format('DD/MM/YYYY hh:mm:ss A')}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default QuizHistory;