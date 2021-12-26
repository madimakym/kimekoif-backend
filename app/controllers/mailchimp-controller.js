const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER,
});


const MailchimpCtrl = {
    check: async (req, res) => {
        try {
            const response = await mailchimp.ping.get();
            res.send({ response });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }
    },

    subscribeContact: async (req, res) => {
        try {
            const body = req.body
            const subscribingUser = {
                firstName: body.firstname,
                lastName: body.lastname,
                email: body.email,
                profile: body.profile
            };

            const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
                email_address: subscribingUser.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: subscribingUser.firstName,
                    LNAME: subscribingUser.lastName,
                    PROFILE: subscribingUser.profile
                }
            });
            res.send({ response });
        } catch (error) {
            return res.status(error.status).send({
                status: error.status,
                error: error.message
            });
        }
    }
};
module.exports = MailchimpCtrl;