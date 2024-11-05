import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuizDetail } from "../../Utils/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            let res = await getQuizDetail(quizId);
            if (res && res.EC === 0) {
                let raw = res.DT;
                let data = _.chain(raw)
                    .groupBy("id")
                    .map((value, key) => {
                        let answers = [];
                        let questionDescription, image = null;
                        value.forEach((item) => {
                            questionDescription = item?.description;
                            answers.push(item?.answers?.description);
                            image = item?.image;
                        });
                        return { questionId: key, answers, questionDescription, image };
                    })
                    .value()
                console.log(data);
                setDataQuiz(data);
            }
        };
        fetchQuestions();
    }, [quizId]);

    const handlePrev = () => {
        if (index - 1 < 0) return;

        setIndex(index - 1);
    };

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > (index + 1))
            setIndex(index + 1);
    };

    return (
        <div className="details-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                </div>
                <div className="q-content">
                    <Question
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                        index={index}
                    />
                </div>
                <div className="footer">
                    <button
                        className="btn btn-secondary"
                        onClick={() => handlePrev()}
                    >
                        Prev
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleNext()}
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}

export default DetailQuiz;