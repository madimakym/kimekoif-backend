const Disponibilite = require("../models/disponibilite-model");
const User = require("../models/user-model");

const DisponibiliteCtrl = {
    create: async (req, res) => {
        const body = req.body
        try {
            const user = await User.findById(body.userId)
            const disponibilite = new Disponibilite({
                description: body.description,
                users: body.userId,
                start: body.start,
                end: body.end,
                status: body.status ? body.status : true
            });
            const savedDisponibilite = await disponibilite.save();
            user.disponibilites = user.disponibilites.concat(savedDisponibilite);
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
        const body = req.body
        try {
            const user = await Disponibilite.find({
                $or: [{ users: body.userId }],
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
            const response = await Disponibilite.findById(id);
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
            var index = user.disponibilites.indexOf(body.disponibiliteId);
            if (index > -1) { user.disponibilites.splice(index, 1) }
            await user.save()
            await Disponibilite.findByIdAndRemove(body.disponibiliteId);
            return res.status(200).json({
                status: 200,
                message: "Date supprimée",
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            });
        }
    }
};
module.exports = DisponibiliteCtrl;