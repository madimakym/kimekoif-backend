"use strict";

var Stripe = require("stripe");

var stripeKey = require("../../utils/keys").stripeKey;

var queryString = require('query-string');

var stripe = Stripe(stripeKey);

var User = require("../models/user-model"); // const updateDelayDays = (accountID) => {
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
    var body, user, account, accountLink, link;
    return regeneratorRuntime.async(function onboardUser$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            body = req.body;
            _context2.next = 4;
            return regeneratorRuntime.awrap(User.findById(body.hairdresserId));

          case 4:
            user = _context2.sent;
            _context2.next = 7;
            return regeneratorRuntime.awrap(stripe.accounts.create({
              type: "express"
            }));

          case 7:
            account = _context2.sent;
            user.stripe_account_id = account.id;
            user.save(); // }
            // create Login link based on account id(for frontend to complete onboarding)

            _context2.next = 12;
            return regeneratorRuntime.awrap(stripe.accountLinks.create({
              account: user.stripe_account_id,
              refresh_url: process.env.STRIPE_REDIRECT_URL,
              return_url: process.env.STRIPE_REDIRECT_URL,
              type: "account_onboarding"
            }));

          case 12:
            accountLink = _context2.sent;
            console.log("accountLink:", accountLink); // prefill any info such as email

            accountLink = Object.assign(accountLink, {
              "stripe_user[email]": user.email || undefined
            });
            link = "".concat(accountLink.url, "?").concat(queryString.stringify(accountLink));
            res.send({
              url: link
            });
            _context2.next = 22;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              status: 500,
              error: _context2.t0.message
            }));

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 19]]);
  },
  getAccountStatus: function getAccountStatus(req, res) {
    var body, user, account, userUpdate;
    return regeneratorRuntime.async(function getAccountStatus$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            body = req.body;
            _context3.next = 4;
            return regeneratorRuntime.awrap(User.findById(body.hairdresserId));

          case 4:
            user = _context3.sent;
            _context3.next = 7;
            return regeneratorRuntime.awrap(stripe.accounts.retrieve(user.stripe_account_id));

          case 7:
            account = _context3.sent;
            _context3.next = 10;
            return regeneratorRuntime.awrap(User.findByIdAndUpdate(user._id, {
              stripe_seller: account
            }, {
              "new": true
            }));

          case 10:
            userUpdate = _context3.sent;
            res.send(userUpdate);
            _context3.next = 17;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).json({
              status: 500,
              error: _context3.t0.message
            }));

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 14]]);
  },
  getAccountBalance: function getAccountBalance(req, res) {
    var body, user, balance;
    return regeneratorRuntime.async(function getAccountBalance$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            body = req.body;
            _context4.next = 4;
            return regeneratorRuntime.awrap(User.findById(body.hairdresserId));

          case 4:
            user = _context4.sent;
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
            _context4.t0 = _context4["catch"](0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 11]]);
  },
  payoutSetting: function payoutSetting(req, res) {
    var body, user, loginLink;
    return regeneratorRuntime.async(function payoutSetting$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            body = req.body;
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
            res.json(loginLink);
            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);
            console.log("error:", _context5.t0);

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 11]]);
  },
  sessionId: function sessionId(req, res) {
    var session;
    return regeneratorRuntime.async(function sessionId$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return regeneratorRuntime.awrap(stripe.checkout.sessions.create({
              line_items: [{
                name: "Tresse",
                amount: 1000,
                currency: "usd",
                quantity: 1
              }],
              mode: 'payment',
              success_url: 'https://example.com/success',
              cancel_url: 'https://example.com/failure',
              payment_intent_data: {
                application_fee_amount: 123,
                transfer_data: {
                  destination: 'acct_1JylQf2fmxOVDRDT'
                }
              }
            }));

          case 3:
            session = _context6.sent;
            console.log("SESSIONS ===>", session);
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(500).json({
              status: 500,
              error: _context6.t0.message
            }));

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 7]]);
  }
};
module.exports = StripeCtrl;