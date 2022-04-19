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

    findbyProfil: async (req, res) => {
        const body = req.body
        try {
            const response = await User.find({
                $or: [{
                    profil: body.profil
                }],
            }).sort({
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

    findCustomer: async (_req, res) => {
        try {
            const response = await User.find({
                $or: [{
                    profil: "customer"
                }],
            }).sort({
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
            const response = await User.findOne({
                _id: req.params.id
            }).populate([{
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
                path: "adresses",
                select: ['firstname', 'lastname', 'avatar', 'ville'],
                populate: {
                    path: "adresses",
                    model: "Users",
                },
            },
            {
                path: "wishs",
                populate: {
                    path: "wishs",
                    model: "Product",
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
        try {
            await User.findByIdAndUpdate(id, req.body, {
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

    search: async (req, res) => {
        const body = req.body
        try {
            const response = await User.find({
                $or: [
                    { firstname: { $regex: new RegExp(body.libelle, "i") } },
                    { lastname: { $regex: new RegExp(body.libelle, "i") } }
                ],
                $and: [{
                    profil: {
                        $regex: new RegExp(body.profil, "i")
                    }
                }],
            });
            return res.status(200).json(response);

        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    },

    searchByUid: async (req, res) => {
        const body = req.body
        try {
            const user = await User.findOne({ uid: { $regex: new RegExp(body.uid, "i") }, });
            return res.status(200).json({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                profil: user.profil,
                avatar: user.avatar,
                adresses: user.adresses,
                status: user.status
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    }


};
module.exports = userCtrl;