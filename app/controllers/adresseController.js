// @ts-nocheck
const Adresse = require("../models/adresse-model");
const User = require("../models/user-model");

const AdresseCtrl = {
    create: async (req, res) => {
        const body = req.body
        try {
            const user = await User.findById(body.userId)
            // const adresse = new Adresse({
            //     users: body.userId,
            //     professional: body.professionelId,
            //     status: body.status ? body.status : true
            // });
            // await adresse.save();
            user.adresses = user.adresses.concat(body.professionelId);
            await user.save()
            return res.status(200).json({
                status: 200,
                message: user,
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
        const body = req.body
        try {
            const user = await User.findById(body.userId)
            var index = user.adresses.indexOf(body.professionelId);
            if (index > -1) {
                user.adresses.splice(index, 1);
            }
            await user.save()
            return res.status(200).json({
                status: 200,
                message: user,
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            });
        }
    }
};
module.exports = AdresseCtrl;