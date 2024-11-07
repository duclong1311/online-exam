import { useState } from 'react';
import Select from 'react-select'
import './Questions.scss';
import { RiImageAddFill } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdRemoveCircleOutline } from "react-icons/io";



const Questions = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});

    return (
        <>
            <div className="questions-container">
                <div className="title">
                    Manage Questions
                </div>
                <hr />
                <div className="add-new-question">
                    <div className='col-6 form-group'>
                        <label className='mb-2'>Select Quiz: </label>
                        <Select
                            options={options}
                            onChange={setSelectedQuiz}
                            defaultValue={selectedQuiz}
                        />
                    </div>
                    <div className='mt-3 mb-2'>
                        Add questions:
                    </div>
                    <div className='question-content'>
                        <div class="form-floating description">
                            <input type="type" class="form-control" placeholder="" />
                            <label>Question's Description</label>
                        </div>

                        <div className='group-upload'>
                            <label className='label-up'>
                                <RiImageAddFill className='label-up' />
                            </label>
                            <input type={'file'} hidden></input>
                            <span>0 file is uploaded</span>
                        </div>
                        <div className='btn-add'>
                            <button className='btn btn-primary button-add'>Add</button>
                            <button className='btn btn-danger button-remove'>remove</button>
                        </div>

                    </div>

                    <div className='anwsers-content'>
                        <input
                            className='form-check-input iscorrect'
                            type='checkbox'
                        />
                        <div className="form-floating answer-name">
                            <input type='type' className='form-control' placeholder='' />
                            <label>Answer 1</label>
                        </div>
                        <div className="btn-group">
                            <span><IoIosAddCircleOutline className='icon-add' /></span>
                            <span><IoMdRemoveCircleOutline className='icon-remove' /></span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Questions;