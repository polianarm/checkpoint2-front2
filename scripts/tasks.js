const urlUsuario = "https://todo-api.ctd.academy/v1/users/getMe";
const token = localStorage.getItem("token");
const novaTarefa = document.querySelector("#novaTarefa");

const btnSubmitRef = document.querySelector("#btnSubmit");
// ----------------------------------------------------------------------------------------------
// CHECAR TOKEN
// ----------------------------------------------------------------------------------------------

const tokenCheck = localStorage.getItem("token");
function checkToken() {
  if (tokenCheck === null) {
    location.replace("./index.html");
  }
}

checkToken();
// ----------------------------------------------------------------------------------------------
// BOTAO SAIR
// ----------------------------------------------------------------------------------------------

const closeButtonRef = document.querySelector("#closeApp");
function logout() {
  // location.replace("./index.html");
  // localStorage.clear();

  Swal.fire({
    title: "Deseja sair?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#7898FF;",
    cancelButtonColor: "#8E64C5",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Swal.fire(
      //   'Até mais',
      //    'success'
      // );
      localStorage.clear();
      location.replace("./index.html");
    }
  });
}

// ...
// ----------------------------------------------------------------------------------------------
// Nome de usuario
// ----------------------------------------------------------------------------------------------
obterNomeUsuario();
function obterNomeUsuario() {
  const settings = {
    method: "GET",
    headers: {
      authorization: token,
    },
  };
  console.log("Consultando meu usuario...");
  fetch(urlUsuario, settings)
    .then((response) => response.json())
    .then((data) => {
      console.log("Nome de usuario:");
      console.log(data.firstName);
      console.log(data.id);

      const nomeUsuario = document.querySelector(".user-info p");
      nomeUsuario.innerText = data.firstName;
    })
    .catch(() => {
      localStorage.clear();
      location.replace("./index.html");
    });
}

// ----------------------------------------------------------------------------------------------
// Criar Novas tarefas POST
// ----------------------------------------------------------------------------------------------

function criarTarefa(event) {
  event.preventDefault();

  const tarefas = {
    description: novaTarefa.value,
    completed: false,
  };

  const requestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: token,
  };

  const requestConfig = {
    method: "POST",
    body: JSON.stringify(tarefas),
    headers: requestHeaders,
  };

  fetch(buscarTarefas, requestConfig).then((response) => {
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.json();
    }
 
    
  });
  // .then((data) => {
  //     userTask =(token)
  // })
}

// ----------------------------------------------------------------------------------------------
// ---------------Criar Novas tarefas GET
// ----------------------------------------------------------------------------------------------

const buscarTarefas = 'https://todo-api.ctd.academy/v1/tasks';
// Função que obtém as Tasks criadas pelo usuário logado
function getTasks() {

  // Configurações da Request
  var requestConfig = {
      method: 'GET',
      headers: requestHeaders
  }

  // Requisição para criar a Task
  fetch(buscarTarefas, requestConfig).then(
      response => {
          if(response.ok) {
              response.json().then(
                  data => {
                      console.log(data)
                      let tasks = [];
                      tasks.push(data)
                      for(const task of tasks){
                        console.log(task)
                      }
                  }
              )
          }
      }
  )

}

btnSubmitRef.addEventListener("click", criarTarefa);

closeButtonRef.addEventListener("click", () => logout());

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
