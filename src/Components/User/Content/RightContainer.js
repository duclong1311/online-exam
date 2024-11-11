import { useCallback, useRef } from "react";
import CountDown from "./CountDown";

const RightContainer = ({ dataQuiz, handleFinishQuiz, setIndex }) => {
    const refDiv = useRef([]);

    const onTimesUp = useCallback(() => {
        handleFinishQuiz();
    }, [handleFinishQuiz]);

    const getClassQuestion = (index, question) => {
        if (question && question.answers.length > 0) {
            let isUnAnswered = question.answers.find(a => a.isSelected === true);
            if (isUnAnswered) {
                return "question selected";
            }
        }
        return "question";
    };

    const handleClickQuestion = (question, index) => {
        setIndex(index);

        if(refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question clicked") {
                    item.className = "question";
                }
            });
        }   

        if (question && question.answers.length > 0) {
            let isUnAnswered = question.answers.find(a => a.isSelected === true);
            if (isUnAnswered) {
                return ;
            }
        }

        refDiv.current[index].className = "question clicked";
    }

    return (
        <>
            <div className="main-timer">
                <CountDown onTimesUp={onTimesUp} />
            </div>
            <div className="main-question">
                {
                    dataQuiz && dataQuiz.length > 0
                    && dataQuiz.map((item, index) => (
                        <div
                            key={`question-${index}`}
                            className={getClassQuestion(index, item)}
                            onClick={() => handleClickQuestion(item, index)}
                            ref={element => refDiv.current[index] = element}
                        >
                            {index + 1}
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default RightContainer;