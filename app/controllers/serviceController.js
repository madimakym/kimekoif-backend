// @ts-nocheck
const Service = require("../models/service-model");
const User = require("../models/user-model");

const ServiceCtrl = {
    create: async (req, res) => {
        try {
            const service = {
                libelle: req.body.libelle,
                price: req.body.price,
                description: req.body.description,
                users: req.body.users,
                status: req.body.status ? req.body.status : true
            };
            const response = await Service.create(service)
            try {
                await User.findByIdAndUpdate(req.body.users, {
                    services: response._id
                });
                return res.status(200).json({
                    status: 200,
                    message: "Service ajouté",
                })
            } catch (err) {
                return res.status(500).json({
                    status: 500,
                    message: err.message,
                });
            }
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    },

    findByUser: async (req, res) => {
        try {
            const user = await Service.find({
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
            const response = await Service.findById(id);
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
            await Service.findByIdAndRemove(id);
            return res.status(200).json({
                status: 200,
                message: "Service supprimé",
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
};
module.exports = ServiceCtrl;