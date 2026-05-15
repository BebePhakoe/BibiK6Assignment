import http from 'k6/http';
import { URLS } from '../config/URLS.js';

export function login(email, password) {
    const payload = JSON.stringify({
        email: email,
        password: password
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return http.post(URLS.login, payload, params);
}