  import { BASE_URL } from '../config.js'
    document.addEventListener('DOMContentLoaded', async () => {
        const form = document.getElementById('resetForm');
        const newPass = document.getElementById('password');
        const confirmpass = document.getElementById('password1');

        form.addEventListener('submit', async (event) => {
               event.preventDefault();
            if (newPass.value !== confirmpass.value) {
                alert('Password is missmatch');
                return
            }
            const email = document.getElementById('email').value;
            const password = newPass.value;
            try {
                const response = await fetch(`${BASE_URL}/password/passwordchange`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, password: password })
                });
                const result=await response.json();
                if (response.ok) {
                    alert('Password reset successful');
                    window.location.href='/login_page.html';
                } else {
                    alert(`Error: ${result.error}`);
                }
            } catch (error) {
                console.error(error);
                alert("Something went wrong");
            }
        })
    })