require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const CheckoutCtrl = {
    payment: async (req, res) => {
        let { description, amount, id } = req.body;
        try {
            const payment = await stripe.paymentIntents.create({
                amount: amount,
                currency: "eur",
                description: description,
                payment_method: id,
                confirm: true,
            });
            console.log("stripe-routes.js 19 | payment", payment);
            res.json({
                message: "Payment Successful",
                success: true,
            });
        } catch (error) {
            console.log("stripe-routes.js 17 | error", error);
            res.json({
                message: "Payment Failed",
                success: false,
            });
        }
    }
};
module.exports = CheckoutCtrl;