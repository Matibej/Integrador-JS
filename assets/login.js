
const LoginUser = document.querySelector("#login-user");
const LoginPass = document.querySelector("#login-password");
const ValidLoginForm = document.querySelector("#login-form");

const CheckUser = (item) => {
    let valid = false;
    const UserValue = item.value.trim();
 
    if (IsEmpty(UserValue)) {
        ShowError(item, "Por favor ingrese un nombre de usuario.")
        return
    } else if (!UserValid(UserValue, 6, 12)) {
        ShowError(item, "El usuario debe contener entre 6 y 12 carácteres.")
    } else {
        Success(item);
        valid = true;
    } return valid;
 }


const CheckPassword = (item) => {
    let valid = false;
    const LoginPassValue = item.value.trim();

    if (IsEmpty(LoginPassValue)) {
        ShowError(item, "Por favor ingrese una contraseña")
        return

    } else if (!PassValid(LoginPassValue)) {
        ShowError(item, "La contraseña necesita un mínimo de 8 carácteres y debe contener letras y números.")
    } else {
        Success(item);
        valid = true;
    } return valid;
};

const IsEmpty = (value) => !value.length;

const UserValid = (value, min, max) => value.length > min && value.length < max

const PassValid = (value) => {
	const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
	return re.test(value);
};

const ShowError = (value, message) => {
	const formField = value.parentElement;
	value.classList.add("error");
	const error = formField.querySelector("small");
	error.textContent = message;
};

const Success = (value) => {
	const formField = value.parentElement;
	value.classList.remove("error");
	const error = formField.querySelector("small");
	error.textContent = "";
};

ValidLoginForm.addEventListener("submit",(e) => {
	e.preventDefault(); 
    CheckUser(LoginUser);
    CheckPassword(LoginPass);
});








