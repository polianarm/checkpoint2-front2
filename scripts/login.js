const inputEmailRef = document.querySelector("#inputEmail");
const inputPasswordRef = document.querySelector("#inputPassword");
const loginButtonRef = document.querySelector("#loginButton");
const mensage1 = document.querySelector(".mensage");
const mensage2 = document.querySelector(".mensage2");

// VALIDAÇÃO DE EMAIL
function validateEmail() {
  const email = emailInputRef.value.trim();
// inputEmailRef.value.length

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



