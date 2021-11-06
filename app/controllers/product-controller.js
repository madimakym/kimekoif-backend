// @ts-nocheck
const Product = require("../models/product-model");
var _ = require('lodash');

const ProductCtrl = {
    // create: async (req, res) => {
    //     const body = req.body
    //     try {
    //         const product = new Product({
    //             libelle: body.libelle,
    //             description: body.description,
    //             price: body.price,
    //             visual: body.visual,
    //             status: body.status ? body.status : true
    //         });
    //         const savedProduct = await product.save();

    //         const gallery = new Gallery({
    //             libelle: "body.visual",
    //             productId: savedProduct._id
    //         });
    //         const savedGallery = await gallery.save();
    //         savedProduct.galleryId = savedProduct.galleryId.concat(savedGallery);
    //         await savedProduct.save()
    //         return res.status(200).json({
    //             status: 200,
    //             message: "Product ajouté",
    //         });
    //     } catch (err) {
    //         return res.status(500).json({
    //             status: 500,
    //             message: err.message,
    //         });
    //     }
    // },
    create: async (req, res) => {
        const body = req.body
        try {
            const product = new Product({
                libelle: body.libelle,
                description: body.description,
                price: body.price,
                visual: body.visual,
                status: body.status ? body.status : true
            });
            await product.save();
            return res.status(200).json({
                status: 200,
                message: "Product ajouté",
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
            const response = await Product.find();
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
            const response = await Product.findById(id);
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
            await Product.findByIdAndRemove(id);
            return res.status(200).json({
                status: 200,
                message: "Produit supprimé",
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
        const body = req.body
        try {
            const data = {
                libelle: body.libelle,
                description: body.description,
                price: body.price,
                visual: body.visual,
                status: body.status ? body.status : true
            };

            await Product.findByIdAndUpdate(id, data, {
                useFindAndModify: false,
            });
            return res.status(200).json({
                status: 200,
                message: "Product updated",
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
};
module.exports = ProductCtrl;