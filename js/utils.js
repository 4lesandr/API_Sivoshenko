const formValues = {};
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

export const validateNonEmpty = (value) => {
    return value.trim() !== '';
}

export const validateEmail = (email) => {
    const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regExp.test(String(email).toLowerCase().trim());
}

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password.trim());
}

export const setFormValue = (valueKey, newValue, validator) => {
    formValues[valueKey] = newValue;
    if (validator) {
        formValidation[valueKey] = validator(newValue);
    }
}

export const getValidationStatus = (formId) => {
    return Object.values(formValidation[formId]).every(status => !!status);
}

export const submitSignUpForm = () => {
    console.log("FORM IS FINE");
    console.log(formValues);
    return true;
}

export const submitSignInForm = () => {
    console.log("LOGIN FORM IS FINE");
    console.log(formValues);
    return true;
}

document.addEventListener('DOMContentLoaded', () => {

    function updateButtonState(formId) {
        const buttonId = formId === 'signUp' ? 'sign_up_btn' : 'sign_in_btn';
        document.getElementById(buttonId).disabled = !getValidationStatus(formId);
    }

    function handleInput(id, validator, formId) {
        const inputEl = document.getElementById(id);
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
    handleInput('password_repeat', (value) => value === document.getElementById('password').value, 'signUp');
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
        if (getValidationStatus('signUp')) {
            submitSignUpForm();
        }
    };

    document.getElementById('sign_in_btn').onclick = (e) => {
        e.preventDefault();
        if (getValidationStatus('signIn')) {
            submitSignInForm();
        }
    };
});