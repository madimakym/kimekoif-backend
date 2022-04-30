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
        const appointment = await Appointment.find({
            $or: [{
                customer: body.customerId
            },
            {
                professional: body.professionalId
            }],
        }).populate([{
            path: "service",
            select: ['libelle', 'price'],
            populate: {
                path: "service",
                model: "Service",
            }
        },
        {
            path: "customer",
            select: ['firstname', 'lastname'],
            populate: {
                path: "customer",
                model: "User",
            },
        },
        {
            path: "professional",
            select: ['firstname', 'lastname'],
            populate: {
                path: "professional",
                model: "User",
            },
        },
        ]);
        return res.status(200).json(appointment);
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