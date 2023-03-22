const inputEmailRef = document.querySelector("#inputEmail");
const inputPasswordRef = document.querySelector("#inputPassword");
const loginButtonRef = document.querySelector("#loginButton");
const mensage1 = document.querySelector(".mensage");
const mensage2 = document.querySelector(".mensage2");

function validateEmail() {
  const email = inputEmailRef.value;
// inputEmailRef.value.length

  if (email.length < 6) {
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


function completeValidate() {
  loginButtonRef.addEventListener("click", (event) => {
    event.preventDefault(); //evita o comportamento padrão de envio do formulario

    if (validateEmail() && validatePassword()) {
      alert("entrou");
      //   loginButtonRef.form.submit(); //Submit o formulario se a validação passar
loginButtonRef.removeAttribute("disabled");

    }
  });
}

inputEmailRef.addEventListener("input", validateEmail);
inputPasswordRef.addEventListener("input", validatePassword);

completeValidate();



