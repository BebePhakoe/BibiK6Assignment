import http from 'k6/http';
import { URLS } from '../config/URLS.js';

export function updateTestimonial(token, id, updatedPayload) {

    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    return http.put(
        `${URLS.testimonials}/${id}`,
        JSON.stringify(updatedPayload),
        params
    );
}