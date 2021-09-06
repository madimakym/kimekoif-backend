const Disponibilite = require("../models/disponibilite-model");
const User = require("../models/user-model");

const WishCtrl = {
    create: async (req, res) => {
        const body = req.body;
        try {
            const user = await User.findById(body.userId)
            user.wishs = user.wishs.concat(body.productId);
            await user.save()
            return res.status(200).json({
                status: 200,
                message: "Produit ajouté",
            })
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
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
        const id = req.params.id;
        try {
            await Disponibilite.findByIdAndRemove(id);
            return res.status(200).json({
                status: 200,
                message: "Date supprimée",
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
};
module.exports = WishCtrl;