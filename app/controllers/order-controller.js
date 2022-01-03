const Order = require("../models/order-model");
const User = require("../models/user-model");

const OrderCtrl = {
    findAll: async (_req, res) => {
        try {
            const response = await Order.find().sort({
                createdAt: "desc"
            }).populate([
                {
                    path: "service",
                    select: ['libelle', 'price'],
                    populate: {
                        path: "service",
                        model: "Service",
                    },
                },
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
        const body = req.body
        try {
            const user = await Order.find({
                $or: [
                    { customer: body.id },
                    { hairdresser: body.id }
                ],
            }).sort({ createdAt: "desc" }).populate([
                {
                    path: "service",
                    select: ['libelle', 'price'],
                    populate: {
                        path: "service",
                        model: "Service",
                    },
                },
                {
                    path: "customer",
                    select: ['id'],
                    populate: {
                        path: "customer",
                        model: "Users",
                    },
                },
                {
                    path: "hairdresser",
                    select: ['id'],
                    populate: {
                        path: "hairdresser",
                        model: "Users",
                    },
                }
            ]);
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
            const response = await Order.findById(id).populate([{
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
            await Order.findByIdAndRemove(id);
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
            await Order.findByIdAndUpdate(id, req.body, {
                useFindAndModify: false
            })
            return res.status(200).json({
                status: 200,
                message: "Order modifiée"
            })
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    },
};
module.exports = OrderCtrl;