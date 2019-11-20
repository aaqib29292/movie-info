import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    timeout: 1000,
    headers: {
        'authorization': "Bearer " + process.env.REACT_APP_TMDB_KEY,
        'Content-Type': "application/json;charset=utf-8"
    },
});

export default instance;
