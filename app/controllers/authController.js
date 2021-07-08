const Users = require("../models/userModel");
// var generator = require("generate-password");
// const bcrypt = require("bcrypt");
var bcrypt = require('bcryptjs');

// const jwt = require("jsonwebtoken");
// var nodemailer = require("nodemailer");
// var smtpTransport = nodemailer.createTransport({
//   host: "ssl0.ovh.net",
//   port: 25,
//   auth: {
//     user: "dev@novatrices.tech",
//     pass: "8:2N^sa2X",
//   },
// });
// var link;

// const sendemail2 = (req, rand, receiverEmail) => {
//   host = req.get("host");
//   link = "https://" + req.get("host") + "/auth/registerconfirm?rand=" + rand;

//   var mailOptions = {
//     from: "dev@novatrices.tech",
//     to: receiverEmail,
//     subject: "Confirmation de compte",
//     html:
//       "Bonjour,<br> Vous venez de vous inscrire à GMS Auto Center. Veuillez suivre ce lien pour confirmer votre adresse e-mail.<br><a href=" +
//       link +
//       ">Verifiez votre adresse e-mail.</a> <br/><br/> Merci. <br/>GMS Auto Center",
//   };
//   console.log(mailOptions);
//   smtpTransport.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

// const sendemail = (receiver, subject, html) => {
//   var mailOptions = {
//     from: "dev@novatrices.tech",
//     to: receiver,
//     subject: subject,
//     html: html,
//   };
//   console.log(mailOptions);
//   smtpTransport.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

const authController = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, phone, password, ville, departement, adresse, profil } = req.body;
      const user = await Users.findOne({ email: email });
      if (user)
        return res.status(400).json({
          status: 400,
          message: "Adresse email existante!",
        });
      var rand = Math.floor(Math.random() * 100 + 54);

      var salt = bcrypt.genSaltSync(10);
      var passwordHash = bcrypt.hashSync(password, salt);
      const newUser = new Users({
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        password: passwordHash,
        ville: ville,
        departement: departement,
        adresse: adresse,
        profil: profil,
        rand: rand,
        status: false,
      });
      await newUser.save();
      // sendemail2(req, rand, email);
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
      const { email, password } = req.body;
      const user = await Users.findOne({ email: email });
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

      const payload = { id: user._id, name: user.username };
      // const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      //   expiresIn: "1d",
      // });

      res.status(200).json({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        profil: user.profil
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  },

  // forgetPassword: async (req, res) => {
  //   try {
  //     const { id, email } = req.body;
  //     const user = await Users.findOne({ email: email });
  //     if (!user)
  //       return res.status(400).send({
  //         status: 400,
  //         message: "Cet utilisateur n'existe pas.",
  //       });
  //     const newpassword = generator.generate({
  //       length: 15,
  //       numbers: true,
  //     });
  //     const passwordHash = await bcrypt.hash(newpassword, 10);
  //     const user2 = await Users.findByIdAndUpdate(
  //       user.id,
  //       { password: passwordHash },
  //       {
  //         useFindAndModify: false,
  //       }
  //     );
  //     if (!user2) {
  //       return res.status(400).send({
  //         status: 400,
  //         message: `Cannot update user with id=${id}. Maybe Contact was not found!`,
  //       });
  //     } else {
  //       const receiver = email;
  //       const subject = "Vos nouveaux identifiants sur GMS Auto Center";
  //       const html =
  //         "Bonjour " +
  //         user.firstname +
  //         "<br><br>Vos identifiants de connexion sont désormais:<br> <p>Email: " +
  //         user.email +
  //         "</p> <p>Mot de passe: " +
  //         newpassword +
  //         "</p><br>Vous pouvez modifier ce mot de passe dans votre profil.<br><br> À bientôt, <br><br>`L'équipe GMS Auto Center ";
  //       // sendemail(receiver, subject, html);
  //       return res.status(200).send({
  //         status: 200,
  //         message: `Mot de passe a été mis à jour`,
  //       });
  //     }
  //   } catch (err) {
  //     return res.status(500).send({
  //       status: 500,
  //       message: err.message,
  //     });
  //   }
  // },

  // resetPassword: async (req, res) => {
  //   try {
  //     const { id, password, newpassword } = req.body;
  //     const user = await Users.findById(id);

  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch)
  //       return res.status(400).send({
  //         status: 400,
  //         message: "Mot de passe incorrect",
  //       });
  //     else {
  //       const isMatch = await bcrypt.compare(newpassword, user.password);
  //       if (isMatch)
  //         return res.status(400).send({
  //           status: 400,
  //           message:
  //             "Désolé, le nouveau mot de passe doit être différent de l'ancien",
  //         });
  //       else {
  //         const passwordHash = await bcrypt.hash(newpassword, 10);
  //         const user = await Users.findByIdAndUpdate(
  //           id,
  //           { password: passwordHash },
  //           {
  //             useFindAndModify: false,
  //           }
  //         );
  //         if (!user) {
  //           return res.status(400).send({
  //             status: 400,
  //             message: `Cannot update user with id=${id}. Maybe Contact was not found!`,
  //           });
  //         } else
  //           return res.status(200).send({
  //             message: `Mot de passe a été mis à jour`,
  //           });
  //       }
  //     }
  //   } catch (err) {
  //     return res.status(500).send({
  //       status: 500,
  //       message: err.message,
  //     });
  //   }
  // },

  // verifiedToken: (req, res) => {
  //   try {
  //     const token = req.header("Authorization");
  //     if (!token) return res.send(false);

  //     jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
  //       if (err) return res.send(false);

  //       const user = await Users.findById(verified.id);
  //       if (!user) return res.send(false);

  //       return res.send(true);
  //     });
  //   } catch (err) {
  //     return res.status(500).send({
  //       status: 500,
  //       message: err.message,
  //     });
  //   }
  // },

  // registerConfirm: async (req, res) => {
  //   try {
  //     const user = await Users.findOne({ rand: req.query.rand });

  //     if (user) {
  //       await Users.findOneAndUpdate(
  //         { _id: user.id },
  //         {
  //           status: true,
  //           rand: "",
  //         }
  //       );
  //       res.render("registerconfirm", {
  //         title: "Félicitation!",
  //         message: "Votre inscription a bien été prise en compte.",
  //       });
  //     } else {
  //       res.render("registerconfirm", {
  //         title: "404",
  //         subtitle: "Page not found",
  //         message:
  //           "Un problème est survenu lors de la confirmation de votre compte. Veuillez utiliser l'e-mail de confirmation le plus récent que vous ayez reçu.",
  //       });
  //     }
  //   } catch (error) {
  //     return res.status(500).send({
  //       status: 500,
  //       message: err.message,
  //     });
  //   }
  // },
};

module.exports = authController;
