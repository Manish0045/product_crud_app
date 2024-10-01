const nodemailer = require('nodemailer');

exports.sendEmail = (req, res) => {
    const senderMail = req.body.userEmail;
    const subject = req.body.subject;
    const body = req.body.message;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
            user: process.env.U_EMAIL,
            pass: process.env.U_PASS
        }
    });

    const mailOptions = {
        from: senderMail,
        to: process.env.U_EMAIL,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error.message);
            return res.status(500).json({
                status: 500,
                message: "Error sending email",
                error: error.message
            });
        } else {
            console.log("Mail sent: " + info.response);
            return res.status(200).json({
                status: 200,
                message: "Mail sent successfully",
                response: info.response
            });
        }
    });
};
