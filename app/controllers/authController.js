const Users = require("../models/user-model");
const mailchimp = require("@mailchimp/mailchimp_marketing");
var generator = require("generate-password");
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

let transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  },
});

const sendemail = (receiver, subject, html) => {
  var mailOptions = {
    from: 'Kimekoif <noreply.makymadi@gmail.com>',
    to: receiver,
    subject: subject,
    html: html
  };
  console.log(mailOptions);
  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};


const authController = {
  register: async (req, res) => {
    try {
      const body = req.body
      const user = await Users.findOne({
        email: body.email
      });
      if (user)
        return res.status(400).send({
          status: 400,
          message: "Adresse email existante",
        });
      const passwordHash = await bcrypt.hash(body.password, 10);
      const newUser = new Users({
        firstname: body.firstname,
        lastname: body.lastname,
        password: passwordHash,
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
        status: false
      });
      await newUser.save();
      sendemail(body.email, "Inscription reussie", "Inscription reussie!!!");
      // MailChimp Subscription
      // const subscribingUser = {
      //   firstName: body.firstname,
      //   lastName: body.lastname,
      //   email: body.email,
      //   profile: (body.profil === "customer") ? "Cliente" : "Coiffeuse",
      // };
      // await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      //   email_address: subscribingUser.email,
      //   status: "subscribed",
      //   merge_fields: {
      //     FNAME: subscribingUser.firstName,
      //     LNAME: subscribingUser.lastName,
      //     PROFILE: subscribingUser.profile
      //   }
      // });

      return res.status(200).json({
        status: 200,
        message: "Votre compte a ??t?? cr??e",
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
      });
      if (!user)
        return res.status(400).send({
          status: 400,
          message: "Cet utilisateur n'existe pas!",
        });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).send({
          status: 400,
          message: "Mot de passe incorrect!",
        });
      res.status(200).json({
        id: user.id,
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
  },

  forgetPassword: async (req, res) => {
    try {
      const {
        email
      } = req.body;
      const user = await Users.findOne({
        email: email
      });
      if (!user)
        return res.status(400).send({
          status: 400,
          message: "Cet utilisateur n'existe pas.",
        });
      const newpassword = generator.generate({
        length: 15,
        numbers: true
      });
      const passwordHash = await bcrypt.hash(newpassword, 10);
      const user2 = await Users.findByIdAndUpdate(
        user.id, {
          password: passwordHash
        }, {
          useFindAndModify: false
        }
      );
      if (!user2) {
        return res.status(400).send({
          status: 400,
          message: `Cannot update user with id=${id}. Maybe Contact was not found!`,
        });
      } else {
        const receiver = email;
        const subject = "Vos nouveaux identifiants sur Kimekoif";
        const html =
          "Bonjour " +
          user.firstname +
          "<br><br>Vos identifiants de connexion sont d??sormais:<br> <p>Email: " +
          user.email +
          "</p> <p>Mot de passe: " +
          newpassword +
          "</p><br>Vous pouvez modifier ce mot de passe dans votre profil.";
        sendemail(receiver, subject, html);
        return res.status(200).send({
          status: 200,
          message: `Email envoy??`,
        });
      }
    } catch (err) {
      return res.status(500).send({
        status: 500,
        message: err.message,
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const {
        id,
        password,
        newpassword
      } = req.body;
      const user = await Users.findById(id);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).send({
          status: 400,
          message: "Mot de passe incorrect",
        });
      else {
        const isMatch = await bcrypt.compare(newpassword, user.password);
        if (isMatch)
          return res.status(400).send({
            status: 400,
            message: "D??sol??, le nouveau mot de passe doit ??tre diff??rent de l'ancien",
          });
        else {
          const passwordHash = await bcrypt.hash(newpassword, 10);
          const user = await Users.findByIdAndUpdate(
            id, {
              password: passwordHash
            }, {
              useFindAndModify: false,
            }
          );
          if (!user) {
            return res.status(400).send({
              status: 400,
              message: `Cannot update user with id=${id}. Maybe Contact was not found!`,
            });
          } else
            return res.status(200).send({
              status: 200,
              message: `Mot de passe a ??t?? mis ?? jour`
            });
        }
      }
    } catch (err) {
      return res.status(500).send({
        status: 500,
        message: err.message,
      });
    }
  },
};

module.exports = authController;