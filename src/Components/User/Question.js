import _ from 'lodash';

const Question = ({ data, index, handleCheckBox }) => {
    if (_.isEmpty(data)) {
        return (
            <>

            </>
        )
    }

    const handleHandleCheckBox = (event, aId, qId) => {
        handleCheckBox(aId, qId);
    };

    return (
        <>
            {
                data.image ?
                    <div className='q-image'>
                        <img src={`data:image/png;base64,${data.image}`} alt='...' />
                    </div>
                    :
                    <div className='q-image'>

                    </div>
            }
            <div className="question">Question {index + 1}: {data?.questionDescription}?</div>
            <div className="answer">
                {
                    data.answers && data.answers.length && data.answers.map((answer, index) => {
                        return (
                            <div
                                key={`answers-${index}`}
                                className="a-child"
                            >
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        checked={answer.isSelected}
                                        onChange={(event) => handleHandleCheckBox(event, answer.id, data.questionId)}
                                    />
                                    <label className="form-check-label" >
                                        {answer?.description}
                                    </label>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}

export default Question;
