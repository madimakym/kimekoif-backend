// @ts-nocheck
const Service = require("../models/service-model");
const User = require("../models/user-model");
var _ = require('lodash');

const ServiceCtrl = {
    create: async (req, res) => {
        const body = req.body
        try {
            const user = await User.findById(body.userId)
            const service = new Service({
                libelle: body.libelle,
                price: body.price,
                description: body.description,
                users: body.userId,
                visual: body.visual,
                status: body.status ? body.status : true
            });

            const savedService = await service.save();
            user.services = user.services.concat(savedService);
            await user.save()
            return res.status(200).json({
                status: 200,
                message: "Service ajouté",
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
            const user = await Service.find({
                $or: [{
                    users: body.userId
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

    search: async (req, res) => {
        const body = req.body
        try {
            const data = await Service.find().populate([{
                path: "users",
                model: "Users",
                populate: {
                    path: "disponibilites",
                    model: "Disponibilite",
                    select: 'start'
                }
            }, ])

            if ((body.service) && (body.date === "") && (body.ville === "")) {
                const resService = _.filter(data, ser => (ser.libelle === body.service));
                return res.status(200).json(resService);
            }

            if ((body.service) && (body.date) && (body.ville === "")) {
                const resService = _.filter(data, ser => (ser.libelle === body.service));
                return res.status(200).json(resService);
                // let resDisponibilite = resService.filter(ser => ser.users.disponibilites.some(r => r.start == body.date));
                // console.log("resService:", resService);
                // return res.status(200).json(resDisponibilite);
            }

            if ((body.service) && (body.ville)) {
                const resService = _.filter(data, ser => (ser.libelle === body.service));
                let resVille = resService.filter(ser => ser.users.ville == body.ville);
                return res.status(200).json(resVille);
            }

            if ((body.service === "") && (body.ville) && (body.date === "")) {
                let resVille = data.filter(item => {
                    if (item.users) {
                        return item.users.ville == body.ville
                    }
                });
                return res.status(200).json(resVille);
            }

        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({
                status: 500,
                message: "Aucun resultat"
            });
        }
    },

    findOne: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await Service.findById(id);
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
            var index = user.services.indexOf(body.serviceId);
            if (index > -1) {
                user.services.splice(index, 1)
            }
            await user.save()
            await Service.findByIdAndRemove(body.serviceId);

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
    }
};
module.exports = ServiceCtrl;