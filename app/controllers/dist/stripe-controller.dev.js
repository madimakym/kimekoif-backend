"use strict";

var Stripe = require("stripe");

var stripeKey = require("../../utils/keys").stripeKey;

var queryString = require('query-string');

var stripe = Stripe(stripeKey);

var User = require("../models/user-model"); // const generateAccountLink = (accountID, origin) => {
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


var StripeCtrl = {
  paymentintent: function paymentintent(req, res) {
    var paymentIntents, items, data;
    return regeneratorRuntime.async(function paymentintent$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(stripe.paymentIntents.list());

          case 3:
            paymentIntents = _context.sent;
            items = [];
            paymentIntents.data.forEach(function (child) {
              items.push({
                id: child.id,
                libelle: child.description,
                amount: child.amount,
                date: moment(new Date(child.created * 1000)).format('MMMM')
              });
            });
            data = _(items).groupBy('date').map(function (items, date) {
              return {
                month: date,
                amount: _.map(items, 'amount').reduce(function (a, b) {
                  return a + b;
                }, 0)
              };
            }).value();
            return _context.abrupt("return", res.status(200).json(data));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              status: 500,
              message: "Aucun resultat"
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 10]]);
  },
  onboardUser: function onboardUser(req, res) {
    var body, user;
    return regeneratorRuntime.async(function onboardUser$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = req.body;
            _context2.next = 3;
            return regeneratorRuntime.awrap(User.findById(body.hairdresserId));

          case 3:
            user = _context2.sent;
            console.log("user:", user); // if (!user?.stripe_account_id) {
            //     const account = await stripe.accounts.create({ type: "express" });
            //     console.log("account.id:", account.id)
            //     user.stripe_account_id = account.id;
            //     user.save()
            // }
            // create Login link based on account id (for frontend to complete onboarding)
            // let accountLink = await stripe.accountLinks.create({
            //     account: user.stripe_account_id,
            //     refresh_url: process.env.STRIPE_REDIRECT_URL,
            //     return_url: process.env.STRIPE_REDIRECT_URL,
            //     type: "account_onboarding"
            // })
            // // prefill any info such as email
            // accountLink = Object.assign(accountLink, {
            //     "stripe_user[email]": user.email || undefined
            // });
            // let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
            // res.send({ url: link });
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

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  getAccountStatus: function getAccountStatus(req, res) {
    var body, user, account, userUpdate;
    return regeneratorRuntime.async(function getAccountStatus$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = req.body;
            _context3.next = 3;
            return regeneratorRuntime.awrap(User.findById(body.hairdresserId));

          case 3:
            user = _context3.sent;
            _context3.next = 6;
            return regeneratorRuntime.awrap(stripe.accounts.retrieve(user.stripe_account_id));

          case 6:
            account = _context3.sent;
            _context3.next = 9;
            return regeneratorRuntime.awrap(User.findByIdAndUpdate(user._id, {
              stripe_seller: account
            }, {
              "new": true
            }));

          case 9:
            userUpdate = _context3.sent;
            res.send(userUpdate);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  getAccountBalance: function getAccountBalance(req, res) {
    var body, user, balance;
    return regeneratorRuntime.async(function getAccountBalance$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            body = req.body;
            _context4.next = 3;
            return regeneratorRuntime.awrap(User.findById(body.hairdresserId));

          case 3:
            user = _context4.sent;
            _context4.prev = 4;
            _context4.next = 7;
            return regeneratorRuntime.awrap(stripe.balance.retrieve({
              stripeAccount: user.stripe_account_id
            }));

          case 7:
            balance = _context4.sent;
            res.send(balance);
            _context4.next = 13;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](4);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[4, 11]]);
  },
  payoutSetting: function payoutSetting(req, res) {
    var body, user, loginLink;
    return regeneratorRuntime.async(function payoutSetting$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            body = req.body;
            _context5.prev = 1;
            _context5.next = 4;
            return regeneratorRuntime.awrap(User.findById(body.hairdresserId));

          case 4:
            user = _context5.sent;
            _context5.next = 7;
            return regeneratorRuntime.awrap(stripe.accounts.createLoginLink(user.stripe_account_id, {
              redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL
            }));

          case 7:
            loginLink = _context5.sent;
            console.log("loginLink:", loginLink);
            res.json(loginLink);
            _context5.next = 15;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            console.log("error:", _context5.t0);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[1, 12]]);
  } // onboardUserRefresh: async (req, res) => {
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