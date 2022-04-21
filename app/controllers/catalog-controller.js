import Catalog from "../models/catalog-model";
import fs from "fs";

export const create = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;
        let catalog = new Catalog({
            user: fields.user,
            service: fields.service,
            status: true
        });

        if (files.image) {
            catalog.image.data = fs.readFileSync(files.image.path);
            catalog.image.contentType = files.image.type;
        }

        await catalog.save()
        return res.status(200).json({
            success: true,
            message: "Catalogue ajouté",
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
        const catalog = await Catalog.find({
            $or: [{ user: body.user }],
        }, '_id').sort({ createdAt: "desc" });

        return res.json(catalog);

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