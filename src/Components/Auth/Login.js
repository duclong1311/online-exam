import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { postLogin } from '../../Utils/apiServices';
import { toast } from 'react-toastify';


const Login = () => {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
    });

    const handleSubmit = async (values) => {
        const data = await postLogin(values.username, values.password);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/');
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
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
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={touched.password && !!errors.password}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            <ErrorMessage name="password" />
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <Button type="submit" className="w-100 mt-3 btn-dark">Login</Button>
                            </Form>
                        </div>
                    </div>
                </>
            )}
        </Formik>
    );
}

export default Login;