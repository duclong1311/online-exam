import axios from './axiosCustomize.js';

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


export {
    postCreateUser, putUpdateUser, deleteUser,
    getUserWithPaginate, postLogin, postRegister,
    getQuizByUser, getQuizDetail, postSubmitQuiz, postCreateNewQuiz,
    getAllQuizForAdmin
}