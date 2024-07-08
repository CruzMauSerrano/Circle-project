let okName = false, okEmail = false, okPhone = false, okMessage = false;

function validateField(id, errorId, condition, customCheck = () => true, customError = () => "") {
  let field = document.getElementById(id);
  let errorField = document.getElementById(errorId);
  let isValid = condition(field.value) && customCheck(field.value);
  
  errorField.hidden = isValid;
  field.style.borderColor = isValid ? "" : "red";
  field.style.borderStyle = isValid ? "" : "solid";

  if (!isValid) {
    let customErrorMessage = customError(field.value);
    if (customErrorMessage) {
      alert(customErrorMessage);
      field.style.borderColor = "red";
      field.style.borderStyle = "solid";
    }
  }

  return isValid ? field.value : false;
}

function validateName() {
  let nameCheck = value => value.toLowerCase() !== "ironhack";
  okName = validateField("name", "errorName", value => value, nameCheck, value => value.toLowerCase() === "ironhack" ? "El nombre 'ironhack' no se puede usar porque yo soy Ironhack" : "");
  checkValues();
}

function validateEmail() {
  let emailCheck = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  okEmail = validateField("email", "errorEmail", value => value, emailCheck);
  document.getElementById("errorFormatEmail").hidden = emailCheck(document.getElementById("email").value);
  checkValues();
}

function validatePhone() {
  let phoneCheck = value => /^[0-9]{9}$/.test(value);
  okPhone = validateField("phone", "errorPhone", value => value, phoneCheck);
  document.getElementById("errorFormatPhone").hidden = phoneCheck(document.getElementById("phone").value);
  checkValues();
}

function validateMessage() {
  okMessage = validateField("message", "errorMessageUser", value => value.length >= 6);
  checkValues();
}

function checkValues() {
  document.getElementById("errorSubmit").hidden = okName && okEmail && okPhone && okMessage;
}

function sendForm() {
  if (okName && okEmail && okPhone && okMessage) {
    document.getElementById("errorSubmit").hidden = true;
    console.log("Datos enviados:", {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value
    });
    alert("Data sent correctly");
    location.reload();
  } else {
    document.getElementById("errorSubmit").hidden = false;
    document.getElementById("errorSubmit").style.borderColor = "red";
  }
}
