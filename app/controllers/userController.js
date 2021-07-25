const User = require("../models/user-model");
var _ = require('lodash');

const userCtrl = {
    findAll: async (_req, res) => {
        try {
            const response = await User.find().sort({
                createdAt: "desc"
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
            const response = await User.findById(id).populate([{
                    path: "services",
                    populate: {
                        path: "services",
                        model: "Service",
                    },
                },
                {
                    path: "disponibilites",
                    populate: {
                        path: "disponibilites",
                        model: "Disponibilite",
                    },
                },
                {
                    path: "albums",
                    populate: {
                        path: "albums",
                        model: "Album",
                    },
                },
            ]);

            // var group_data = _(response.albums)
            // .groupBy('libelle')
            // .map(function (items, bdate) {
            //     return {
            //         libelle: bdate,
            //         visual: _.map(items, 'visual')
            //     };
            // }).value();
            // return res.status(200).json(group_data);
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
            await User.findByIdAndRemove(id);
            return res.status(200).json({
                status: 200,
                message: "User deleted",
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        const {
            firstname,
            lastname,
            phone,
            ville,
            departement,
            adresse,
            mobilite,
            siret,
            avatar,
            description
        } = req.body;
        try {
            const data = {
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                ville: ville,
                departement: departement,
                adresse: adresse,
                mobilite: mobilite,
                siret: siret,
                description: description,
                avatar: avatar
            };

            await User.findByIdAndUpdate(id, data, {
                useFindAndModify: false,
            });
            return res.status(200).json({
                status: 200,
                message: "User updated",
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    },

    // findby: async (req, res) => {
    //     const body = req.body
    //     try {
    //         const data = await User.find()
    // .populate([{
    //         path: "services",
    //         populate: {
    //             path: "services",
    //             match: [{
    //                 libelle: {
    //                     $gte: 'Nattes'
    //                 }
    //             }],
    //             model: "Service",
    //         },
    //     },
    //     {
    //         path: "disponibilites",
    //         populate: {
    //             path: "disponibilites",
    //             model: "Disponibilite",
    //         },
    //     },
    // ])

    //         const response = _.filter(data, user => ((user.ville === body.ville) && (user.profil === "professional")));

    //         if ((body.service) && (body.date === "")) {
    //             let resService = response.filter(cl => cl.services.some(r => r.libelle == body.service));
    //             return res.status(200).json(resService);
    //         }

    //         if ((body.date) && (body.service === "")) {
    //             let resDisponibilite = response.filter(cl => cl.disponibilites.some(r => r.start == body.date));
    //             return res.status(200).json(resDisponibilite);
    //         }
    //         if (body.service && body.date) {
    //             let resService = response.filter(cl => cl.services.some(r => r.libelle == body.service));
    //             let resDisponibilite = resService.filter(cl => cl.disponibilites.some(r => r.start == body.date));
    //             return res.status(200).json(resDisponibilite);
    //         } else {
    //             return res.status(200).json(response);
    //         }

    //     } catch (error) {
    //         return res.status(500).json({
    //             status: 500,
    //             message: error.message,
    //         });
    //     }
    // },
};
module.exports = userCtrl;