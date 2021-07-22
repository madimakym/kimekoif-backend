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
            const id = req.params.id;
            const response = await User.findById(id);
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

    findby: async (req, res) => {
        const ville = req.body.ville;
        const service = req.body.service;
        const date = req.body.data;
        try {
            const data = await User.find()
                .populate([{
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
                ])
            // if (service) {
            //     const response = _.filter(data, user => ((user.ville === ville) && (user.services?.libelle === service)));
            //     console.log("service", service)
            //     return res.status(200).json(response);
            // }
            // if (date) {
            //     const response = _.filter(data, user => ((user.ville === ville) && (user.services?.libelle === service)));
            //     console.log("service", service)
            //     return res.status(200).json(response);
            // }
            // else {
            //     const response = _.filter(data, user => user.ville === ville);
            //     console.log("ville", ville)
            //     return res.status(200).json(response);
            // }
            return res.status(200).json(data);

        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            });
        }
    },
};
module.exports = userCtrl;