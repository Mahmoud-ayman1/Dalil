const nodemailer=require("nodemailer");
module.exports.sendEmail=async(options)=>{
    let transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: "mahmoudayman010155@gmail.com",
            pass: "iwkz pelt idmd ysuh",
        },
    });
    const info = await transporter.sendMail({
        from: '"Dalil App" <mahmoudayman010155@gmail.com>', // sender address
        to: options.email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: `
            <h1>
                Hello ${options.name}
            </h1>
            <br>
            <a href="http://https://dalil-phi.vercel.app/users/verifyEmail/${options.token}">Verify your account from here</a>
        `, // html body
    });
}