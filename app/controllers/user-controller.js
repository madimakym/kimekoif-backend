import User from "../models/user-model";
const upload = require("../middlewares/upload");
var multer = require("multer");

export const findAll = async (_req, res) => {
    try {
        const response = await User.find().sort({ createdAt: "desc" });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
}

export const findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        return res.status(200).json({
            status: true,
            result: user
        });
    } catch (err) {
        return res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
}

const updateData = async (data) => {
    let user = await User.findByIdAndUpdate(data.id, data, {
        useFindAndModify: false,
    });
};

export const update = async (req, res) => {
    try {
        upload(req, res, function (err) {
            updateData(req.body)
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err);
            }
        });
        return res.status(200).json({
            success: true,
            result: "Mise à jour effectuée avec succès!",
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}