const Stripe = require("stripe");
const stripeKey = require("../../utils/keys").stripeKey;
const queryString = require('query-string');
const stripe = Stripe(stripeKey);
const User = require("../models/user-model");


// const generateAccountLink = (accountID, origin) => {
//     return stripe.accountLinks
//         .create({
//             type: "account_onboarding",
//             account: accountID,
//             refresh_url: `http://${origin}/api/stripe/onboard-user/refresh`,
//             return_url: `https://www.kimekoif.com/return_url`,
//         })
//         .then((link) => link.url);
// }


// const updateDelayDays = (accountID) => {
//     const account = stripe.account.update(accountID, {
//         settings: {
//             payouts: {
//                 schedule: {
//                     delay_days: 5
//                 }
//             }
//         }
//     });
//     return account;
// }



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
        const body = req.body
        const user = await User.findById(body.hairdresserId);
        if (!user?.stripe_account_id) {
            const account = await stripe.accounts.create({ type: "express" });
            console.log("account.id:", account.id)
            user.stripe_account_id = account.id;
            user.save()
        }

        // create Login link based on account id(for frontend to complete onboarding)
        let accountLink = await stripe.accountLinks.create({
            account: user.stripe_account_id,
            refresh_url: process.env.STRIPE_REDIRECT_URL,
            return_url: process.env.STRIPE_REDIRECT_URL,
            type: "account_onboarding"
        })
        // prefill any info such as email
        accountLink = Object.assign(accountLink, {
            "stripe_user[email]": user.email || undefined
        });
        let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
        res.send({ url: link });

        // try {
        //     const account = await stripe.accounts.create({ type: "standard" });
        //     const origin = req.headers.host;
        //     req.session.accountID = account.id;
        //     const accountLinkURL = await generateAccountLink(account.id, origin);
        //     res.send({ url: accountLinkURL });
        // } catch (err) {
        //     return res.status(500).json({
        //         status: 500,
        //         error: err.message,
        //     });
        // }
    },

    getAccountStatus: async (req, res) => {
        const body = req.body
        const user = await User.findById(body.hairdresserId);
        const account = await stripe.accounts.retrieve(user.stripe_account_id);
        // const updatedAccount = await updateDelayDays(account.id);
        const userUpdate = await User.findByIdAndUpdate(user._id, { stripe_seller: account }, {
            new: true
        });
        res.send(userUpdate);
    },

    getAccountBalance: async (req, res) => {
        const body = req.body
        const user = await User.findById(body.hairdresserId);
        try {
            const balance = await stripe.balance.retrieve({
                stripeAccount: user.stripe_account_id
            });
            res.send(balance);
        } catch (error) { }
    },

    payoutSetting: async (req, res) => {
        const body = req.body

        try {
            const user = await User.findById(body.hairdresserId);

            const loginLink = await stripe.accounts.createLoginLink(
                user.stripe_account_id,
                {
                    redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL
                }
            );
            console.log("loginLink:", loginLink);
            res.json(loginLink);
        } catch (error) {
            console.log("error:", error)
        }
    },

    // onboardUserRefresh: async (req, res) => {
    //     try {
    //         const origin = req.headers.host;
    //         const accountLinkURL = await generateAccountLink(req.session.accountID, origin);
    //         res.send({ url: accountLinkURL });
    //     } catch (err) {
    //         return res.status(500).json({
    //             status: 500,
    //             error: err.message,
    //         });
    //     }
    // },
};
module.exports = StripeCtrl;