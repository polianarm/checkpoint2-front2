document.addEventListener("DOMContentLoaded", () => {

  const urlUsuario = "https://todo-api.ctd.academy/v1/users/getMe";
  const token = localStorage.getItem("token");
  const novaTarefa = document.querySelector("#novaTarefa");

  const btnSubmitRef = document.querySelector("#btnSubmit");


  const tokenCheck = localStorage.getItem("token");
  function checkToken() {
    if (tokenCheck === null) {
      location.replace("./index.html");
    }
  }

  checkToken();
 
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
  
  const buscarTarefas = "https://todo-api.ctd.academy/v1/tasks";
  function getTasks() {
    const requestConfig = {
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

  getTasks();

 
  const novaTarefaRef = document.querySelector("#novaTarefa");
  function validateInputTask() {
    const novaTarefa = novaTarefaRef.value.trim();

    if (novaTarefa.length < 4) {
      novaTarefaRef.classList.add("error");
      return false;
    } else {
      novaTarefaRef.classList.remove("error");

      return true;
    }
  }
  novaTarefaRef.addEventListener("keyup", validateInputTask);


  function removeErrorClass() {
    novaTarefaRef.classList.remove("error");
  }
  novaTarefaRef.addEventListener("blur", removeErrorClass);

 
  function criarTarefa(event) {
    event.preventDefault();

    if (validateInputTask()) {
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
        .then(() => {
          getTasks();
          novaTarefa.value = "";
        });
    }
  }
  
  function orderByDate(a, b) {
    const dateRecent = new Date(a.createdAt);
    const dateOld = new Date(b.createdAt);

    if (dateRecent > dateOld) {
      return -1;
    } else if (dateRecent < dateOld) {
      return 1;
    } else {
      return 0;
    }
  }

 
  function getTasksOnApi(tarefas) {
    const tarefasPendentes = document.querySelector(".tarefas-pendentes");
    const tarefasTerminadas = document.querySelector(".tarefas-terminadas");
    tarefasPendentes.innerHTML = "";
    tarefasTerminadas.innerHTML = "";

    tarefas.sort(orderByDate);

    if (tarefas && Array.isArray(tarefas)) {
      tarefas.forEach((tarefa) => {
        const createdAtDate = new Date(tarefa.createdAt);
        const createAtFormted = new Intl.DateTimeFormat("pt-BR").format(
          createdAtDate
        );

        if (tarefa.completed) {
          tarefasTerminadas.innerHTML += `
         <li class="tarefa"  >
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


  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("unfinished")) {
      const taskId = event.target.attributes.id.value;
      atualizarTarefa(taskId);
    }
  });


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
        

          getTasks();
        } else {
          console.error("Houve um erro ao atualizar a tarefa (requisição PUT)");
        }
      }
    );
  }


  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("finish")) {
      const taskId = event.target.attributes.id.value;
      deletarTarefa(taskId);
    }
  });

  function deletarTarefa(taskId) {
    Swal.fire({
      title: "Deletar a Tarefa?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7898FF;",
      cancelButtonColor: "#8E64C5",
      confirmButtonText: "Sim delete  ",
      cancelButtonText: "Mudei de ideia",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestHeaders = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        };

        const requestConfig = {
          method: "DELETE",
          headers: requestHeaders,
        };

        fetch(`${buscarTarefas}/${taskId}`, requestConfig).then((response) => {
          if (response.ok) {
            getTasks();
            Swal.fire({
              title: "Tarefa deletada com sucesso!",
              icon: "success",
            });
          } 
        });
      }
    });
  }

  btnSubmitRef.addEventListener("click", criarTarefa);

  closeButtonRef.addEventListener("click", () => logout());
});
