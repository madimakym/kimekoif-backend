const Commande = require("../models/commande-model");
const User = require("../models/user-model");

const CommandeCtrl = {
    create: async (req, res) => {
        const body = req.body
        try {
            const user = await User.findById(body.customer)
            const commande = new Commande({
                price: body.price,
                products: body.products,
                paiement_method: body.paiement_method,
                payment_status: body.payment_status,
                customer: body.customer,
                hairdresser: body.hairdresser,
                status: body.status
            });
            const savedCommande = await commande.save();
            user.commandes = user.commandes.concat(savedCommande);
            await user.save()
            return res.status(200).json({
                status: 200,
                message: "Commande ajoutée"
            })
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    },

    findAll: async (_req, res) => {
        try {
            const response = await Commande.find().sort({
                createdAt: "desc"
            }).populate([{
                    path: "customer",
                    select: ['firstname', 'lastname'],
                    populate: {
                        path: "customer",
                        model: "Users",
                    },
                },
                {
                    path: "hairdresser",
                    select: ['firstname', 'lastname'],
                    populate: {
                        path: "hairdresser",
                        model: "Users",
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

    findByUser: async (req, res) => {
        try {
            const user = await Commande.find({
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
            const response = await Commande.findById(id).populate([{
                path: "customer",
                select: ['firstname', 'lastname', 'email', 'phone'],
                populate: {
                    path: "customer",
                    model: "Users",
                },
            },
            {
                path: "hairdresser",
                select: ['firstname', 'lastname', 'email', 'phone'],
                populate: {
                    path: "hairdresser",
                    model: "Users",
                },
            }
        ]);;
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
            await Commande.findByIdAndRemove(id);
            return res.status(200).json({
                status: 200,
                message: "Date supprimée",
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            await Commande.findByIdAndUpdate(id, req.body, {
                useFindAndModify: false
            })
            return res.status(200).json({
                status: 200,
                message: "Commande modifiée"
            })
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    },
};
module.exports = CommandeCtrl;