import axios from "axios";

const API_KEY = 'AIzaSyAF4Klx-dFKR1Zikj3vdIpZtIgh5-wd1x4';

async function authenticate(mode, email, password) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
    })
    const token = response.data.idToken;

    console.log(response.data);

    return token;
}

export function createUser(email, password){
    return authenticate('signUp', email, password);
}


export function login(email, password){
    return authenticate('signInWithPassword', email, password);
}