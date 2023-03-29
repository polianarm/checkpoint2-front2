const nameInputRef  = document.querySelector('#name');
const lastNameInputRef  = document.querySelector('#lastName');
const emailInputRef  = document.querySelector('#email');
const passwordInputRef  = document.querySelector('#password');
const passwordCheckInputRef  = document.querySelector('#passwordCheck');
const submitInputRef  = document.querySelector('#submit');




// Exemplo de Requisição POST

var userData = {
    firstName: 'ivin',
    lastName: 'rodrigues',
    email: 'ivin3@mail.com.br',
    password: '1234'
}

const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

var requestConfig = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(userData)
}

fetch('https://todo-api.ctd.academy/v1/users', requestConfig).then(
    response => {
        if(response.ok) {

            alert('Você foi cadastrado com sucesso')

            window.location.href = '/aula-14/login.html'

        } else {

            alert('O usuário ja foi cadastrado')

        }
    }
)