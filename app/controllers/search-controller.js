import User from "../models/user-model";
import Service from "../models/service-model";
import Disponibilite from "../models/disponibilite-model";


export const findByCity = async (req, res) => {
    try {
        const user = await User.find({
            $and: [{
                ville: {
                    $regex: new RegExp(req.body.city, "i")
                },
                profile: {
                    $regex: new RegExp("professional", "i")
                }
            }],
        });
        return res.json(user);
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Aucun resultat"
        });
    }
};

export const findByAvailable = async (req, res) => {
    try {
        const user = await Disponibilite.find({
            $or: [{
                start: req.body.start
            }]
        });
        return res.json(user);
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Aucun resultat"
        });
    }
};

export const findByService = async (req, res) => {
    try {
        const service = await Service.find({
            $or: [{
                libelle: req.body.libelle
            }]
        }).sort({ createdAt: "desc" }).populate([{
            path: "user",
            populate: {
                path: "user",
                model: "User",
            },
        }]);
        var items = [];
        service.forEach((child) => {
            items.push({
                id: child.user['_id'],
                libelle: child.libelle,
                price: child.price,
                firstname: child.user['firstname'],
                lastname: child.user['lastname'],
                city: child.user['ville'],
                avatar: child.user['avatar'],
                mobilite: child.user['mobilite'],
            });
        });
        return res.json({
            success: true,
            result: items
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Aucun resultat"
        });
    }
};
