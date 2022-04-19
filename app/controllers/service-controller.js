import Service from "../models/service-model";
var _ = require('lodash');

export const create = async (req, res) => {
    const body = req.body
    try {
        const service = new Service({
            libelle: body.libelle,
            price: body.price,
            description: body.description,
            user: body.user,
            status: body.status ? body.status : true
        });
        // const savedService = await service.save();
        // user.services = user.services.concat(savedService);
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
};