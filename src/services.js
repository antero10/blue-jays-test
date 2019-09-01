import axios from 'axios';

export const mlbService = axios.create({
    baseURL: 'https://statsapi.mlb.com/api/v1',
});
