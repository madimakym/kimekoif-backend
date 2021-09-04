const User = require("../models/user-model");
var _ = require('lodash');

const userCtrl = {
    findAll: async (_req, res) => {
        try {
            const response = await User.find().sort({
                createdAt: "desc"
            });
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            });
        }
    },

    findOne: async (req, res) => {
        try {
            const response = await User.findOne({ uid: req.params.id }).populate([{
                path: "services",
                populate: {
                    path: "services",
                    model: "Service",
                },
            },
            {
                path: "disponibilites",
                populate: {
                    path: "disponibilites",
                    model: "Disponibilite",
                },
            },
            {
                path: "albums",
                populate: {
                    path: "albums",
                    model: "Album",
                },
            },
            {
                path: "commandes",
                populate: {
                    path: "commandes",
                    model: "Commandes",
                }
            },
            {
                path: "adresses",
                populate: {
                    path: "adresses",
                    model: "Adresse",
                },
            }
            ]);
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
            await User.findByIdAndRemove(id);
            return res.status(200).json({
                status: 200,
                message: "User deleted",
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        const {
            firstname,
            lastname,
            phone,
            ville,
            departement,
            adresse,
            mobilite,
            siret,
            avatar,
            description
        } = req.body;
        try {
            const data = {
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                ville: ville,
                departement: departement,
                adresse: adresse,
                mobilite: mobilite,
                siret: siret,
                description: description,
                avatar: avatar
            };

            await User.findByIdAndUpdate(id, data, {
                useFindAndModify: false,
            });
            return res.status(200).json({
                status: 200,
                message: "User updated",
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    },

};
module.exports = userCtrl;