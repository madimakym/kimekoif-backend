const Stripe = require("stripe");
const _ = require("lodash");
const stripeKey = require("../../utils/keys").stripeKey;
const stripe = Stripe(stripeKey);
const session = require("express-session");
const moment = require('moment');
const StripeService = require("./stripe-service");


const generateAccountLink = (accountID, origin) => {
    return stripe.accountLinks
        .create({
            type: "account_onboarding",
            account: accountID,
            refresh_url: `https://www.kimekoif.com/refresh_url`,
            return_url: `https://www.kimekoif.com/url_de_retour_apres_inscription`,
        })
        .then((link) => link.url);
    // return stripe.accountLinks
    //     .create({
    //         type: "account_onboarding",
    //         account: accountID,
    //         refresh_url: `${origin}/onboard-user/refresh`,
    //         return_url: `${origin}/success.html`,
    //     })
    //     .then((link) => link.url);
}


const StripeCtrl = {
    paymentintent: async (req, res) => {
        try {
            const paymentIntents = await stripe.paymentIntents.list();
            var items = [];
            paymentIntents.data.forEach((child) => {
                items.push({
                    id: child.id,
                    libelle: child.description,
                    amount: child.amount,
                    date: moment(new Date(child.created * 1000)).format('MMMM')
                });
            });

            var data = _(items)
                .groupBy('date')
                .map(function (items, date) {
                    return {
                        month: date,
                        amount: _.map(items, 'amount').reduce(function (a, b) {
                            return a + b;
                        }, 0)
                    };
                }).value();

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Aucun resultat"
            });
        }
    },

    onboardUser: async (req, res) => {
        try {
            const account = await stripe.accounts.create({ type: "standard" });
            // req.session.accountID = account.id;
            // const origin = `"https://"}${req.headers.host}`;
            const origin = req.headers.host;
            // console.log("req.headers:", req.headers.host);

            // const origin = `${req.headers.origin}`;
            const accountLinkURL = await generateAccountLink(account.id, origin);
            // console.log("account:", account.id);
            console.log("accountLinkURL:", accountLinkURL);
            res.send({ url: accountLinkURL });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message,
            });
        }
    },


    onboardUserRefresh: async (req, res) => {
        try {
            const { accountID } = req.session;
            const origin = `${req.secure ? "https://" : "https://"}${req.headers.host}`;

            const accountLinkURL = await generateAccountLink(accountID, origin);
            res.redirect(accountLinkURL);
        } catch (err) {
            res.status(500).send({
                error: err.message,
            });
        }
    },


    // app.get("/", (req, res) => {
    //     const path = resolve(process.env.STATIC_DIR + "/index.html");
    //     res.sendFile(path);
    // });


};
module.exports = StripeCtrl;