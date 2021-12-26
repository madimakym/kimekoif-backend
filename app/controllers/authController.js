const Users = require("../models/user-model");
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

const authController = {
  register: async (req, res) => {
    try {
      const body = req.body

      const newUser = new Users({
        uid: body.uid,
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        phone: body.phone,
        ville: body.ville,
        departement: body.departement,
        adresse: body.adresse,
        quartier: body.quartier,
        description: body.description,
        profil: body.profil,
        mobilite: body.mobilite,
        siret: body.siret,
        status: false,
      });
      await newUser.save();

      const subscribingUser = {
        firstName: body.firstname,
        lastName: body.lastname,
        email: body.email,
        profile: (body.profile === "customer") ? "Cliente" : "Coiffeuse",
      };

      await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
          PROFILE: subscribingUser.profile
        }
      });

      return res.status(200).json({
        status: 200,
        message: "Votre compte a été crée, activer votre compte en allant dans votre boite e-mail",
      });
    } catch (error) {
      return res.status(error.status).send({
        status: error.status,
        error: error.message
      });
    }
  },

  login: async (req, res) => {
    try {
      const { uid } = req.body;
      const user = await Users.findOne({
        uid: uid
      })
      res.status(200).json({
        id: user.id,
        uid: user.uid,
        firstname: user.firstname,
        lastname: user.lastname,
        profil: user.profil,
        avatar: user.avatar,
        adresses: user.adresses,
        status: user.status
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