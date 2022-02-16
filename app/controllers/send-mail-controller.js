var nodemailer = require("nodemailer");


let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
});


let mailOptions = {
    from: "maky.madingou@wizall.com",
    to: "makymadi@icloud.com",
    subject: "Test mail",
    text: "IT Works",
}


const SendMailCtrl = {
    sendEmail: async (req, res) => {
        transport.sendMail(mailOptions, function (error, data) {
            if (error) {
                console.log("error:", error);
            } else {
                console.log("Email sent");
            }
        });
    },

    // find: async (req, res) => {
    //     try {
    //         const response = await User.findById(req.params.id).populate([
    //             {
    //                 path: "SendMails",
    //                 populate: {
    //                     path: "SendMails",
    //                     model: "Product",
    //                 },
    //             }
    //         ]);
    //         return res.status(200).json(response);
    //     } catch (error) {
    //         return res.status(500).json({
    //             status: 500,
    //             message: error.message,
    //         });
    //     }
    // }

};
module.exports = SendMailCtrl;