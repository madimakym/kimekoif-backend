import Service from "../models/service-model";
var _ = require('lodash');

export const create = async (req, res) => {
    const body = req.body
    try {
        const service = new Service({
            libelle: body.libelle,
            price: body.price,
            user: body.user,
            status: body.status ? body.status : true
        });
        await service.save()
        return res.status(200).json({
            success: true,
            message: "Service ajouté",
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
        const user = await Service.find({
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
        await Service.findByIdAndRemove(id);
        return res.status(200).json({
            status: 200,
            message: "Service supprimé",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};