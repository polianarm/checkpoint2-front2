const  inputEmailRef = document.querySelector("inputEmail")
// seleciona o input do e-mail pelo ID
const  inputPasswordRef = document.querySelector("inputEmail")
// seleciona o input do password pelo ID


function validate(){
    const email = inputEmailRef.value;
    const password = inputPasswordRef.value

    if (email.trim() ===" "){
    // mudar o no css para ficar uma cor vermelha no input    
        return false;
    }   
    if ( password.trim()=== " "){
        // mudar o no css para ficar uma cor vermelha no inputa
    return false;
}
 
return true;
}


const loginFormRef = document.querySelector(" #loginForm"); 
// seleciona o form pelo ID

loginFormRef.addEventListener("submit", (event) => {
event.preventDefault(); //evita o comportamento padrão
if(validate()){

    loginFormRef.submit();//Submit o formulario se a validação passar
    // tests
}   
});

