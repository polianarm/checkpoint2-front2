const firstNameInputRef = document.querySelector("#firstName");
const lastNameInputRef = document.querySelector("#lastName");
const emailInputRef = document.querySelector("#email");
const passwordInputRef = document.querySelector("#password");
const passwordCheckInputRef = document.querySelector("#passwordCheck");
const submitInputRef = document.querySelector("#submit");

const mensageNameRef = document.querySelector(".mensageName");
const mensageLastNameRef = document.querySelector(".mensageLastName");
const mensageEmailRef = document.querySelector(".mensageEmail");
const mensagePasswordRef = document.querySelector(".mensagePassword");
const mensagePasswordCheck = document.querySelector(".mensagePasswordCheck");


function isValid(field, validationFunction) {
  return field.value.length > 0 && validationFunction(field.value);
}


function validateName() {
  const firstName = firstNameInputRef.value.trim();

  if (firstName.length < 4) {
    mensageNameRef.innerHTML = "Preencha corretamente o campo Nome";
    firstNameInputRef.classList.add("error");
    return false;
  } else {
    mensageNameRef.innerHTML = " ";
    firstNameInputRef.classList.remove("error");
    return true;
  }
}


function validateLastName() {
  const lastName = lastNameInputRef.value.trim();

  if (lastName.length < 6 || lastName.length > 50) {
    mensageLastNameRef.innerHTML = "Preencha corretamente o campo Sobrenome";
    lastNameInputRef.classList.add("error");
    return false;
  } else {
    mensageLastNameRef.innerHTML = " ";
    lastNameInputRef.classList.remove("error");
    return true;
  }
}


function validateEmail() {
  const email = emailInputRef.value.trim();

  const emailRegex = /^[a-zA-Z0-9._%+-]{6,}@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    mensageEmailRef.innerHTML = "Preencha corretamente o campo Email";
    emailInputRef.classList.add("error");
    return false;
  } else {
    mensageEmailRef.innerHTML = " ";
    emailInputRef.classList.remove("error");
    return true;
  }
}


function validatePassword() {
  const password = passwordInputRef.value.trim();

  if (password.length < 8) {
    mensagePasswordRef.innerHTML = "Preencha Senha com minimo de 8 caracteres";
    passwordInputRef.classList.add("error");
    return false;
  } else {
    mensagePasswordRef.innerHTML = " ";
    passwordInputRef.classList.remove("error");
    return true;
  }
}


function arePasswordsEqual() {
  if (passwordInputRef.value === passwordCheckInputRef.value) {
    mensagePasswordCheck.innerHTML = " ";
    passwordCheckInputRef.classList.remove("error");
    return true;
  } else {
    mensagePasswordCheck.innerHTML = "Senhas não são iguais";
    passwordCheckInputRef.classList.add("error");

    return false;
  }
}


function authUser() {
  const userData = {
    firstName: firstNameInputRef.value,
    lastName: lastNameInputRef.value,
    email: emailInputRef.value,
    password: passwordInputRef.value,
  };
  console.log(userData);

  const requestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  var requestConfig = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(userData),
  };

  console.log("agora tá entrando no fetch");

  fetch("https://todo-api.ctd.academy/v1/users", requestConfig)
  
  .then(
    (response) => {
      if (response.ok) {
        console.log(response);
        (token) => {
          localStorage.setItem("token", token.jwt);
          console.log(token);
        };
   

        window.location.href = "index.html";
      } else {
        Swal.fire(
          'Usuário já cadastrado',
       
         
        )
      }
    }
  );
}

function completeValidate(event) {
  event.preventDefault(); 

  if (
    validateName() &&
    validateLastName() &&
    validateEmail() &&
    validatePassword() &&
    arePasswordsEqual()
  ) {
    submitInputRef.removeAttribute("disabled");
    authUser();
  }
}


firstNameInputRef.addEventListener("input", validateName);
lastNameInputRef.addEventListener("input", validateLastName);
emailInputRef.addEventListener("input", validateEmail);
passwordInputRef.addEventListener("input", validatePassword);
passwordCheckInputRef.addEventListener("input", arePasswordsEqual);
submitInputRef.addEventListener("click", completeValidate);
