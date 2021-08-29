const Users = require("../models/user-model");

const authController = {
  register: async (req, res) => {
    try {
      const {
        uid,
        firstname,
        lastname,
        email,
        phone,
        ville,
        departement,
        adresse,
        profil,
        mobilite,
        siret
      } = req.body;
      const newUser = new Users({
        uid: uid,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        ville: ville,
        departement: departement,
        adresse: adresse,
        profil: profil,
        mobilite: mobilite,
        siret: siret,
        status: false,
      });
      await newUser.save();
      return res.status(200).json({
        status: 200,
        message: "Votre compte a été crée, activer votre compte en allant dans votre boite e-mail",
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { uid } = req.body;
      const user = await Users.findOne({
        uid: uid
      }).populate([
        {
          path: "adresses",
          populate: {
            path: "adresses",
            model: "Adresse",
          },
        }
      ]);
      if (!user)
        return res.status(400).json({
          status: 400,
          message: "Cet utilisateur n'existe pas.",
        });
      res.status(200).json({
        id: user.id,
        uid: user.uid,
        firstname: user.firstname,
        lastname: user.lastname,
        profil: user.profil,
        avatar: user.avatar,
        adresses: user.adresses
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }
};

module.exports = authController;