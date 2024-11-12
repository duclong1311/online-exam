import axios from './axiosCustomize.js';


const getAllUser = () => {
    return axios.get('api/v1/participant/all');
}

const postCreateUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
}

const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', {
        data: { id: userId }
    });
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (userEmail, userPassword) => {
    return axios.post(`api/v1/login`, {
        email: userEmail,
        password: userPassword,
        delay: 3000,
    });
}

const postRegister = (email, password, username) => {
    return axios.post(`api/v1/register`, {
        email, password, username
    });
}

const getQuizByUser = () => {
    return axios.get(`api/v1/quiz-by-participant`);
}

const getQuizDetail = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data });
}

const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data);
}

const getAllQuizForAdmin = (id) => {
    return axios.get(`api/v1/quiz/all`);
}

const createPostQuestionForQuiz = (quizId, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', quizId);
    data.append('description', description);
    data.append('questionImage', questionImage);
    return axios.post('api/v1/question', data);
}

const createNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    });
}

const assignQuizForUser = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId, userId
    });
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}

const postUpsertQA = (data)  => {
    return axios.post(`api/v1/quiz-upsert-qa`, {...data});
}

const logout = (email, refresh_token) => {
    return axios.post(`api/v1/logout`, {
        email, refresh_token
    });
}

const getOverView = () => {
    return axios.get(`api/v1/overview`);
}

const postUpdateProfile = (username, userImage) => {
    const data = new FormData();
    data.append('username', username);
    data.append('userImage', userImage);
    return axios.post('api/v1/profile', data);
}

export {
    postCreateUser, putUpdateUser, deleteUser, getAllUser,
    getUserWithPaginate, postLogin, postRegister,
    getQuizByUser, getQuizDetail, postSubmitQuiz, postCreateNewQuiz,
    getAllQuizForAdmin, createPostQuestionForQuiz, createNewAnswerForQuestion,
    assignQuizForUser, getQuizWithQA, postUpsertQA, logout, getOverView, postUpdateProfile
}