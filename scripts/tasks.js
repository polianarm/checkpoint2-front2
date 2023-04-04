  const urlUsuario = 'https://todo-api.ctd.academy/v1/users/getMe';
  const token = localStorage.getItem('token');
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
                                // Criar Novas tarefas POST
  // ----------------------------------------------------------------------------------------------
  const urlTarefas = 'https://todo-api.ctd.academy/v1/tasks';
  function consultarTarefas (){

    const settings = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };
    console.log("Consultar as tarefas");

    fetch(urlTarefas, settings)
    .then((response) => response.json())
    .then((tareas) => {
        

    })
  }

  


closeButtonRef.addEventListener('click', () => logout())