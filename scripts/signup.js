// inputs por ID 
const nameInputRef  = document.querySelector('#name');
const lastNameInputRef  = document.querySelector('#lastName');
const emailInputRef  = document.querySelector('#email');
const passwordInputRef  = document.querySelector('#password');
const passwordCheckInputRef  = document.querySelector('#passwordCheck');
const submitInputRef  = document.querySelector('#submit');

// Mensagens de erros de span
const mensageNameRef = document.querySelector(".mensageName")
const mensageLastNameRef = document.querySelector(".mensageLastName")
const mensageEmailRef = document.querySelector(".mensageEmail")
const mensagePasswordRef = document.querySelector(".mensagePassword")
const mensagePasswordCheck = document.querySelector(".mensagePasswordCheck")


function isValid (field, validationFunction){
    return field.value.length > 0 && validationFunction(field.value);
}

// VALIDAÇÃO DE NOME
function validateName(){
  const name = nameInputRef.value.trim();

  if (name.length <4){
    mensageNameRef.innerHTML ="Preencha corretamente o campo Nome";
    nameInputRef.classList.add("error");
    return false;
  }else {
    mensageNameRef.innerHTML = " ";
    nameInputRef.classList.remove("error");
    return true;
  }
}

// VALIDAÇÃO DE SOBRENOME
function validateLastName(){
  const lastName = lastNameInputRef.value.trim();

  if (lastName.length <6  || lastName.length > 50){
    mensageLastNameRef.innerHTML ="Preencha corretamente o campo Sobrenome";
    lastNameInputRef.classList.add("error");
    return false;
  }else {
    mensageLastNameRef.innerHTML = " ";
    lastNameInputRef.classList.remove("error");
    return true;
  }
}

// VALIDAÇÃO DE EMAIL
function validateEmail() {
  const email = emailInputRef.value.trim();
// inputEmailRef.value.length

  if (email.length < 6) {
    mensageEmailRef.innerHTML = "Preencha corretamente o campo Email";
    emailInputRef.classList.add("error");
    return false;
  } else {
    mensageEmailRef.innerHTML = " ";
    emailInputRef.classList.remove("error");
    return true;
  }
}
  
  // função para verificar se a senha é válida
  function validatePassword() {
    const password = passwordInputRef.value.trim();
  // inputPasswordRef.value.length
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
  
  // função para verificar se as senhas são iguais
  function arePasswordsEqual() {
if( passwordInputRef === passwordCheckInputRef){
  mensagePasswordCheck.innerHTML = " ";
  passwordCheckInputRef.classList.remove("error");
  return false;
} else {
  mensagePasswordCheck.innerHTML = "Senhas não são iguais";
  passwordCheckInputRef.classList.add("error");

  return true;
}
}
  
// function showAllErrors() {
//   let isValid = true;

//   if (!validateName()) {
//     isValid = false;
//   }

//   if (!validateLastName()) {
//     isValid = false;
//   }

//   if (!validateEmail()) {
//     isValid = false;
//   }

//   if (!validatePassword()) {
//     isValid = false;
//   }

//   if (!arePasswordsEqual()) {
//     isValid = false;
//   }
// }
 
  function completeValidate() {
    submitInputRef.addEventListener("click", (event) => {
      event.preventDefault(); //evita o comportamento padrão de envio do formulario
      // submitInputRef.disabled = !(validateName() && validateLastName() && validateEmail()  && validatePassword() &&  arePasswordsEqual())
  
      if (validateName() && validateLastName() && validateEmail()  && validatePassword() &&  arePasswordsEqual()) {
        
        alert("entrou");
        //   loginButtonRef.form.submit(); //Submit o formulario se a validação passar
        // submitInputRef.removeAttribute("disabled");

      }
    });
  }
  
  // adiciona um evento de input para cada campo de entrada
  nameInputRef.addEventListener('input', validateName);
  lastNameInputRef.addEventListener('input', validateLastName);
  emailInputRef.addEventListener('input', validateEmail);
  passwordInputRef.addEventListener('input', validatePassword);
  passwordCheckInputRef.addEventListener('input', arePasswordsEqual);


  completeValidate()


  // IMPLEMENTAÇÃO
  // resetar senha e repetir senha caso de erro em um deles
