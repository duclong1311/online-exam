import { useEffect, useState } from "react";
import { getQuizByUser } from "../../Utils/apiServices";
import './ListQuiz.scss';
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {
    const navigate = useNavigate();
    const [arrQuiz, setArrQuiz] = useState([]);

    useEffect(() => {
        const getQuizData = async () => {
            const res = await getQuizByUser();
            if (res && res.EC === 0) {
                setArrQuiz(res.DT);
            }
        };
        getQuizData();
    }, [])

    return (
        <>
            <div className="list-quiz-container container">
                {
                    arrQuiz && arrQuiz.length > 0 && arrQuiz.map((quiz, index) => (
                        <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                            <img src={`data:image/png;base64,${quiz.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz?.description } })}
                                >
                                    Start now!
                                </button>
                            </div>
                        </div>
                    ))
                }

                {arrQuiz && arrQuiz.length === 0 && <div>You don't have any Quiz now</div>}
            </div>
        </>
    )
}

export default ListQuiz;