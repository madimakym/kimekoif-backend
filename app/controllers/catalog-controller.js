import Catalog from "../models/catalog-model";
import fs from "fs";

export const create = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;
        let catalog = new Catalog(fields);
        if (files.image) {
            catalog.image.data = fs.readFileSync(files.image.path);
            catalog.image.contentType = files.image.type;
        }

        catalog.save((err, result) => {
            if (err) {
                console.log("saving Catalog ==>", err);
                res.status(400).send("Error Saving");
            }
            res.json(result);
        })

    } catch (err) {
        console.log("error ==>", err);
        res.status(400).json({
            err: err.message
        });
    }
};

export const findAll = async (req, res) => {
    try {
        const response = await Catalog.find();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
    // console.log("user ===> ", req.user)

}