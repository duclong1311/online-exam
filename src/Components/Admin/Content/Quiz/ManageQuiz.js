import Select from 'react-select'
import { useState } from 'react';
import { postCreateNewQuiz } from '../../../../Utils/apiServices';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';

const options = [
    { value: 'easy', label: 'Dễ không cần nhìn vẫn làm được' },
    { value: 'medium', label: 'Bình thường ai cũng làm được' },
    { value: 'hard', label: 'Khó vãi nồi không ai làm được' }
]

const ManageQuiz = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('easy');
    const [image, setImage] = useState(null);

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitQuiz = async () => {
        const res = await postCreateNewQuiz(description, name, type?.value, image);
        console.log(res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <div className="quiz-container">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Add a new Quiz</Accordion.Header>
                        <Accordion.Body>
                            <hr />
                            <div className='add-new'>
                                <fieldset className="border rounded-3 p-3">
                                    <legend className="float-none w-auto px-3">Add new Quiz:</legend>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your quiz name..."
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                        <label htmlFor="floatingInput">Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your quiz description..."
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                        <label htmlFor="floatingPassword">Description</label>
                                    </div>
                                    <div className='form-floating mb-3'>
                                        <Select
                                            options={options}
                                            defaultValue={type}
                                            onChange={setType}
                                            placeholder={"Quiz type..."}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label">Upload an image</label>
                                        <input
                                            className="form-control mb"
                                            type="file"
                                            id="formFile"
                                            onChange={(event) => handleChangeFile(event)}
                                        />
                                    </div>
                                    <div className='mt-3'>
                                        <button
                                            className='btn btn-warning'
                                            onClick={() => handleSubmitQuiz()}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="list-detail">
                                <TableQuiz />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Update Questions</Accordion.Header>
                        <Accordion.Body>
                            <div className="list-detail">
                                <QuizQA />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Add a new Quiz</Accordion.Header>
                        <Accordion.Body>
                            <div className="list-detail">
                                <AssignQuiz />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div className="title">
                    Manage Quizzes
                </div>

            </div>
        </>
    )
};

export default ManageQuiz;