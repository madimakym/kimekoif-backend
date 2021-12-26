const Album = require("../models/album-model");
const User = require("../models/user-model");
var _ = require('lodash');

const AlbumCtrl = {
    create: async (req, res) => {
        const body = req.body
        try {
            const user = await User.findById(body.userId)
            const album = new Album({
                libelle: body.libelle,
                visual: body.visual,
                users: body.userId,
                services: body.serviceId,
                status: body.status ? body.status : true
            });
            const savedAlbum = await album.save();
            user.albums = user.albums.concat(savedAlbum);
            await user.save()
            return res.status(200).json({
                status: 200,
                message: "Image ajoutée",
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    },

    // findByUser: async (req, res) => {
    //     try {
    //         const user = await Album.find({
    //             $or: [{ libelle: req.body.libelle, users: req.body.userId }],
    //         }).sort({ createdAt: "desc" }).populate([{
    //             path: "services",
    //             select: ['libelle'],
    //             populate: {
    //                 path: "services",
    //                 model: "Service",
    //             },
    //         }]);

    //         return res.status(200).json(user);
    //     } catch (error) {
    //         return res.status(500).json({
    //             status: 500,
    //             message: "Aucun resultat"
    //         });
    //     }
    // },

    findByUser: async (req, res) => {
        const body = req.body
        try {
            const user = await Album.find({
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
        const body = req.body
        // try {
        //     const user = await User.findById(body.userId)
        //     var index = user.albums.indexOf(body.albumId);
        //     if (index > -1) { user.albums.splice(index, 1) }
        //     await user.save()
        //     await Album.findByIdAndRemove(body.albumId);
        //     return res.status(200).json({
        //         status: 200,
        //         message: "Image supprimée",
        //     });
        // } catch (error) {
        //     return res.status(500).json({
        //         status: 500,
        //         message: error.message,
        //     });
        // }
        try {
            await Album.findByIdAndRemove(body.albumId);
            return res.status(200).json({
                status: 200,
                message: "Catalogue supprimé",
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },

    update: async (req, res) => {
        if (!req.body.libelle) {
            return res.status(400).json({
                message: "Libelle requis"
            });
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
            return res.status(500).json({
                message: error.message
            });
        }
    },
};
module.exports = AlbumCtrl;