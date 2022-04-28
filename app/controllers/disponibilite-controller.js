import Disponibilite from "../models/disponibilite-model";
import fs from "fs";

export const create = async (req, res) => {
    const body = req.body
    try {
        const service = new Disponibilite({
            start: body.start,
            end: body.end,
            user: body.user,
            status: true
        });
        await service.save()
        return res.status(200).json({
            success: true,
            message: "Disponibilité ajoutée",
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const findByUser = async (req, res) => {
    try {
        const body = req.body
        const disponibilite = await Disponibilite.find({
            $or: [{ user: body.user }],
        }).sort({ createdAt: "desc" });
        return res.json(disponibilite);
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Aucun resultat"
        });
    }
};

export const remove = async (req, res) => {
    const { id } = req.body
    
    console.log("id", id)
    try {
        await Disponibilite.findByIdAndRemove(id);
        return res.status(200).json({
            status: 200,
            message: "Disponibilité supprimée",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};