const USER = require('../models/user');
const PROJECT = require('../models/project')

module.exports = {
    mentorAddedProject: async (req, res) => {
        try {
            if (req.uRole == "Mentor") {
                const findProject = await PROJECT.find({user_id:req.uId})
                res.status(200).send({ status: 200, message: "successfully.", findProject });
                
            }
            else{
                res.status(301).json({ status: 301, message: "You are not authorize" });
            }
        
        } catch (error) {
            res.status(301).json({ status: 301, message: error });
        }
    },
    employeWorkProject: async(req,res)=>{
        try {
            if (req.uRole == "Employee") {
                const getUserInfo = await USER.find({_id:req.uId});
                const findProject = await PROJECT.find({members: {$in: getUserInfo[0].email}})
                res.status(200).send({ status: 200, message: "successfully.", findProject });   
            }
            else{
                res.status(301).json({ status: 301, message: "You are not authorize" });
            }
        } catch (error) {
            res.status(301).json({ status: 301, message: error });
        }
    }
}