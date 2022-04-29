import Appointment from "../models/appointment-model";
var _ = require('lodash');

export const create = async (req, res) => {
    const body = req.body
    try {
        const service = new Appointment({
            service: body.serviceId,
            professional: body.professionalId,
            customer: body.customerId,
            date: body.date,
            status: true
        });
        await service.save()
        return res.status(200).json({
            success: true,
            message: "RDV ajouté",
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
        await Appointment.find({
            $or: [{
                customer: body.customerId
            }],
        }).sort({ createdAt: "desc" }).populate([
            {
                path: "professional",
                populate: {
                    path: "professional",
                    model: "User",
                },
            },
            {
                path: "customer",
                populate: {
                    path: "customer",
                    model: "User",
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
};

export const remove = async (req, res) => {
    const { id } = req.body
    try {
        await Appointment.findByIdAndRemove(id);
        return res.status(200).json({
            status: 200,
            message: "Rendez-vous supprimé",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};