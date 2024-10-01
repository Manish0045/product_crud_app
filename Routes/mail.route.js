const express = require('express');
const nodemailer = require('nodemailer');
const { sendEmail } = require("../Controllers/mail.controller");
const router = express.Router();

router
    .get("/mail_service",
        (req, res) => res.json({
            status: 200,
            message: "Mail service is running fine"
        })
    )
    .post('/send', sendEmail)

module.exports = router;