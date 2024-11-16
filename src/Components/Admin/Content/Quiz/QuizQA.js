import { useCallback, useEffect, useState } from 'react';
import Select from 'react-select'
import './QuizQA.scss';
import { RiImageAddFill } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { v4 as uuidv4 } from 'uuid';
import Lightbox from "react-awesome-lightbox";
import _ from 'lodash';
import { getAllQuizForAdmin, getQuizWithQA, postUpsertQA } from "../../../../Utils/apiServices";
import { toast } from 'react-toastify';
import { normalize, schema } from 'normalizr';
import { useImmer } from 'use-immer';

const QuizQA = () => {

    const cauhoiId = uuidv4();
    const dapanId = uuidv4();

    const [cauHoiObj, setCauHoiObj] = useImmer({
        [cauhoiId]: {
            id: cauhoiId, description: '', imageFile: '', imageName: '',
            answer: [dapanId]
        }
    });

    const [dapAnObj, setDapAnObj] = useImmer({
        [dapanId]: { id: dapanId, description: '', isCorrect: false }
    });

    const initQuestions = [
        {
            id: uuidv4(),
            description: 'Question 1',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: 'Question 1 - answer 1',
                    isCorrect: false,
                }
            ]
        }
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestions] = useState([initQuestions]);
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: '',
    });
    const [listQuiz, setListQuiz] = useState([]);

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
        fetchQuiz();
    }, []);

    function urlToFile(url, filename, mimeType) {
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }))
            .catch(error => {
                console.error("Lỗi khi chuyển URL thành tệp:", error);
                return null;
            });
    }

    const fetchQuizWithQA = useCallback(async () => {
        const res = await getQuizWithQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            const newQA = await Promise.all(
                res.DT.qa.map(async q => {
                    if (q.imageFile) {
                        q.imageName = `Question - ${q.id} image`;
                        q.imageFile = await urlToFile(
                            `data:image/png;base64,${q.imageFile.trim()}`,
                            `Question-${q.id}.png`,
                            'image/png'
                        );
                    }
                    return q;
                })
            );
            // setQuestions(newQA);

            //normalize data
            const answer = new schema.Entity("answer");
            const question = new schema.Entity("question", {
                answers: [answer]
            })
            const d = normalize(newQA, [question]);
            console.log(">>>>Check data", d);
            setCauHoiObj(d.entities.question);
            setDapAnObj(d.entities.answer);
        }
    }, [selectedQuiz]);

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }
    }, [selectedQuiz, fetchQuizWithQA]);



    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const cauhoiId = uuidv4();
            const dapanId = uuidv4();

            const newQuestion = {
                id: cauhoiId,
                description: 'Question new',
                imageFile: '',
                imageName: '',
                answers: [dapanId]
            };

            let newAnswer = {
                id: dapanId,
                description: 'Answer 1',
                isCorrect: false,
            }

            setCauHoiObj(draft => {
                draft[cauhoiId] = newQuestion
            });
            setDapAnObj(draft => {
                draft[dapanId] = newAnswer
            });

            setQuestions([...questions, newQuestion]);
        } else if (type === 'REMOVE') {

            setCauHoiObj(draft => {
                delete draft[id]
            })
            // setQuestions(questions.filter(item => item.id !== id));
        }
    };


    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        // const questionsClone = _.clone(questions);
        // const question = questionsClone.find(item => item.id === questionId);

        // if (question) {
        //     if (type === 'ADD') {
        //         const newAnswer = {
        //             id: uuidv4(),
        //             description: '',
        //             isCorrect: false,
        //         };
        //         question.answers.push(newAnswer);
        //     } else if (type === 'REMOVE') {
        //         question.answers = question.answers.filter(item => item.id !== answerId);
        //     }
        //     setQuestions(questionsClone);
        // }
        if (type === 'ADD') {
            const newAid = uuidv4();
            const newAnswer = {
                id: newAid,
                description: '',
                isCorrect: false
            };

            setDapAnObj(draft => {
                draft[newAid] = newAnswer;
            })
            setCauHoiObj(draft => {
                draft[questionId].answer.push(newAid);
            });
        }
        if (type === 'REMOVE') {
            if (cauHoiObj[questionId]) {
                setCauHoiObj(draft => {
                    let newAs = cauHoiObj[questionId].answers.filter(item => item !== answerId)
                    draft[questionId].answers = newAs;
                })
            }

            if (dapAnObj[answerId]) {
                setDapAnObj(draft => {
                    delete draft[answerId];
                })
            }
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            if (cauHoiObj[questionId]) {
                setCauHoiObj(draft => {
                    draft[questionId].description = value;
                });
            }
            // setQuestions(questions.map(question =>
            //     question.id === questionId
            //         ? { ...question, description: value }
            //         : question
            // ));
        }
    };

    const handleOnChangeImage = (questionId, event) => {
        if (cauHoiObj[questionId] && event.target && event.target.file) {
            setCauHoiObj(draft => {
                draft[questionId].imageFile = event.target.files[0];
                draft[questionId].imageName = event.target.files[0].name;
            })
        }

        // const file = event.target?.files?.[0];
        // if (file) {
        //     setQuestions(questions.map(question =>
        //         question.id === questionId
        //             ? { ...question, imageFile: file, imageName: file.name }
        //             : question
        //     ));
        // }
    };

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        // setQuestions(questions.map(question =>
        //     question.id === questionId
        //         ? {
        //             ...question,
        //             answers: question.answers.map(answer =>
        //                 answer.id === answerId
        //                     ? type === 'CHECKBOX'
        //                         ? { ...answer, isCorrect: value }
        //                         : { ...answer, description: value }
        //                     : answer
        //             )
        //         }
        //         : question
        // ));
        if (dapAnObj[answerId]) {
            setDapAnObj(draft => {
                if (type === 'CHECKBOX') {
                    draft[answerId].isCorrect = value;
                }
                if (type === 'INPUT') {
                    draft[answerId].description = value;
                }
            })
        }
    };

    const handlePreviewImage = (questionId) => {
        if (cauHoiObj[questionId]) {
            setDataImagePreview({
                url: URL.createObjectURL(cauHoiObj[questionId].imageFile),
                title: cauHoiObj[questionId].imageName,
            });
            setIsPreviewImage(true);
        }
        // const question = questions.find(item => item.id === questionId);
        // if (question?.imageFile) {
        //     setDataImagePreview({
        //         url: URL.createObjectURL(question.imageFile),
        //         title: question.imageName,
        //     });
        //     setIsPreviewImage(true);
        // }
    };

    const validateQuestionDescription = (description) => {
        return description.trim() !== '';
    };

    const handleSubmitCreateQuestions = async () => {
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a Quiz!");
            return;
        }

        let questionClone = _.cloneDeep(questions);
        for (let i = 0; i < questionClone.length; i++) {
            if (questionClone[i].imageFile) {
                questionClone[i].imageFile =
                    await toBase64(questionClone[i].imageFile);
            }
        }

        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone
        });

        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetchQuizWithQA();
        }
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    // console.log(">>>>Check cau hoi: ", cauHoiObj);

    // const tifOptions = Object.keys(cauHoiObj).map((key, index) =>
    //     console.log(">>>>>Check object", key, 'and value', cauHoiObj[key])
    // );

    return (
        <>
            <div className="questions-container">
                <div className="title">
                    Update Questions
                </div>
                <hr />
                <div className="add-new-question">
                    <div className='col-6 form-group'>
                        <label className='mb-2'>Select Quiz: </label>
                        <Select
                            options={listQuiz}
                            onChange={setSelectedQuiz}
                            defaultValue={selectedQuiz}
                        />
                    </div>
                    <div className='mt-3 mb-2'>
                        Add questions:
                    </div>
                    {
                        Object.keys(cauHoiObj).map((keyQ, index) => (
                            <div className='q-main mb-4' key={`${keyQ}`}>
                                <div className='question-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="type"
                                            // className="form-control is-invalid"
                                            className={`form-control ${!validateQuestionDescription(cauHoiObj[keyQ].description) ? 'is-invalid' : ''}`}
                                            placeholder=""
                                            value={cauHoiObj[keyQ].description}
                                            onChange={(event) => handleOnChange('QUESTION', cauHoiObj[keyQ].id, event.target.value)}
                                        />
                                        <label>Question {index + 1}'s Description</label>
                                    </div>

                                    <div className='group-upload'>
                                        <label className='label-up' htmlFor={`${cauHoiObj[keyQ].id}`}>
                                            <RiImageAddFill className='label-up' />
                                        </label>
                                        <input
                                            id={`${cauHoiObj[keyQ].id}`}
                                            type={'file'}
                                            hidden
                                            onChange={(event) => handleOnChangeImage(cauHoiObj[keyQ].id, event)}

                                        >
                                        </input>
                                        <span>
                                            {
                                                cauHoiObj[keyQ].imageName
                                                    ? <span onClick={() => handlePreviewImage(cauHoiObj[keyQ].id)}>{cauHoiObj[keyQ].imageName}</span>
                                                    : '0 file is uploaded'
                                            }
                                        </span>
                                    </div>
                                    <div className='btn-add'>
                                        <button
                                            className='btn btn-primary button-add'
                                            onClick={() => handleAddRemoveQuestion('ADD', '')}
                                        >
                                            Add
                                        </button>
                                        {
                                            Object.keys(cauHoiObj).length > 1 &&
                                            <button
                                                className='btn btn-danger button-remove'
                                                onClick={() => handleAddRemoveQuestion('REMOVE', cauHoiObj[keyQ].id)}
                                            >
                                                Remove
                                            </button>
                                        }

                                    </div>
                                </div>
                                {
                                    cauHoiObj[keyQ].answers && cauHoiObj[keyQ].answers.length > 0
                                    && cauHoiObj[keyQ].answers.map((KeyA, index) => (
                                        <div key={KeyA} className='anwsers-content'>
                                            <input
                                                className='form-check-input iscorrect'
                                                type='checkbox'
                                                checked={dapAnObj[KeyA].isCorrect}
                                                onChange={(event) =>
                                                    handleAnswerQuestion('CHECKBOX', dapAnObj[KeyA].id, cauHoiObj[keyQ].id, event.target.checked)}
                                            />
                                            <div className="form-floating answer-name">
                                                <input
                                                    value={dapAnObj[KeyA].description}
                                                    type='type'
                                                    className='form-control'
                                                    placeholder=''
                                                    onChange={(event) => handleAnswerQuestion('INPUT', dapAnObj[KeyA].id, cauHoiObj[keyQ].id, event.target.value)}
                                                />
                                                <label>Answer {index + 1}</label>
                                            </div>
                                            <div className="btn-group">
                                                <span onClick={() => handleAddRemoveAnswer('ADD', '', cauHoiObj[keyQ].id)}>
                                                    <IoIosAddCircleOutline className='icon-add' />
                                                </span>
                                                {
                                                    cauHoiObj[keyQ].answers.length > 1 &&
                                                    <span onClick={() => handleAddRemoveAnswer('REMOVE', cauHoiObj[keyQ].id, dapAnObj[KeyA].id)}>
                                                        <IoMdRemoveCircleOutline className='icon-remove' />
                                                    </span>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                    {
                        cauHoiObj && cauHoiObj.length > 0 &&
                        <div>
                            <button
                                className='btn btn-warning'
                                onClick={() => handleSubmitCreateQuestions()}
                            >
                                Save Questions</button>
                        </div>
                    }
                    {
                        isPreviewImage === true &&
                        <Lightbox
                            image={dataImagePreview.url}
                            title={dataImagePreview.title}
                            onClose={() => setIsPreviewImage(false)}
                        />
                    }
                </div>
            </div>
        </>
    )
}

export default QuizQA;