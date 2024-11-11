import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { postLogin } from '../../Utils/apiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../Redux/Actions/userActions';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from 'react';
import { LiaEyeSlashSolid } from "react-icons/lia";
import { LiaEyeSolid } from "react-icons/lia";
import Language from '../Header/Language';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const schema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
    });

    const handleSubmit = async (values) => {
        setIsLoading(true);
        const data = await postLogin(values.username, values.password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/');
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    };

    return (
        <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
                username: '',
                password: '',
            }}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <>
                    <div className='login-container'>
                        <div className='header'>
                            Don't have an account yet?
                            <button className='btn btn-dark' onClick={() => navigate('/register')}>Sign up</button>
                            <Language />
                        </div>
                        <div className='title col-4'>CodeGym-Blog</div>
                        <div className='welcome col-4'>Hello, who's this?</div>
                        <div className='login-form'>
                            <Form noValidate onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <Form.Group as={Col} md="12" controlId="validation-username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            isInvalid={touched.username && !!errors.username}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            <ErrorMessage name="username" />
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className='form-group'>
                                    <Form.Group as={Col} md="12" controlId="validation-password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type={isShowPassword ? "text" : "password"}
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={touched.password && !!errors.password}
                                            onKeyDown={() => {}}
                                        />
                                        {
                                            isShowPassword ?
                                                <span className='icon-eyes'
                                                    onClick={() => setIsShowPassword(false)}>
                                                    <LiaEyeSolid />
                                                </span>
                                                :
                                                <span className='icon-eyes'
                                                    onClick={() => setIsShowPassword(true)}>
                                                    <LiaEyeSlashSolid />
                                                </span>
                                        }
                                        <Form.Control.Feedback type='invalid'>
                                            <ErrorMessage name="password" />
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <Button type="submit" className="w-100 mt-3 btn-dark" disabled={isLoading}>
                                    Login
                                    {
                                        isLoading === true &&
                                        <span>
                                            <AiOutlineLoading3Quarters className='loader-icon' />
                                        </span>
                                    }

                                </Button>
                            </Form>
                        </div>
                    </div>
                </>
            )}
        </Formik>
    );
}

export default Login;