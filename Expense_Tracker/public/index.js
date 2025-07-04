
document.addEventListener('DOMContentLoaded', () => {
  const signUpForm = document.getElementById('signUpForm');
  if (signUpForm) {
    signUpForm.addEventListener('submit', onSignUpSubmitFunction);
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', onLoginFuction);
  }
});
//document.getElementById('signUpForm').addEventListener('submit',onSignUpSubmitFunction);
async function onSignUpSubmitFunction(event){
        event.preventDefault();

        const form = event.target;
        const myObj={
        name:form.name.value,
        email:form.email.value,
        password:form.password.value
    };
    try {
    const response= await fetch('http://localhost:3000/users/signup',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(myObj)
    });
    const data=await response.json();
    
    if(!response.ok){
        console.log('error');
        const errorText=document.createElement('div');
        errorText.textContent=data.message;
        errorText.style.color='red'
        document.body.appendChild(errorText);
    }
    } catch (error) {
        console.error(error);
    }
    form.reset();
}

//document.getElementById('loginForm').addEventListener('submit',onLoginFuction);
async function onLoginFuction(event) {
    event.preventDefault();

    const form=event.target;
    const myObj={
        email:form.email.value,
        password:form.password.value
    };
    try {
        const response=await fetch('http://localhost:3000/users/login',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(myObj)
        });
        const data=await response.json();
        console.log(data);
        if(data.status===400 || data.status===404){
            const errorDiv=document.createElement('div');
            errorDiv.textContent = data.message;
            errorDiv.style.color = 'red';
            document.body.appendChild(errorDiv);
        }
        else{
            //alert('User has been logged in successfully');
            localStorage.setItem('token',data.token);
            //localStorage.setItem('premium',data.premium);
            window.location.href='expense_page/expense.html';
        }
        
    } catch (error) {
        console.error(error);
    }
    form.reset();
}

document.getElementById('forgotPasswordForm').addEventListener('submit', async function (e) {
    try {
        e.preventDefault();
  const email = document.getElementById('resetEmail').value;
  const myObj={
    email:email
  };

  const response= await fetch('http://localhost:3000/password/forgetpassword',{
    method:'POST',
    headers:{
    'content-type':'application/json'
    },
    body:JSON.stringify(myObj)
  });
  const data=await response.json();
  console.log(data);
  // Close the modal after submission
  const modal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
  modal.hide();

  // Optionally show a success alert
  if(data.status==='success'){
    alert('Reset link sent to ' + email);
  }
  if(data.status==='false'){
    alert('Enter the correct Email');
  }
  
    } catch (error) {
        console.log(error);
    }
  
});
