import axios from 'axios';
import { BASE_URL } from '../utils/constant';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});
