const Payment = require('../modules/paymentTable');
const UserTable = require('../modules/userTable');
const { createOrder, getPaymentStatus } = require('../services/paymentServices');
const sequelize = require('../database/database');

const renderpaymentForm = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const order_id = req.query.order_id;
        let paymentStatus = await getPaymentStatus(order_id);
        await Payment.update(
            { payment_status: paymentStatus },
            { where: { order_id: order_id }, transaction }
        );

        const user = await Payment.findOne({ where: { order_id: order_id } })
        if (paymentStatus === 'Success') {
            await UserTable.update(
                { premium: true },
                {
                    where: {
                        id: user.customer_id
                    }, transaction
                }
            );
        }
        await transaction.commit();
        // switch(paymentStatus){
        //     case 'Success':
        //         return res.render('paymentSuccess', { 
        //             orderId: order_id,
        //             paymentDetails: paymentStatus 
        //         });
        //     case 'Failure':
        //         return res.render('paymentFailure', { 
        //             orderId: order_id,
        //             paymentDetails:paymentStatus
        //         });
        //      default:
        //         return res.status(400).render('paymentPending', {
        //             orderId: order_id,
        //             paymentDetails: paymentStatus
        //         });
        // }
        return res.send(`
            <html>
                <head><title>Payment Status</title></head>
                <body>
                    <script>
                        alert('Payment Status: ${paymentStatus}');
                        
                        window.location.href = '../login_page.html';
                    </script>
                </body>
            </html>
        `);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
}

const paymentprocess = async (req, res) => {
    const transaction = await sequelize.transaction()
    try {
        const order_id = `ORDER${Date.now()}`;
        const order_amount = parseInt(req.body.amount);
        const order_currency = 'INR';
        const customerid = String(req.user.id);
        const customerphone = req.body.phone;
        const payment_session_id = await createOrder(
            order_id,
            order_amount,
            order_currency,
            customerid,
            customerphone
        );

        await Payment.create({
            order_id: order_id,
            payment_session_id: payment_session_id,
            order_amount: order_amount,
            customer_id: customerid,
            payment_status: "pending"
        }, { transaction });

        await transaction.commit()
        res.status(200).json({ payment_session_id, order_id });
    } catch (error) {
        await transaction.rollback()
        res.status(500).json({ error: error.message });
    }

}

const premiumcheck = async (req, res) => {
    try {
        const ispremium = await Payment.findOne({
            where: {
                customer_id: req.user.id
            }
        });
        if (!ispremium) {
            res.status(404).json({ premium: false });
        }
        res.status(200).json({ premium: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
module.exports = {
    paymentprocess,
    renderpaymentForm,
    premiumcheck
}