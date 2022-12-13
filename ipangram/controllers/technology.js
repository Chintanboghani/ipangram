const db = require('../models/technology');

module.exports = {
    addTechnology: async (req, res, next) => {
        try {
        const payload = req.body;
        const checkTechnology = await db.findOne({technology_name:payload.technology_name})
        if (checkTechnology) {
            res.status(301).json({ status: 301, message:"technology is alrady exist" });
        }
        const newTechnology = new db({
            technology_name: payload.technology_name,
            file: req.file.filename,
            user_id: req.uId,
            userRole: req.uRole,
            // status: req.status,
        });
        const saveTechnology = await newTechnology.save();
        res.status(200).send({ status: 200, message: "Technology create successfully.",saveTechnology});
        } catch (error) {
            res.status(301).json({ status: 301, message: error });
        }
    }
}