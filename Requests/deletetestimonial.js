import http from 'k6/http';
import { URLS } from '../config/URLS.js';

export function deleteTestimonial(token, id) {

    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return http.del(
        `${URLS.testimonials}/${id}`,
        null,
        params
    );
}