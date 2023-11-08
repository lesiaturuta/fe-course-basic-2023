const EMAIL_INPUT_ID = 'email';
const PASSWORD_INPUT_ID = 'password';
const NOT_A_ROBOT_CHECKBOX_ID = 'checkbox';
const SUBMIT_BUTTON_ID = 'button';
const ERRORS_CONTAINER_CHECKBOX_ID = 'errors-container-checkbox';
const ERRORS_CONTAINER_PASSWORD_ID = 'errors-container-password';
const ERRORS_CONTAINER_EMAIL_ID = 'errors-container-email';
const RESULT_PAGE_PATH = './login-success.html';

const submitButton = document.getElementById(SUBMIT_BUTTON_ID);

/**
 * Return input value by id.
 * @param {string} elementId
 * @return {string|boolean} input value
 */
function getValueById(elementId) {
    const element = document.getElementById(elementId);
    const type = element.getAttribute('type');
    return type === 'checkbox' ? element.checked : element.value;
}

/**
 * Add errors to errors container.
 * @param {Object} inputData in format like: { [input_id]: error_text, ... }
 */
function setErrorsCheckbox(inputData) {
    const errorContainerElement = document.getElementById(ERRORS_CONTAINER_CHECKBOX_ID);
    Object.values(inputData).forEach((error) => {
        const errorElement = document.createElement('p');
        errorElement.classList.add('error');
        errorElement.textContent = error;
        errorContainerElement.appendChild(errorElement);
    });
}

function setErrorsPassword(inputData) {
    const errorContainerElement = document.getElementById(ERRORS_CONTAINER_PASSWORD_ID);
    Object.values(inputData).forEach((error) => {
        const errorElement = document.createElement('p');
        errorElement.classList.add('error');
        errorElement.textContent = error;
        errorContainerElement.appendChild(errorElement);
    });
}

function setErrorsEmail(inputData) {
    const errorContainerElement = document.getElementById(ERRORS_CONTAINER_EMAIL_ID);
    Object.values(inputData).forEach((error) => {
        const errorElement = document.createElement('p');
        errorElement.classList.add('error');
        errorElement.textContent = error;
        errorContainerElement.appendChild(errorElement);
    });
}

/**
 * Delete all errors from errors container.
 */
function deleteErrors() {
    const errorContainerCheckboxElement = document.getElementById(ERRORS_CONTAINER_CHECKBOX_ID);
    const errorContainerPasswordElement = document.getElementById(ERRORS_CONTAINER_PASSWORD_ID);
    const errorContainerEmailElement = document.getElementById(ERRORS_CONTAINER_EMAIL_ID);
    errorContainerCheckboxElement.replaceChildren();
    errorContainerPasswordElement.replaceChildren();
    errorContainerEmailElement.replaceChildren();
}

/**
 * Goes to the page with the result.
 */
function navigateToResultPage() {
    window.location.href = RESULT_PAGE_PATH;
}

function isEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function removeSpaces(email) {
    return email.replace(/\s+/g, '');
}

function replaceEmailText(inputEmailElement, newEmailText) {
    inputEmailElement.value = newEmailText;
}

function validateForm() {
    deleteErrors();

    let email = getValueById(EMAIL_INPUT_ID);
    const password = getValueById(PASSWORD_INPUT_ID);
    const isChecked = getValueById(NOT_A_ROBOT_CHECKBOX_ID);
    const newEmail = removeSpaces(email);

    if (email.includes(' ')) {
        email = removeSpaces(email);
        // replace the password with the correct one
        replaceEmailText(document.getElementById(EMAIL_INPUT_ID), newEmail);
    }

    if (!isEmail(email)) {
        setErrorsEmail({
            [EMAIL_INPUT_ID]: 'Email must be in format email@localDomen.domen',
        });
        return;
    }

    if (password.length < 8 || password.length > 12) {
        setErrorsPassword({
            [PASSWORD_INPUT_ID]: 'Password must be from 8 to 12 characters',
        });
        return;
    }

    if (!isChecked) {
        setErrorsCheckbox({
            [NOT_A_ROBOT_CHECKBOX_ID]: 'Please check the checkbox',
        });
        return;
    }

    navigateToResultPage();
}

submitButton.onclick = validateForm;
