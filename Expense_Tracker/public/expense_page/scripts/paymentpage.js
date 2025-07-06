import { BASE_URL } from '../../config.js'

//import { authFetch } from '/authFetch.js'; // adjust path if needed

const cashfree = Cashfree({ mode: "sandbox" });

document.getElementById('buyCard').addEventListener('click', () => {
    const modal = new bootstrap.Modal(document.getElementById('phoneModal'));
    modal.show();
});

document.getElementById('proceedPaymentBtn').addEventListener('click', async () => {
    const phone = document.getElementById('phoneInput').value.trim();
    const amount = 29;

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/payment/cashless`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, phone })
        });
        const data = await response.json();
        if (!response.ok) {
            alert(data.message || 'Something went wrong');
            return;
        }
        const paymentSessionId = data.payment_session_id;

        const checkoutOptions = {
            paymentSessionId,
            redirectTarget: '_self'
        };

        await cashfree.checkout(checkoutOptions);

    } catch (error) {
        console.error("Payment error:", error);
        alert("Payment initiation failed.");
    }
});