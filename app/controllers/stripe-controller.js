const Stripe = require("stripe");
const stripeKey = require("../../utils/keys").stripeKey;
const queryString = require('query-string');
const stripe = Stripe(stripeKey);
const User = require("../models/user-model");

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
        try {
            const body = req.body
            const user = await User.findById(body.hairdresserId);
            if (!user?.stripe_account_id) {
                const account = await stripe.accounts.create({ type: "express" });
                user.stripe_account_id = account.id;
                user.save()
            }
            // create Login link based on account id(for frontend to complete onboarding)
            let accountLink = await stripe.accountLinks.create({
                account: user.stripe_account_id,
                refresh_url: process.env.STRIPE_SETTING_REDIRECT_URL,
                return_url: process.env.STRIPE_REDIRECT_URL,
                type: "account_onboarding"
            })

            // prefill any info such as email
            accountLink = Object.assign(accountLink, {
                "stripe_user[email]": user.email || undefined
            });
            let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
            res.send({ url: link });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }
    },

    getAccountStatus: async (req, res) => {
        try {
            const body = req.body
            const user = await User.findById(body.hairdresserId);
            const account = await stripe.accounts.retrieve(user.stripe_account_id);
            const userUpdate = await User.findByIdAndUpdate(user._id, { stripe_seller: account }, {
                new: true
            });
            res.send(userUpdate);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }
    },

    getAccountBalance: async (req, res) => {
        try {
            const body = req.body
            const user = await User.findById(body.hairdresserId);
            const balance = await stripe.balance.retrieve({
                stripeAccount: user.stripe_account_id
            });
            res.send(balance);
        } catch (error) { }
    },

    payoutSetting: async (req, res) => {
        try {
            const body = req.body
            const user = await User.findById(body.hairdresserId);
            const loginLink = await stripe.accounts.createLoginLink(
                user.stripe_account_id,
                {
                    redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL
                }
            );
            res.json(loginLink);
        } catch (error) {
            console.log("error:", error)
        }
    },

    sessionId: async (req, res) => {
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        name: "Tresse",
                        amount: 1000,
                        currency: "usd",
                        quantity: 1
                    },
                ],
                mode: 'payment',
                success_url: 'https://example.com/success',
                cancel_url: 'https://example.com/failure',
                payment_intent_data: {
                    application_fee_amount: 123,
                    transfer_data: {
                        destination: 'acct_1JylQf2fmxOVDRDT',
                    },
                },
            });
            console.log("SESSIONS ===>", session)
        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message,
            });
        }
    },
};
module.exports = StripeCtrl;