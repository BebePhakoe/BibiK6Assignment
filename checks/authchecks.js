import { check } from 'k6';

export function validateLoginResponse(response) {

    return check(response, {
        'status is 200': (res) => res.status === 200,
        'body is not empty': (res) => res.body.length > 0,
    });
}