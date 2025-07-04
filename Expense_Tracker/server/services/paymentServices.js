const {Cashfree,CFEnvironment}=require("cashfree-pg");
require('dotenv').config()

const cashfree=new Cashfree(CFEnvironment.SANDBOX,process.env.CASHFREE_APP_ID,process.env.CASHFREE_SECRET_KEY);

const createOrder=async (orderid,orderamount,ordercurrency,customerid,customerphone)=>{
    try {
        const expiretime=new Date(Date.now() + 60*60*1000);
        const formattedexpiredate=expiretime.toISOString();
        const request={
            "order_amount":orderamount,
            "order_currency":ordercurrency,
            "order_id":orderid,
            "customer_details":{
                "customer_id":customerid,
                "customer_phone":customerphone
            },
            "order_meta":{
                //"return_Url":return_Url
                "return_Url":`http://localhost:3000/payment/status?order_id=${orderid}`
            },
            "order_expiry_time":formattedexpiredate
        };
        const response=await cashfree.PGCreateOrder(request);
        return response.data.payment_session_id;
    } catch (error) {
        console.error("Error in payment service:", error.response?.data || error.message);
        throw error;
    }
}

// const getPaymentStatus = async (orderId) => {
//   try {
//     await cashfree.PGOrderFetchPayments(orderId).then((response)=>{
//       const payments = response.data;

//     let orderStatus;

//     if (payments.some(txn => txn.payment_status === "SUCCESS")) {
//       orderStatus = "Success";
//     } else if (payments.some(txn => txn.payment_status === "PENDING")) {
//       orderStatus = "Pending";
//     } else {
//       orderStatus = "Failure";
//     }
//     console.log(orderStatus)
//     return orderStatus;

//     }).catch((err)=>{
//       throw new Error('Somthing went worng in the status part',err);
//     })  
//   } catch (error) {
//     console.error("Error fetching order status:", error.response?.data || error.message);
//     return "Error";
//   }
// }



const getPaymentStatus = async (orderId) => {
  try {
    const response = await cashfree.PGOrderFetchPayments(orderId);
    const payments = response.data;

    if (!payments || payments.length === 0) {
      console.log('No payment transactions found');
      return 'Pending';
    }

    if (payments.some(txn => txn.payment_status === "SUCCESS")) {
      return "Success";
    } 
    if (payments.some(txn => txn.payment_status === "PENDING")) {
      return "Pending";
    }
    
    return "Failure";
    
  } catch (error) {
    console.error("Error fetching order status:", error.response?.data || error.message);
    return "Error";
  }
}


module.exports={
    createOrder,getPaymentStatus
};

// request = {
//     "order_amount": 1.00,
//     "order_currency": "INR",
//     "order_id": "devstudio_7344592934422992738",
//     "customer_details": {
//         "customer_id": "devstudio_user",
//         "customer_phone": "8474090589"
//     },
//     "order_meta": {
//         "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id={order_id}"
//     },
//     "order_expiry_time": "2025-06-29T05:23:44.219Z"
// };