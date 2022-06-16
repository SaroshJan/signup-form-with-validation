let form = document.querySelector('#form');
let fname = document.querySelector('#fname');
let lname = document.querySelector('#lname');
let email = document.querySelector('#email');
let password = document.querySelector('#password');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFirstNameValid = checkFirstName(),
        isLastNameValid = checkLastName(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();

    let valid = isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid;

    if (valid) {
        form.submit();
    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'fname':
            checkFirstName();
            break;
        case 'lname':
            checkLastName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
    }
}));

const isRequired = (value) => value == '' ? false : true;

const isEmailValid = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

function showError(input, message) {
    let formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');

    let smallEle = formField.querySelector('small');
    smallEle.textContent = message;

    let img = formField.querySelector('.error-img');
    img.style.display = 'block';
}

function showSuccess(input) {
    let formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    let smallEle = formField.querySelector('small');
    smallEle.textContent = '';

    let img = formField.querySelector('.error-img');
    img.style.display = 'none';
}

const checkFirstName = () => {
    let valid = false;

    let firstName = fname.value.trim();

    if (!isRequired(firstName)) {
        showError(fname, 'First Name can not be emty');
    } else {
        showSuccess(fname);
        valid = true;
    }

    return valid;
};

const checkLastName = () => {
    let valid = false;

    let lastName = lname.value.trim();

    if (!isRequired(lastName)) {
        showError(lname, 'Last Name can not be emty');
    } else {
        showSuccess(lname);
        valid = true;
    }

    return valid;
};

const checkEmail = () => {
    let valid = false;

    let emailVal = email.value.trim();

    if (!isRequired(emailVal)) {
        showError(email, 'Email can not be emty');
    } else if (!isEmailValid(emailVal)) {
        showError(email, 'Looks like this is not an email');
    } else {
        showSuccess(email);
        valid = true;
    }

    return valid;
};

const checkPassword = () => {
    let valid = false;

    let passVal = password.value.trim();

    if (!isRequired(passVal)) {
        showError(password, 'Password can not be empty');
    } else {
        showSuccess(password);
        valid = true;
    }
    return valid;
};