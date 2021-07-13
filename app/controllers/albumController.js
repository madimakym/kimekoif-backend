// @ts-nocheck
const Album = require("../models/album");

const AlbumCtrl = {
    create: async (req, res) => {
        try {
            const album = new Album({
                libelle: req.body.libelle,
                visual: req.body.visual,
                users: req.body.users,
                status: req.body.status ? req.body.status : true
            });
            await album.save();
            return res.status(200).json({
                status: 200,
                message: "Album created!",
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    },

    findAll: async (_req, res) => {
        try {
            const response = await Album.find().populate({
                path: "users",
                populate: {
                    path: "users",
                    model: "Users",
                },
            });
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            });
        }
    },

    findOne: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await Album.findById(id);
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
            await Album.findByIdAndRemove(id);
            return res.status(200).json({
                status: 200,
                message: "Album supprimé",
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        if (!req.body.libelle) {
            return res.status(400).json({ message: "Libelle requis" });
        }
        const id = req.params.id;
        try {
            const data = {
                libelle: req.body.libelle,
                description: req.body.description,
                categories: req.body.categories,
                status: req.body.status,
                visual: req.body.visual,
            };

            await Album.findByIdAndUpdate(id, data, {
                useFindAndModify: false,
            });
            return res.status(200).json({
                status: 200,
                message: "Album updated",
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};
module.exports = AlbumCtrl;
