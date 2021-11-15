const User = require("../models/user-model");
const Wish = require("../models/wish-model");

const WishCtrl = {
    create: async (req, res) => {
        const body = req.body;

        console.log("#body", body);
        // try {
        //     const user = await User.findById(body.customer)
        //     const wish = new Wish(body);
        //     const savedWish = await wish.save();
        //     user.wishs = user.wishs.concat(savedWish);
        //     await user.save()
        //     return res.status(200).json({
        //         status: 200,
        //         message: "Favoris ajouté"
        //     })
        // } catch (err) {
        //     return res.status(500).json({
        //         status: 500,
        //         message: err.message,
        //     });
        // }
    },

    find: async (req, res) => {
        try {
            const response = await User.findById(req.params.id).populate([
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
        const body = req.body
        try {
            const user = await User.findById(body.userId)
            var index = user.wishs.indexOf(body.productId);
            if (index > -1) {
                user.wishs.splice(index, 1);
            }
            await user.save()
            return res.status(200).json({
                status: 200,
                message: "Produit supprimé",
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            });
        }
    }
};
module.exports = WishCtrl;