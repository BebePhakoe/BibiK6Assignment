import http from 'k6/http';
import { URLS } from '../config/URLS.js';

export function createTestimonial(token, payload) {

    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(
        URLS.testimonials,
        JSON.stringify(payload),
        params
    );

    return res.json().data.Id;
}