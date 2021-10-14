const Commentaire = require("../models/commentaire-model");

const CommentaireCtrl = {
    create: async (req, res) => {
        const body = req.body
        try {
            const commentaire = new Commentaire({
                message: body.message,
                customer: body.customerId,
                users: body.userId
            });
            await commentaire.save();
            return res.status(200).json({
                status: 200,
                message: "Commentaire ajoutée",
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
            const user = await Commentaire.find({
                $or: [{
                    users: req.body.users
                }],
            }).populate([{
                path: "users",
                populate: {
                    path: "users",
                    model: "Users",
                },
            },]);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Aucun resultat"
            });
        }
    },

    findAll: async (req, res) => {
        try {
            const user = await Commentaire.find({
                $or: [{ users: req.body.professionelID }],
            }).populate([
                {
                    path: "users",
                    select: ['firstname', 'lastname'],
                    populate: {
                        path: "users",
                        model: "Users",
                    },
                },
                {
                    path: "customer",
                    select: ['firstname', 'lastname'],
                    populate: {
                        path: "customer",
                        model: "Users",
                    },
                }]);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Aucun resultat"
            });
        }
    }
};
module.exports = CommentaireCtrl;