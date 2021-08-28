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
      const {
        email,
        password
      } = req.body;
      const user = await Users.findOne({
        email: email
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

      // if (!user.status)
      //   return res.status(400).send({
      //     status: 400,
      //     message:
      //       "Votre compte n'est pas encore activé, veuillez verifier votre adresse e-mail.",
      //   });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          status: 400,
          message: "Mot de passe incorrect",
        });

      const payload = {
        id: user._id,
        name: user.username
      };
      // const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      //   expiresIn: "1d",
      // });


      res.status(200).json({
        id: user.id,
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