const db = require('../models/project');
const USER = require('../models/user');
const TECHNOLOGY = require('../models/technology');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
module.exports = {
    project: async (req, res) => {
        try {
            const payload = req.body;
            if (req.uRole == "Mentor") {
                const checkMembers = await USER.find({ email: payload.members });
                if (!checkMembers) {
                    res.status(301).json({ status: 301, message: "Enter valid member email" });
                }
                const checkTechnology = await TECHNOLOGY.find({ technology_name: payload.technology });
                if (!checkTechnology) {
                    res.status(301).json({ status: 301, message: "Enter valid Technology" });
                }
                const checkProjectInfo = await db.findOne({ project_name: payload.project_name });
                if (checkProjectInfo) {
                    res.status(301).json({ status: 301, message: "project is alrady exist" });
                }
                else {
                    const newProject = new db({
                        project_name: payload.project_name,
                        timeline: payload.timeline,
                        file: req.file.filename,
                        user_id: req.uId,
                        start_date: payload.start_date,
                        end_date: payload.end_date,
                        members: payload.members,
                        technology: payload.technology,
                    });
                    const saveProject = await newProject.save();
                    res.status(200).send({ status: 200, message: "Project create successfully.", saveProject });
                }
            }
            else {
                res.status(301).json({ status: 301, message: "You are not authorize" });
            }
        } catch (error) {
            res.status(301).json({ status: 301, error });
        }
    },
    addMembers: async (req, res) => {
        try {
            const payloda = req.body;
            const _id = req.params.id
            if (req.uRole == "Mentor") {
                chechMember = await USER.findOne({ email: payloda.email })
                if (!chechMember) {
                    res.status(301).json({ status: 301, message: "Enter valid member email" });
                }
                const addMember = await db.updateOne({ _id }, { $push: { members: payloda.email } });
                const getProjectData = await db.findById({ _id });
                console.log(getProjectData);
                if (addMember) {
                    const transport = nodemailer.createTransport(smtpTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false,
                        requireTLS: true,
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASSWORD
                        }
                    }));
                    const mailnOptions = {
                        from: process.env.EMAIL_USER,
                        to: `${req.body.email}`,
                        subject: "Project invitation",
                        text: `project name ${getProjectData.project_name} 
                               start date${getProjectData.start_date}
                               end Date ${getProjectData.end_date} and project timeline is ${getProjectData.timeline}`
                    }

                    transport.sendMail(mailnOptions, (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Mail is successfully send");
                        }
                    });
                }
                res.status(200).send({ status: 200, message: "member added successfully.", addMember });
            }
            else {
                res.status(301).json({ status: 301, message: "You are not authorize" });
            }
        } catch (error) {
            res.status(301).json({ status: 301, error });
        }
    },
    removeMember: async (req, res) => {
        try {
            const payloda = req.body;
            const _id = req.params.id;
            if (req.uRole == "Mentor") {
                const removeMember = await db.updateOne({ _id }, { $pull: { members: payloda.email } });
                res.status(200).send({ status: 200, message: "member remove successfully.", removeMember });
            }
        } catch (error) {
            res.status(301).json({ status: 301, error });
        }
    }
}