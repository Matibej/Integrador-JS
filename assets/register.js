const RegUser = document.querySelector("#register-user");
const RegEmail = document.querySelector("#register-email")
const RegPass = document.querySelector("#register-pass");
const ValidRegForm = document.querySelector("#register-form");

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

const CheckEmail = (item) => {
    let valid = false;
    const RegEmailValue = item.value.trim();

    if (IsEmpty(RegEmailValue)) {
        ShowError(item, "Por favor ingrese su email")
        return

    } else if (!EmailValid(RegEmailValue)) {
        ShowError(item, "El email es invalido.")
    } else {
        Success(item);
        valid = true;
    } return valid;
};

const CheckPassword = (item) => {
    let valid = false;
    const RegPassValue = item.value.trim();

    if (IsEmpty(RegPassValue)) {
        ShowError(item, "Por favor ingrese una contraseña")
        return

    } else if (!PassValid(RegPassValue)) {
        ShowError(item, "La contraseña necesita un mínimo de 8 carácteres y debe contener letras y números.")
    } else {
        Success(item);
        valid = true;
    } return valid;
};

const IsEmpty = (value) => !value.length;

const UserValid = (value, min, max) => value.length > min && value.length < max

const EmailValid = (value) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return re.test(value);
}

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



ValidRegForm.addEventListener("submit",(e) => {
	e.preventDefault(); 
    CheckUser(RegUser);
    CheckEmail(RegEmail);
    CheckPassword(RegPass);

});