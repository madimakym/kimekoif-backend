const upload = require("../middlewares/upload");
import Catalog from "../models/catalog-model";
var multer = require("multer");


export const create = async (req, res) => {
    try {
        upload(req, res, function (err) {
            const body = req.body
            let catalog = new Catalog({
                user: body.user,
                service: body.service,
                image: req.files[0].filename,
                status: true
            });
            catalog.save()
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json({
                success: true,
                message: "Catalogue ajouté",
            })
        });
    } catch (error) {
        console.log("error ===>", error);
    }
};


export const findByUser = async (req, res) => {
    try {
        const user = await Catalog.find({
            $or: [{
                user: req.body.user
            }],
        }).populate([{
            path: "service",
            populate: {
                path: "service",
                model: "Service",
            },
        }]);
        return res.json(user);
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
        await Catalog.findByIdAndRemove(id);
        return res.status(200).json({
            status: 200,
            message: "Catalogue supprimé",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};


export const image = async (req, res) => {
    let catalog = await Catalog.findById(req.params.catalogId).exec();
    if (catalog && catalog.image && catalog.image.data !== null) {
        res.set('Content-Type', catalog.image.contentType);
        console.log("catalog.image.data: ===>", catalog.image.data)
        return res.send(catalog.image.data);
    }
}