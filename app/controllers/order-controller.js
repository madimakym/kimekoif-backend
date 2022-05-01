import Order from "../models/order-model";
var _ = require('lodash');

const orderNumberGenerate = () => {
    let now = Date.now().toString()
    now += now + Math.floor(Math.random() * 10)
    return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-')
}

export const create = async (req, res) => {
    const body = req.body
    try {
        const order = new Order({
            orderNumber: orderNumberGenerate(),
            products: body.products,
            price: body.price,
            user: body.user,
            status: true
        });
        console.log("order ====>", order);
        // await order.save()
        return res.status(200).json({
            success: true,
            message: "Commande ajoutée",
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const findByUser = async (req, res) => {
    const body = req.body
    try {
        const user = await Order.find({
            $or: [{
                user: body.user
            }],
        }).sort({ createdAt: "desc" }).populate([{
            path: "user",
            populate: {
                path: "user",
                model: "User",
            },
        }]);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Aucun resultat"
        });
    }
};

export const remove = async (req, res) => {
    const { id } = req.body
    try {
        await Order.findByIdAndRemove(id);
        return res.status(200).json({
            status: 200,
            message: "Order supprimé",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};