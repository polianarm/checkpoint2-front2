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

// ------------------- FUNÇÃO VALIDAR INPUT--------------------------------
const novaTarefaRef = document.querySelector("#novaTarefa")
validateInputTask()
function validateInputTask(){
  const novaTarefa = novaTarefaRef.value.trim();

  if (novaTarefa.length <4){
    novaTarefaRef.classList.add("error");
    return false;
  }else {
      novaTarefaRef.classList.remove("error");
    return true;
  }
}
checkToken();
// ----------------------------------------------------------------------------------------------
//         1-BOTAO SAIR
// ----------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const closeButtonRef = document.querySelector("#closeApp");
  function logout() {
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
        localStorage.clear();
        location.replace("./index.html");
      }
    });
  }

  // ----------------------------------------------------------------------------------------------
  //              2-Nome de usuario get
  // ----------------------------------------------------------------------------------------------
  obterNomeUsuario();
  function obterNomeUsuario() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };
    fetch(urlUsuario, settings)
      .then((response) => response.json())
      .then((data) => {
        const nomeUsuario = document.querySelector(".user-info p");
        nomeUsuario.innerText = data.firstName + " " + data.lastName;
      })
      .catch(() => {
        localStorage.clear();
        location.replace("./index.html");
      });
  }
  /* -------------------------------------------------------------------------- */
  /*                 3-Buscar  tarefas  get          */
  /* -------------------------------------------------------------------------- */
  getTasks();

  const buscarTarefas = "https://todo-api.ctd.academy/v1/tasks";

  function getTasks() {
    var requestConfig = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };

    fetch("https://todo-api.ctd.academy/v1/tasks", requestConfig).then(
      (response) => {
        if (response.ok) {
          response.json().then((tarefa) => {
            getTasksOnApi(tarefa);
          });
        }
      }
    );
  }
  // ----------------------------------------------------------------------------------------------
  //                    4 Criar Novas tarefas POST
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

    fetch(buscarTarefas, requestConfig)
      .then((response) => response.json())
      .then((tarefa) => {
        getTasks();
    

        novaTarefa.value = "";
      });
  }
  // ----------------------------------------------------------------------------------------------
  // --------------- OBTEN AS TAREFAS DA API  [GET]
  // ----------------------------------------------------------------------------------------------
  function getTasksOnApi(tarefas) {
    const tarefasPendentes = document.querySelector(".tarefas-pendentes");
    const tarefasTerminadas = document.querySelector(".tarefas-terminadas");
    tarefasPendentes.innerHTML = "";
    tarefasTerminadas.innerHTML = "";

    if (tarefas && Array.isArray(tarefas)) {
      tarefas.forEach((tarefa) => {
        
        const createdAtDate = new Date(tarefa.createdAt);
        const createAtFormted = new Intl.DateTimeFormat("pt-BR").format(createdAtDate);

        if (tarefa.completed) {
          tarefasTerminadas.innerHTML += `
         <li class="tarefa">
         <div class="not-done finish" id="${tarefa.id}"></div>
         <div class="descricao">
           <p class="nome">${tarefa.description}</p>
           <p class="timestamp">Criada em:  ${createAtFormted}</p>
         </div>
       </li> 
                       `;
        } else {
          tarefasPendentes.innerHTML += `

             <li class="tarefa">
             <div class="not-done unfinished" id="${tarefa.id}"></div>
        <div class="descricao">
          <p class="nome">${tarefa.description}</p>
          <p class="timestamp">Criada em:  ${createAtFormted}</p>
        </div>
      </li>           
         
         `;
        }
      });
    }
  }

  // ----------------------------------------------------------------------------------------------
  // --------------- EVENT LISTENER PPARA TROCAR ESTADO DA TAREFA
  // --------------------------------------------------------------------------------------------
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("unfinished")) {
      const taskId = event.target.attributes.id.value;
      atualizarTarefa(taskId);
    }
  });
  // ----------------------------------------------------------------------------------------------
  // --------------- FUNÇÃO PARA TROCAR ESTADO DA TAREFA
  // --------------------------------------------------------------------------------------------
  function atualizarTarefa(id) {
    let tarefaObj = {
      completed: true,
    };

    let tarefaObjJson = JSON.stringify(tarefaObj);

    const requestHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    };
    const requestConfig = {
      method: "PUT",
      headers: requestHeaders,
      body: tarefaObjJson,
    };

    fetch(`https://todo-api.ctd.academy/v1/tasks/${id}`, requestConfig).then(
      (response) => {
        if (response.ok) {
          // console.log(`Tarefa ${id} atualizada com sucesso!`);
          console.log(response)
          getTasks();
        } else {
          // console.error("Houve um erro ao atualizar a tarefa (requisição PUT)");
        }
      }
    );
  }

  // ===========================================================
  // 6 - EVENT LISTENER PARA DELETAR TASKS POR ID
  // ===========================================================
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("finish")) {
      const taskId = event.target.attributes.id.value;
      deletarTarefa(taskId);
    }
  });
  // ===========================================================
  // Função que deleta uma Task pelo ID
  // ===========================================================
  function deletarTarefa(taskId) {
    const requestHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    };

    const requestConfig = {
      method: "DELETE",
      headers: requestHeaders,
    };

    fetch(`${buscarTarefas}/${taskId}`, requestConfig)
      .then((response) => {
        if (response.ok) {
          // console.log(`Tarefa ${taskId} deletada com sucesso!`);

          getTasks();
        }
      })
      .catch((error) => {
        // console.error("Houve um erro ao deletar a tarefa: ", error);
      });
  }

  btnSubmitRef.addEventListener("click", criarTarefa);

  closeButtonRef.addEventListener("click", () => logout());
});
