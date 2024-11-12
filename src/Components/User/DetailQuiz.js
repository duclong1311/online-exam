import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuizDetail, postSubmitQuiz } from "../../Utils/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContainer from "./Content/RightContainer";

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

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
                            image = item?.image;
                            item.answers.isSelected = false;
                            answers.push(item?.answers);
                        });
                        answers = _.orderBy(answers, ['id'], ['asc']);

                        return { questionId: key, answers, questionDescription, image };
                    })
                    .value()
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

    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: [],
        };

        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = +question.questionId;
                let userAnswerId = [];

                question.answers.forEach(a => {
                    if (a.isSelected) {
                        userAnswerId.push(a.id);
                    }
                })

                answers.push({
                    questionId,
                    userAnswerId
                })
            });
            payload.answers = answers;

            const res = await postSubmitQuiz(payload);
            if (res && res.EC === 0) {
                setIsShowModalResult(true);
                setDataModalResult({
                    quizData: res.DT.quizData,
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                });
            } else {
                alert('waring');
            }
        }
    };

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId);
        if (question && question.answers) { // Tìm xem có question nào có thuộc tính answer thay đổi hay không
            question.answers = question.answers.map(item => {
                if (+item.id === +answerId) { // Tìm xem answer nào được người dùng click hay không
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        dataQuizClone[index] = question;
        setDataQuiz(dataQuizClone);
    }

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
                        handleCheckBox={handleCheckBox}
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
                    <button
                        className="btn btn-warning"
                        onClick={() => handleFinishQuiz()}
                    >
                        Finish
                    </button>
                </div>
            </div>
            <div className="right-content">
                <RightContainer
                    dataQuiz={dataQuiz}
                    handleFinishQuiz={handleFinishQuiz}
                    setIndex={setIndex}
                />
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}

export default DetailQuiz;