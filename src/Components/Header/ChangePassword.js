import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { postChangePassword } from '../../Utils/apiServices';
import Col from 'react-bootstrap/esm/Col';
import './ChangePassword.scss';

const ChangePassword = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const schema = yup.object().shape({
        currentPassword: yup.string().required('Current Password is required'),
        newPassword: yup.string().required('New Password is required'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = async (values) => {
        const res = await postChangePassword(values.currentPassword, values.newPassword);
        res && res.EC === 0 ? toast.success(res.EM) : toast.error(res.EM);
    };

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                }}
            >
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                    <div className='change-container'>
                        <Form noValidate onSubmit={handleSubmit}>
                            <div className='form-group row'>
                                <Form.Group as={Col} md="6" controlId="current-password">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control
                                        type={isShowPassword ? "text" : "password"}
                                        name="currentPassword"
                                        value={values.currentPassword}
                                        onChange={handleChange}
                                        isInvalid={touched.currentPassword && !!errors.currentPassword}
                                    />
                                    {isShowPassword ? (
                                        <span className='icon-eyes' onClick={() => setIsShowPassword(false)}>
                                            <LiaEyeSolid />
                                        </span>
                                    ) : (
                                        <span className='icon-eyes' onClick={() => setIsShowPassword(true)}>
                                            <LiaEyeSlashSolid />
                                        </span>
                                    )}
                                    <Form.Control.Feedback type='invalid'>
                                        <ErrorMessage name="currentPassword" />
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="6" controlId="new-password">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="newPassword"
                                        value={values.newPassword}
                                        onChange={handleChange}
                                        isInvalid={touched.newPassword && !!errors.newPassword}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        <ErrorMessage name="newPassword" />
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className='form-group row'>
                                <Form.Group as={Col} md="6" controlId="confirm-password">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        <ErrorMessage name="confirmPassword" />
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <Button type="submit" className="w-30 mt-3 btn-dark">Change Password</Button>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    );
}

export default ChangePassword;
