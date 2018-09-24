let nodemailer = require("nodemailer");
import {mailresetpass} from '../template/mailresetpass'
// import {mailupdatepass} from '../template/mailupdatepass'
module.exports = async function(email, username,password, key, boo) {
	let transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		auth: {
			user: "nam.javascript@gmail.com",
			pass: "Namyeuhuong1"
		}
	});
	
    //có boo thì là reset pass, không có là tạo user
		const mailOptions = {
			from: '"Huongnguyen"s Blog" 👻" <huongnguyen2152@gmail.com>', // sender address
			to: `${email}`, // list of receivers
			subject: "Huongnguyen's Blog - Reset Password✔", // Subject line

			html: mailresetpass(email)
		}


		// send email with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log("Message sent: %s", info.messageId);
			// Preview only available when sending through an Ethereal account
			// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
			return info
			// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
			// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
		});
	}

