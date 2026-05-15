import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { login } from '../Requests/login.js';
import { validateLoginResponse } from '../checks/authchecks.js';
import { sleep } from 'k6';
import { TEST_CONFIG } from '../config/constant.js';

const userData = new SharedArray('users', function () {
    return papaparse.parse(open('../data/Book(Sheet1).csv'), { 
        header: true, 
        skipEmptyLines: true 
    }).data;
});

export const options = TEST_CONFIG;

export default function () {
    // Selects a user based on the Virtual User ID
    const user = userData[(__VU - 1) % userData.length];

    // Calls the login function using CSV data
    const loginRes = login(user.username, user.password);

    // Runs the validation checks
    validateLoginResponse(loginRes);

    console.log(`VU ${__VU} | User: ${user.username} | Status: ${loginRes.status}`);

    sleep(1);
}