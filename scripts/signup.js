// inputs por ID 
const firstNameInputRef  = document.querySelector('#firstName');
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
  const firstName = firstNameInputRef.value.trim();

  if (firstName.length <4){
    mensageNameRef.innerHTML ="Preencha corretamente o campo Nome";
    firstNameInputRef.classList.add("error");
    return false;
  }else {
    mensageNameRef.innerHTML = " ";
    firstNameInputRef.classList.remove("error");
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
if( passwordInputRef.value === passwordCheckInputRef.value){
  mensagePasswordCheck.innerHTML = " ";
  passwordCheckInputRef.classList.remove("error");
  return true;
} else {
  mensagePasswordCheck.innerHTML = "Senhas não são iguais";
  passwordCheckInputRef.classList.add("error");

  return false;
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
// submitInputRef.disabled = true;
  function completeValidate(event) {
    // submitInputRef.addEventListener("click", (event) => {
      event.preventDefault(); //evita o comportamento padrão de envio do formulario
      //submitInputRef.disabled = !(validateName() && validateLastName() && validateEmail()  && validatePassword() &&  arePasswordsEqual())
      const allFieldsValid = validateName() && validateLastName() && validateEmail()  && validatePassword() &&  arePasswordsEqual() 
        submitInputRef.disabled=!allFieldsValid
      if (validateName() && validateLastName() && validateEmail()  && validatePassword() &&  arePasswordsEqual()) {
        
        alert("entrou");
        // loginButtonRef.form.submit(); //Submit o formulario se a validação passar
        submitInputRef.removeAttribute("disabled"); 
      
      }

      authUser()
  }

  //requisião

function authUser() {

const userData = {
    firstName: firstNameInputRef.value,
    lastName: lastNameInputRef.value,
    email: emailInputRef.value,
    password: passwordInputRef.value
}
console.log(userData)

const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

var requestConfig = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(userData)
}

  console.log('agora tá entrando no fetch')

    fetch('https://todo-api.ctd.academy/v1/users', requestConfig).then(
    response => {
        if(response.ok) {
          console.log(response)
          token => {
            localStorage.setItem('token', token.jwt)
            console.log(token)
          }
            alert('Você foi cadastrado com sucesso')

            window.location.href = 'index.html'
        } else {

            alert('O usuário ja foi cadastrado')

        }
    }
)
    
}
  
  // adiciona um evento de input para cada campo de entrada
  firstNameInputRef.addEventListener('input', validateName);
  lastNameInputRef.addEventListener('input', validateLastName);
  emailInputRef.addEventListener('input', validateEmail);
  passwordInputRef.addEventListener('input', validatePassword);
  passwordCheckInputRef.addEventListener('input', arePasswordsEqual);
  submitInputRef.addEventListener("click", completeValidate)



  


