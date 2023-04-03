const token = localStorage.getItem('token')

function checkToken() {

    if(token === null) {
        window.location.href = '/checkpoint2-front2/signup.html'
    }
    
}

checkToken()

