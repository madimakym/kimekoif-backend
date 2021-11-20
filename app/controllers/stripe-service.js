const Stripe = require("stripe");
const stripeKey = require("../../utils/keys").stripeKey;
const stripe = Stripe(stripeKey);


exports.authorizeAccount = async function (req, res) {
    const query = req.query

    try {
        const response = await stripe.oauth.token({
            grant_type: 'authorization_code',
            code: query.code
        })

        console.log("response.stripe_user_id:", response.stripe_user_id)
        // res.redirect("customURLTORedirect")
    } catch (error) {
        console.log("error:", error)
        // res.redirect("customURLTORedirect")
    }
}