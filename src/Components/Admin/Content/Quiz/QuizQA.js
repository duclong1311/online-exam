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

const QuizQA = () => {
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
    const [questions, setQuestions] = useState(initQuestions);
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
            setQuestions(newQA);
        }
    }, [selectedQuiz]);

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }
    }, [selectedQuiz, fetchQuizWithQA]);



    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: 'Question new',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'Answer 1',
                        isCorrect: false,
                    }
                ]
            };
            setQuestions([...questions, newQuestion]);
        } else if (type === 'REMOVE') {
            setQuestions(questions.filter(item => item.id !== id));
        }
    };


    const handleAddRemoveAnswer = (type, answerId, questionId) => {
        const questionsClone = _.clone(questions);
        const question = questionsClone.find(item => item.id === questionId);

        if (question) {
            if (type === 'ADD') {
                const newAnswer = {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                };
                question.answers.push(newAnswer);
            } else if (type === 'REMOVE') {
                question.answers = question.answers.filter(item => item.id !== answerId);
            }
            setQuestions(questionsClone);
        }
    };

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            setQuestions(questions.map(question =>
                question.id === questionId
                    ? { ...question, description: value }
                    : question
            ));
        }
    };

    const handleOnChangeImage = (questionId, event) => {
        const file = event.target?.files?.[0];
        if (file) {
            setQuestions(questions.map(question =>
                question.id === questionId
                    ? { ...question, imageFile: file, imageName: file.name }
                    : question
            ));
        }
    };

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        setQuestions(questions.map(question =>
            question.id === questionId
                ? {
                    ...question,
                    answers: question.answers.map(answer =>
                        answer.id === answerId
                            ? type === 'CHECKBOX'
                                ? { ...answer, isCorrect: value }
                                : { ...answer, description: value }
                            : answer
                    )
                }
                : question
        ));
    };

    const handlePreviewImage = (questionId) => {
        const question = questions.find(item => item.id === questionId);
        if (question?.imageFile) {
            setDataImagePreview({
                url: URL.createObjectURL(question.imageFile),
                title: question.imageName,
            });
            setIsPreviewImage(true);
        }
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
                        questions && questions.length > 0
                        && questions.map((question, index) => (
                            <div className='q-main mb-4' key={`${question.id}`}>
                                <div className='question-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="type"
                                            // className="form-control is-invalid"
                                            className={`form-control ${!validateQuestionDescription(question.description) ? 'is-invalid' : ''}`}
                                            placeholder=""
                                            value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label>Question {index + 1}'s Description</label>
                                    </div>

                                    <div className='group-upload'>
                                        <label className='label-up' htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='label-up' />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            type={'file'}
                                            hidden
                                            onChange={(event) => handleOnChangeImage(question.id, event)}

                                        >
                                        </input>
                                        <span>
                                            {
                                                question.imageName
                                                    ? <span onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span>
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
                                            questions.length > 1 &&
                                            <button
                                                className='btn btn-danger button-remove'
                                                onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}
                                            >
                                                Remove
                                            </button>
                                        }

                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => (
                                        <div key={answer.id} className='anwsers-content'>
                                            <input
                                                className='form-check-input iscorrect'
                                                type='checkbox'
                                                checked={answer.isCorrect}
                                                onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                            />
                                            <div className="form-floating answer-name">
                                                <input
                                                    value={answer.description}
                                                    type='type'
                                                    className='form-control'
                                                    placeholder=''
                                                    onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                />
                                                <label>Answer {index + 1}</label>
                                            </div>
                                            <div className="btn-group">
                                                <span onClick={() => handleAddRemoveAnswer('ADD', '', question.id)}>
                                                    <IoIosAddCircleOutline className='icon-add' />
                                                </span>
                                                {
                                                    question.answers.length > 1 &&
                                                    <span onClick={() => handleAddRemoveAnswer('REMOVE', answer.id, question.id)}>
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
                        questions && questions.length > 0 &&
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