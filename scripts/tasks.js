const urlUsuario = "https://todo-api.ctd.academy/v1/users/getMe";
const token = localStorage.getItem("token");

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
    title: 'Deseja sair?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#7898FF;',
    cancelButtonColor: '#8E64C5',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Swal.fire(
      //   'Até mais',
      //    'success'
      // );
      localStorage.clear();
      location.replace('./index.html');
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
    location.replace('./index.html');
  })
}

// ----------------------------------------------------------------------------------------------
// Criar Novas tarefas POST
// ----------------------------------------------------------------------------------------------
const urlTarefas = "https://todo-api.ctd.academy/v1/tasks";
function consultarTarefas() {
  const settings = {
    method: "GET",
    headers: {
      authorization: token,
    },
  };
  console.log("Consultar as tarefas");

  fetch(urlTarefas, settings)
    .then((response) => response.json())
    .then((tarefas) => {});
}



closeButtonRef.addEventListener("click", () => logout());
