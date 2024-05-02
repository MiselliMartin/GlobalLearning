const inputName = document.getElementById('name');
const inputLastname = document.getElementById('lastname');
const inputUsername = document.getElementById('username');
const inputPassword = document.getElementById('password');

const spanName = document.getElementById('spanname');
const spanLastname = document.getElementById('spanlastname');
const spanUsername = document.getElementById('spanusername');
const spanPassword = document.getElementById('spanpassword');

const spanNameRegEx = document.getElementById('spannameregex');
const spanLastnameRegEx = document.getElementById('spanlastnameregex');
const spanUsernameRegEx = document.getElementById('spanusernameregex');
const spanPasswordRegEx = document.getElementById('spanpasswordregex');

function validateInput(input, span) {
    const regex = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ]+$/;
    if (!regex.test(input.value)) {
        input.classList.add('invalid');
        span.classList.remove('hidden');
    } else {
        input.classList.remove('invalid');
        span.classList.add('hidden');
    }
}
inputName.addEventListener('input', () => {
    validateInput(inputName, spanName);
});

inputLastname.addEventListener('input', () => {
    validateInput(inputLastname, spanLastname);
});

inputUsername.addEventListener('input', () => {
    validateInput(inputUsername, spanUsername);
});

inputPassword.addEventListener('input', () => {
    validateInput(inputPassword, spanPassword);
});
