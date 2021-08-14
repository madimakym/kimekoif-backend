// @ts-nocheck
const Adresse = require("../models/adresse-model");
const User = require("../models/user-model");

const AdresseCtrl = {
    create: async (req, res) => {
        const body = req.body
        try {
            const user = await User.findById(body.users)
            const adresse = new Adresse({
                users: body.users,
                professional: body.professional,
                status: body.status ? body.status : true
            });
            const savedAdresse = await adresse.save();
            user.adresses = body.professional;
            await user.save()
            return res.status(200).json({
                status: 200,
                message: "Adresse ajoutée",
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
            const user = await Adresse.find({
                $or: [{
                    users: req.body.users
                }],
            }).sort({
                createdAt: "desc"
            });
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
            const response = await Adresse.findById(id);
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
            await Adresse.findByIdAndRemove(id);
            return res.status(200).json({
                status: 200,
                message: "Adresse supprimée",
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
};
module.exports = AdresseCtrl;