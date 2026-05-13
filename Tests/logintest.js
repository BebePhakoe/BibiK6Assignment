import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { login } from '../Requests/login.js';
import { validateLoginResponse } from '../checks/authchecks.js';
import { sleep } from 'k6';

// 1. Load the CSV data
const userData = new SharedArray('users', function () {
    return papaparse.parse(open('../data/Book(Sheet1).csv'), { header: true }).data;
});

export const options = {
    vus: 3,         // Run 3 virtual users
    iterations: 3,  // Total runs
};

export default function () {
    // 2. Pick a unique user for each of the 3 virtual users
    const user = userData[__VU - 1];

    // 3. Pass the CSV data into your login function
    const loginRes = login(
        user.username, 
        user.password
    );

    validateLoginResponse(loginRes);

    console.log(`User ${__VU} (Email: ${user.username}) response: ${loginRes.body}`);

    sleep(1);
}