const inputEmailRef = document.querySelector("#inputEmail");
// seleciona o input do e-mail pelo ID
const inputPasswordRef = document.querySelector("#inputPassword");
// seleciona o input do password pelo ID
const loginButtonRef = document.querySelector("#loginButton");
const mensage1 = document.querySelector('.mensage')

function validateEmail(email) {
    // regex pattern for validating email address
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

function validatePassword(password) {

    const pattern = /^.{8,}$/;    
    return pattern.test(password);
    
}
function validate(){
    const email = inputEmailRef.value;
    const password = inputPasswordRef.value

    if(inputEmailRef.value.length <6) {
    mensage1.innerHTML = 'Preencha corretamente o campo Título'
    inputEmailRef.classList.add('error')

        return false
} else{
    mensage1.innerHTML = ' ';
    inputEmailRef.classList.remove('error')

    return true
        
}

    // if (email.trim() ===" " ){
    //     inputEmailRef.classList.add("error");
    // // mudar o no css para ficar uma cor vermelha no input    
       
    // }else {
    //     inputEmailRef.classList.remove("error");
    //  }

     if(!validateEmail(email)){
        inputEmailRef.classList.add("error");
     }  
     
     if(inputPasswordRef.value === "") {
        inputPasswordRef.style.border = '3px solid red'

    } else {
        inputPasswordRef.style.border = ''
    }
//     if (password.trim()=== " "){
//         // mudar o no css para ficar uma cor vermelha no inputa
//         inputPasswordRef.classList.add("error")
   
// }else {
//     inputPasswordRef.classList.remove("error");
//   }
//   if(!validatePassword(password)){
//     inputPasswordRef.classList.add("error");
//  }  
// return !inputEmailRef.classList.contains("error") && !inputPasswordRef.classList.contains("error");
}

// loginButtonRef.disabled = true

//validação em tempo real 
// inputEmailRef.addEventListener("keyup",() => {
//     validate(inputEmailRef);
// });
// inputPasswordRef.addEventListener("keyup", () => {
//     validate(validatePassword);
// });

// inputEmailRef.addEventListener('keyup', () => validateInput(inputEmailRef))
function completeValidate(){
loginButtonRef.addEventListener("click", (event) => {
    event.preventDefault(); //evita o comportamento padrão de envio do formulario
    if (validate()) {
    alert("entrou")
    //   loginButtonRef.form.submit(); //Submit o formulario se a validação passar
    }
  });
}
//   function validarEmail() {

//     if (inputEmailRef.value.length < 6) {
//       mensage1.innerHTML = 'Preencha corretamente o campo Descrição'
      
//       return false
//     }
//      mensage1.innerHTML = ''
//   }
inputEmailRef.addEventListener('keyup', () => completeValidate(validate()));