import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});


export const getCurrentWeather = async (city) => {
    const { data } = await api.get('/weather', {
        params: { city },
    });
    return data;
};

export const getForecast = async (city) => {
    const { data } = await api.get('/forecast', {
        params: { city },
    });
    return data;
};
