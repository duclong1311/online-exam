import { useCallback } from "react";
import CountDown from "./CountDown";

const RightContainer = ({ dataQuiz, handleFinishQuiz }) => {

    const onTimesUp = useCallback(() => {
        handleFinishQuiz();
    }, [handleFinishQuiz]);

    return (
        <>
            <div className="main-timer">
                <CountDown onTimesUp={onTimesUp}/>
            </div>
            <div className="main-question">
                {
                    dataQuiz && dataQuiz.length > 0
                    && dataQuiz.map((item, index) => (
                        <div key={`question-${index}`} className="question">
                            {index + 1}
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default RightContainer;