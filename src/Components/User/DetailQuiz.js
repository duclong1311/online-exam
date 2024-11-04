import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuizDetail } from "../../Utils/apiServices";
import _ from "lodash";

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;

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
                        return { questionId: key, answers, questionDescription, image};
                    })
                    .value()
                console.log(data);
            }
        };
        fetchQuestions();
    }, [quizId]);

    return (
        <div className="details-quiz-container">

        </div>
    )
}

export default DetailQuiz;