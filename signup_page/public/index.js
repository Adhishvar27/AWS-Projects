
document.getElementById('signUpForm').addEventListener('submit',onSubmitFunction);
async function onSubmitFunction(event){
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
    if(!response.ok){
        console.log('error');
    }
    } catch (error) {
        console.error(error);
    }
    form.reset();
}
