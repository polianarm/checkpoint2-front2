
const inputEmailRef = document.querySelector("#inputEmail");
const inputPasswordRef = document.querySelector("#inputPassword");
const loginButtonRef = document.querySelector("#loginButton");

const mensage1 = document.querySelector(".mensage");
const mensage2 = document.querySelector(".mensage2");


function validateEmail() {
  const email = inputEmailRef.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]{6,}@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    mensage1.innerHTML = "Preencha corretamente o campo Email";
    inputEmailRef.classList.add("error");
    return false;
  } else {
    mensage1.innerHTML = " ";
    inputEmailRef.classList.remove("error");
    return true;
  }
}

function validatePassword() {
  const password = inputPasswordRef.value;
  // inputPasswordRef.value.length
  if (password.length < 8) {
    mensage2.innerHTML = "Preencha Senha com minimo de 8 caracteres";
    inputPasswordRef.classList.add("error");
    return false;
  } else {
    mensage2.innerHTML = " ";
    inputPasswordRef.classList.remove("error");
    return true;
  }
}

function authUser() {
  const data = {
    email: inputEmailRef.value,
    password: inputPasswordRef.value,
  };

  const requestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  let requestConfig = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(data),
  };

  fetch("https://todo-api.ctd.academy/v1/users/login", requestConfig).then(
    (response) => {
      if (response.ok) {
        response.json().then((token) => {
          localStorage.setItem("token", token.jwt);
          console.log(token);
        });
        window.location.href = "tasks.html";
      } else {
        alert("tente novamente");
      }
    }
  );
}

function completeValidate(event) {
  event.preventDefault();
  if (validateEmail() && validatePassword()) {
  }

  authUser();
}



inputEmailRef.addEventListener("input", validateEmail);
inputPasswordRef.addEventListener("input", validatePassword);
loginButtonRef.addEventListener("click", completeValidate);
