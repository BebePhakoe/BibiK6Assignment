import { login } from '../Requests/login.js';
import { getProfile } from '../Requests/getprofile.js';
import { validateLoginResponse } from '../checks/authchecks.js';
import { sleep } from 'k6';

export default function () {

    const loginRes = login(
        'selena1@gmail.com',
        'test@1234'
    );

    validateLoginResponse(loginRes);

    const token = loginRes.json().data.token;

    const profileRes = getProfile(token);

    console.log(profileRes.body);

    sleep(1);
}
