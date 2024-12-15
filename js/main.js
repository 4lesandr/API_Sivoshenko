import { submitSignUpForm, submitSignInForm, validateEmail, validatePassword, validateNonEmpty } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const formValidation = {
        signUp: {
            first_name: false,
            last_name: false,
            email: false,
            password: false,
            password_repeat: false
        },
        signIn: {
            login_email: false,
            login_password: false
        }
    };

    function updateButtonState(formId) {
        const buttonId = formId === 'signUp' ? 'sign_up_btn' : 'sign_in_btn';
        document.getElementById(buttonId).disabled = !Object.values(formValidation[formId]).every(Boolean);
    }

    function handleInput(id, validator, formId) {
        console.log(`Searching for element with ID: ${id}`);
        const inputEl = document.getElementById(id);
        if (!inputEl) {
            console.error(`Element with ID ${id} not found. Check your HTML and ensure the ID is correct.`);
            return;
        }
        inputEl.oninput = (e) => {
            const field = id === 'password_repeat' ? 'password_repeat' : id;
            formValidation[formId][field] = validator(e.target.value);
            updateButtonState(formId);
            console.log("Current Validation Status:", formValidation[formId]);
        };
    }

    handleInput('first_name', validateNonEmpty, 'signUp');
    handleInput('last_name', validateNonEmpty, 'signUp');
    handleInput('email', validateEmail, 'signUp');
    handleInput('password', validatePassword, 'signUp');
    handleInput('password_repeat', validatePassword, 'signUp');
    handleInput('login_email', validateEmail, 'signIn');
    handleInput('login_password', validateNonEmpty, 'signIn');

    document.getElementById('sign_in_link').onclick = () => {
        document.getElementById('sign_up_form').style.display = 'none';
        document.getElementById('sign_in_form').style.display = 'block';
    };

    document.getElementById('sign_up_link').onclick = () => {
        document.getElementById('sign_up_form').style.display = 'block';
        document.getElementById('sign_in_form').style.display = 'none';
    };

    document.getElementById('sign_up_btn').onclick = (e) => {
        e.preventDefault();
        if (Object.values(formValidation.signUp).every(Boolean)) {
            submitSignUpForm();
        }
    };

    document.getElementById('sign_in_btn').onclick = (e) => {
        e.preventDefault();
        if (Object.values(formValidation.signIn).every(Boolean)) {
            submitSignInForm();
        }
    };
});