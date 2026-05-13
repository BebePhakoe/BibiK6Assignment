import http from 'k6/http';
import { URLS } from '../config/URLS.js';

export function getProfile(token) {

    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    return http.get(URLS.profile, params);
}