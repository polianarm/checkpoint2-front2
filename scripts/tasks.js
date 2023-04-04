// const token = localStorage.getItem('token')

// function checkToken() {

//     if(token === null) {
//         window.location.href = '/checkpoint2-front2/signup.html'
//     }
    
// }

// checkToken()


window.addEventListener('load', function() {
  
   
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