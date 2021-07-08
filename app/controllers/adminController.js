const Services = require("../models/serviceModel");
const Users = require("../models/userModel");
const Vehicules = require("../models/vehiculeModel");

const adminController = {
  // getUsers: async (_req, res) => {
  //   try {
  //     const users = await Users.find();
  //     return res.status(200).json(users);
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },

  getVehicules: async (_req, res) => {
    Vehicules.find()
      .populate("users")
      .exec(function (err, vehicules) {
        if (err) {
          console.log(err);
        }
        return res.status(200).send(vehicules);
      });
  },

  getVehicule: async (req, res) => {
    try {
      const vehicules = await Vehicules.findById(req.body.id).populate("users");
      return res.status(200).json(vehicules);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getVehiculesUser: async (req, res) => {
    const id = req.params.id;
    Vehicules.find({ users: id })
      .populate("marque")
      .exec(function (err, vehicules) {
        if (err) {
          console.log(err);
        }
        return res.status(200).send(vehicules);
      });
  },

  // getVehiculesByService: async (req, res) => {
  //   const id = req.params.id;
  //   Services.find({ vehicule: id })
  //     .populate({
  //       path: "vehicule",
  //       populate: {
  //         path: "users",
  //         model: "Users",
  //       },
  //     })
  //     .exec(function (err, data) {
  //       if (err) {
  //         console.log(err);
  //       }
  //       return res.status(200).send(data);
  //     });
  // },
};

module.exports = adminController;
