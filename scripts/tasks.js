  const urlUsuario = 'https://todo-api.ctd.academy/v1/users/getMe';
  const token = localStorage.getItem('token');
  const novaTarefa = document.querySelector('#novaTarefa');
  // ----------------------------------------------------------------------------------------------
                                // CHECAR TOKEN
  // ----------------------------------------------------------------------------------------------

  const tokenCheck = localStorage.getItem('token')

  function checkToken() {
      if(tokenCheck === null) {
      location.replace('./index.html');
   }
    

  }
  
  checkToken()
// ----------------------------------------------------------------------------------------------
// BOTAO SAIR 
// ----------------------------------------------------------------------------------------------

const closeButtonRef = document.querySelector('#closeApp')
  function logout() {

    location.replace('./index.html');
  localStorage.clear()

}
  obtenerNombreUsuario()
  // ...
// ----------------------------------------------------------------------------------------------
                                // Nome de usuario
  // ----------------------------------------------------------------------------------------------
  function obtenerNombreUsuario() {
    const settings = {
      method: 'GET',
      headers: {
        authorization: token
      }
    };
    console.log("Consultando meu usuario...");
    fetch(urlUsuario, settings)
      .then(response => response.json())
      .then(data => {
        console.log("Nome de usuario:");
        console.log(data.firstName);
        const nombreUsuario = document.querySelector('.user-info p');
        nombreUsuario.innerText = data.firstName;
      })
      .catch(error => console.log(error));
  }



// ----------------------------------------------------------------------------------------------
                                // Criar Novas tarefa POST
  // ----------------------------------------------------------------------------------------------
  const tarefas = 'https://todo-api.ctd.academy/v1/tasks';
  function consultarTarefas (){

    const settings = {
      method: 'GET',
      headers: requestHeaders
    };
    console.log("Consultar as tarefas");

    fetch(tarefas, settings)
    .then((response) => response.json())
    .then((tarefas) => {
          console.log("Consultar as tarefaas")
          console.table(tarefas);
        
  })
  .catch(error => console.log(error));
    
  }
  // ----------------------------------------------------------------------------------------------
                                // Criar Novas tarefas POST
  // ----------------------------------------------------------------------------------------------

function criarTarefa(event) {

  event.preventDefault()
// -------------quando criada --------------
  // {
  //   "id": 1,
  //   "description": "Aprender Javascript",
  //   "completed": false,
  //   "userId": 1,
  //   "createdAt": "2021-06-30T22:53:09.549Z"
  // }
  // ----------------- OQUE VAI SER AGREGADO------------
  // {
  //   "description": "Aprender Javascript",
  //   "completed": false
  // }
  const tarefas = {
    id: '',
    description: novaTarefa.value, 
    completed: false,
    userId: '',
    createdAt: ''
  }

  const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
  

  const requestConfig = {
    method: 'POST',
    body:JSON.stringify(),
    headers: requestHeaders,
}
  
fetch(tarefas, requestConfig).then(
  response => {
    if(response.ok) {
      tarefas={
      tarefas.description

    }
    }
  }
)

}

btnSubmit.addEventListener('click', criarTarefa)



closeButtonRef.addEventListener('click', () => logout())



















// ------------------------------ COLA 

// // Função que irá criar uma Task
// function createTask() {

//   // Informações sobre a Task
//   const taskData = {
//       description: 'Teste tarefa 2',
//       completed: true
//   }

//   // Configuração da Request
//   var requestConfig = {
//       method: 'POST',
//       headers: requestHeaders,
//       body: JSON.stringify(taskData)
//   }

//   // Realização da Request para criar uma nova Task
//   fetch(`${baseUrlAPI}/tasks`, requestConfig).then(
//       response => {
//           if(response.ok) {
//               response.json().then(
//                   data => {
//                       console.log(data)
//                   }
//               )
//           }
//       }
//   )

// }


// // Função que obtém as Tasks criadas pelo usuário logado
// function getTasks() {

//   // Configurações da Request
//   var requestConfig = {
//       method: 'GET',
//       headers: requestHeaders
//   }

//   // Requisição para criar a Task
//   fetch(`${baseUrlAPI}/tasks`, requestConfig).then(
//       response => {
//           if(response.ok) {
//               response.json().then(
//                   tasks => {
//                       console.log(tasks)
//                   }
//               )
//           }
//       }
//   )

// }



// // Função que irá obter os dados do usuário Logado
// function getUserData() {

//   // Configuração da Request
//   var requestConfig = {
//       method: 'GET',
//       headers: requestHeaders
//   }

//   // Request para obter os Dados do Usuário
//   fetch(`${baseUrlAPI}/users/getMe`, requestConfig).then(
//       response => {
//           if(response.ok) {

//               // Obtém as Tasks do usuário logado
//               getTasks()

//           } else {
//               // Verifica se a API retornou o Status code 401(O número 401 significa que o Token fornecido está inválido)
//               if(response.status === 401) {

//                   // Caso o Token esteja errado será realizar o Logout do usuário na Aplicação
//                   logout()

//               }
//           }
//       }
//   )

// }
