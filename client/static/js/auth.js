 
 function clear_form(page){
    document.getElementById(page+"_form").reset();
 }
 
 function authenticate(page){   
    var password = document.getElementById('password');
    var username = document.getElementById('username');
    if(page == "register") {
        var confirmPassword = document.getElementById('confirmPassword');
    }
    var login_button = document.getElementById(page);
    login_button.addEventListener('click', async() =>{
        console.log(password.value);
        console.log(username.value);

        if(password.value.length < 4 || username.value.length < 4){
            alert('username and password need to be 4 characters or more');
            clear_form(page);
            return;
        }
        if(page == 'register'){
            if(password.value != confirmPassword.value){
                alert('password mismatch');
                clear_form(page);
                return;
            }
        }
        let user = {
            username : username.value,
            password : password.value
        }
        const params = {
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify(user)
        }
        console.log(params.body);
        fetch('/' + page, params).then(async (response) =>{
            resp = await response.json();
            if(resp.code != 200){
                alert(resp.message);
                clear_form(page);
                return;
            }else{
                if(page == 'register'){
                    window.location.href = '/sign_in';
                }else{
                    localStorage.setItem("API_KEY", resp.id);
                    window.location.href = '/';
                }
            }
        })
    })
}