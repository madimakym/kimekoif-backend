const User = require("../models/userModel");

const userCtrl = {
    findAll: async (_req, res) => {
        try {
            const response = await User.find().sort({ createdAt: "desc" });
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
            return res.status(500).json({ message: err.message });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        const { firstname, lastname, phone, ville, departement, adresse, profil, mobilite, siret } = req.body;
        try {
            const data = {
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                ville: ville,
                departement: departement,
                adresse: adresse,
                profil: profil,
                mobilite: mobilite,
                siret: siret
            };

            await User.findByIdAndUpdate(id, data, {
                useFindAndModify: false,
            });
            return res.status(200).json({
                status: 200,
                message: "User updated",
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    findby: async (req, res) => {
        const key = req.params.category;
        try {
            const user = await User.find({
                $or: [{ libelle: { $regex: new RegExp(key, "i") } }],
            }).sort({ createdAt: "desc" });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            });
        }
    },
};
module.exports = userCtrl;
