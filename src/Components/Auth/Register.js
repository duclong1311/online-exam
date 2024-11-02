import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { LiaEyeSlashSolid } from "react-icons/lia";
import { LiaEyeSolid } from "react-icons/lia";
import { postRegister } from '../../Utils/apiServices';



const Register = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string()
            .required('Email is required')
            .email(),
        username: yup.string()
            .required('Username is required')
            .lowercase()
            .matches(/^[a-zA-Z0-9]+$/, 'Invalid username'),
        password: yup.string()
            .required('Password is required'),
    });

    const handleSubmit = async (values) => {
        console.log(values);
        const data = await postRegister(values.email, values.password, values.username)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
        console.log(data);
    };

    return (
        <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
                email: '',
                username: '',
                password: '',
            }}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <>
                    <div className='login-container'>
                        <div className='header'>
                            Already have an account?
                            <button className='btn btn-dark' onClick={() => navigate('/login')}>Login now!</button>
                        </div>
                        <div className='title col-4'>CodeGym-Blog</div>
                        <div className='welcome col-4'>Hello, who's this?</div>
                        <div className='login-form'>
                            <Form noValidate onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <Form.Group as={Col} md="12" controlId="validation-email">
                                        <Form.Label>Email (*)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={touched.email && !!errors.email}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            <ErrorMessage name="email" />
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className='form-group'>
                                    <Form.Group as={Col} md="12" controlId="validation-password">
                                        <Form.Label>Password (*)</Form.Label>
                                        <Form.Control
                                            type={isShowPassword ? "text" : "password"}
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={touched.password && !!errors.password}
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
                                <Button type="submit" className="w-100 mt-3 btn-dark">Create my free account</Button>
                            </Form>
                        </div>
                    </div>
                </>
            )}
        </Formik>
    );
}

export default Register;