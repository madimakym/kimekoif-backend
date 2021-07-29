// @ts-nocheck
const Rdv = require("../models/rdv-model");
const User = require("../models/user-model");

const RdvCtrl = {
    create: async (req, res) => {
        const body = req.body
        try {
            const user = await User.findById(body.users)
            const rdv = new Rdv({
                libelle: body.libelle,
                customerId: body.customerId,
                customerName: body.customerName,
                users: body.users,
                start: body.start,
                status: body.status ? body.status : true
            });
            const savedRdv = await rdv.save();
            user.rdv = user.rdv.concat(savedRdv);
            await user.save()
            return res.status(200).json({
                status: 200,
                message: "Rendez-vous ajouté",
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
            const user = await Rdv.find({
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
            const user = await Rdv.find({
                $or: [{
                    customerId: req.body.customerId
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
    },

    findOne: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await Rdv.findById(id);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            });
        }
    },

    delete: async (req, res) => {
        const id = req.params.id;
        try {
            await Rdv.findByIdAndRemove(id);
            return res.status(200).json({
                status: 200,
                message: "Date supprimée",
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
};
module.exports = RdvCtrl;