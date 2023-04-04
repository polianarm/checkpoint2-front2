const closeButtonRef = document.querySelector('#closeApp')

// const token = localStorage.getItem('token')

// function checkToken() {
//     if(token === null) {
//     location.replace('./index.html');
//  }
// }

// checkToken()

function logout() {

    location.replace('./index.html');
  localStorage.clear()

}


window.addEventListener('load', function () {


  const urlUsuario = 'https://todo-api.ctd.academy/v1/users/getMe';
  const token = localStorage.getItem('token');

  obtenerNombreUsuario()
  // ...

  function obtenerNombreUsuario() {
    const settings = {
      method: 'GET',
      headers: {
        authorization: token
      }
    };
    console.log("Consultando mi usuario...");
    fetch(urlUsuario, settings)
      .then(response => response.json())
      .then(data => {
        console.log("Nombre de usuario:");
        console.log(data.firstName);
        const nombreUsuario = document.querySelector('.user-info p');
        nombreUsuario.innerText = data.firstName;
      })
      .catch(error => console.log(error));
  }




})

closeButtonRef.addEventListener('click', () => logout())