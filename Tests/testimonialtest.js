import { check, sleep } from 'k6';

import { login } from '../Requests/login.js';

import { createTestimonial }
from '../Requests/createtestimonial.js';

import { updateTestimonial }
from '../Requests/updatetestimonial.js';

import { deleteTestimonial }
from '../Requests/deletetestimonial.js';

import {
    testimonialPayload,
    updatePayload
} from '../data/payloads.js';

export const options = {
    vus: 1,
    iterations: 1,
};

export default function () {

    // LOGIN
    const loginRes = login(
        'selena1@gmail.com',
        'test@1234'
    );

    const token = loginRes.json().data.token;

    // CREATE
    const testimonialId = createTestimonial(
        token,
        testimonialPayload
    );

    check(testimonialId, {
        'testimonial created': (id) => id !== undefined,
    });

    // UPDATE
    const updateRes = updateTestimonial(
        token,
        testimonialId,
        updatePayload
    );

    check(updateRes, {
        'update successful': (res) => res.status === 200,
    });

    sleep(1);

    // DELETE
    const deleteRes = deleteTestimonial(
        token,
        testimonialId
    );

    check(deleteRes, {
        'delete successful': (res) =>
            res.status === 200 ||
            res.status === 204,
    });
}