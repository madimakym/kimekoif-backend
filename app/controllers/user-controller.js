import User from "../models/user-model";
import jwt from 'jsonwebtoken';

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

export const update = async (req, res) => {
    const id = req.params.id;
    try {
        let user = await User.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false,
        });
        return res.status(200).json({
            success: true,
            result: user,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}