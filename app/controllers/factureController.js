// @ts-nocheck
const Facture = require("../models/facture-model");
const User = require("../models/user-model");

const FactureCtrl = {
    create: async (req, res) => {
        const body = req.body
        try {
            const user = await User.findById(body.users)
            const facture = new Facture({
                libelle: "Facture",
                service: body.service,
                total: body.total,
                customer: body.customer,
                users: body.users,
                date: body.date,
                status: body.status ? body.status : true
            });
            const savedFacture = await facture.save();
            user.facture = user.facture.concat(savedFacture);
            await user.save()
            return res.status(200).json({
                status: 200,
                message: "Date ajoutée",
            })
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    },

    findByUser: async (req, res) => {
        try {
            const user = await Facture.find({
                $or: [{
                    users: req.body.users
                }],
            }).populate([{
                path: "users",
                populate: {
                    path: "users",
                    model: "Users",
                },
            }, ]);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Aucun resultat"
            });
        }
    },

    findByCustomer: async (req, res) => {
        try {
            const user = await Facture.find({
                $or: [{
                    customer: req.body.customer
                }],
            }).populate([{
                path: "users",
                select: 'lastname',
                populate: {
                    path: "users",
                    model: "Users",
                },
            }, ]);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Aucun resultat"
            });
        }
    }
};
module.exports = FactureCtrl;