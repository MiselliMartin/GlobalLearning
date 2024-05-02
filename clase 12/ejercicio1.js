const inputName = document.getElementById("name");
const inputLastname = document.getElementById("lastname");
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
const inputBirthday = document.getElementById("birthday");
const inputNewsletter = document.getElementById("newsletter");

const spanName = document.getElementById("spanname");
const spanLastname = document.getElementById("spanlastname");
const spanUsername = document.getElementById("spanusername");
const spanPassword = document.getElementById("spanpassword");
const spanBirthday = document.getElementById("spanbirthday");
const newSpanNewsletter = document.getElementById("spanNewsletter");

const spanNameRegEx = document.getElementById("spannameregex");
const spanLastnameRegEx = document.getElementById("spanlastnameregex");
const spanUsernameRegEx = document.getElementById("spanusernameregex");
const spanPasswordRegEx = document.getElementById("spanpasswordregex");

const form = document.querySelector("form");
const spanSubmit = document.getElementById("spansubmit");

function validateInput(input, span) {
  const regex = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ]+$/;

  if (input.value.length < 3) {
    input.classList.add("invalid");
    span.textContent = "Debe tener más de 3 caracteres";
    span.classList.remove("hidden");
    return false;
  } else {
    if (input == inputUsername || input == inputPassword) {
      input.classList.remove("invalid");
      span.classList.add("hidden");
      return true;
    }
  }
  if (!regex.test(input.value)) {
    input.classList.add("invalid");
    span.textContent = "No puede contener números";
    span.classList.remove("hidden");
    return false;
  } else {
    input.classList.remove("invalid");
    span.classList.add("hidden");
    return true;
  }
}

inputName.addEventListener("input", () => {
  validateInput(inputName, spanName);
});

inputLastname.addEventListener("input", () => {
  validateInput(inputLastname, spanLastname);
});

inputUsername.addEventListener("input", () => {
  validateInput(inputUsername, spanUsername);
});

inputPassword.addEventListener("input", () => {
  validateInput(inputPassword, spanPassword);
});

inputNewsletter.addEventListener("click", () => {
  if (inputNewsletter.checked) {
    newSpanNewsletter.textContent =
      "Gracias por subscribirse a nuestro periódico!";
  } else {
    newSpanNewsletter.textContent = "";
  }
});

form.addEventListener("submit", () => {
  event.preventDefault();

  const isNameValid = validateInput(inputName, spanName);
  const isLastnameValid = validateInput(inputLastname, spanLastname);
  const isUsernameValid = validateInput(inputUsername, spanUsername);
  const isPasswordValid = validateInput(inputPassword, spanPassword);
  const isBirthdayValid = validateBirthday(inputBirthday, spanBirthday);

  if (
    !isNameValid ||
    !isLastnameValid ||
    !isUsernameValid ||
    !isPasswordValid ||
    !isBirthdayValid
  ) {
    spanSubmit.textContent =
      "Por favor, complete todos los campos correctamente.";
  } else {
    // Si todos los campos son válidos, podemos enviar el formulario
    form.submit();
  }
});
