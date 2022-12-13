const USER = require('../models/user');
const PROJECT = require('../models/project')
const TASK = require('../models/task');

module.exports = {
    mentorAddTask: async (req, res) => {
        try {
            const payload = req.body
            if (req.uRole == "Mentor") {
                const project_id = req.params.id;
                const getProjectInfo = await PROJECT.findById({ _id: project_id });
                if (getProjectInfo) {
                    const newTask = new TASK({
                        project: getProjectInfo.project_name,
                        estimated_time: payload.estimated_time,
                        final_time: payload.final_time,
                        status_of_completed: payload.status_of_completed,
                        quations: payload.quations,
                        code_quality: payload.code_quality,
                    });
                    const saveTask = await newTask.save();
                    console.log(saveTask);
                    res.status(200).send({ status: 200, message: "Task create successfully.", saveTask });

                } else {
                    res.status(301).json({ status: 301, message: "can't get any project" });
                }
            }
            else {
                res.status(301).json({ status: 301, message: "You are not authorize" });
            }

        } catch (error) {
            res.status(301).json({ status: 301, message: error });
        }
    },
    addComment: async (req, res) => {
        try {
            const payload = req.body
            const task_id = req.params.id;
            const getTasktInfo = await TASK.findById({ _id: task_id });
            const getUserInfo =  await USER.find({ _id: req.uId });
            const checkUser = await PROJECT.find({ members: { $in: getUserInfo[0].email } })
            const pushObj = {
                comments: payload.comments,
            }
            if (getTasktInfo && checkUser) {
                const addComment = await TASK.findByIdAndUpdate({ _id: task_id }, { $push: { comment: pushObj } }, { new: true })
                res.status(200).send({ status: 200, message: "Task update successfully.", addComment });
            } else {
                if (!checkUser) {
                    res.status(301).json({ status: 301, message: "you are not part of this project" });
                }
                if (!getTasktInfo) {
                    res.status(301).json({ status: 301, message: "can't get any task" });
                }
            }
        } catch (error) {
            res.status(301).json({ status: 301, message: error });
        }

    },
    replayComment: async (req, res) => {
        try {
            const payload = req.body
            const task_id = req.params.id;
            const getTasktInfo = await TASK.findById({ _id: task_id });
            const getUserInfo = await USER.find({ _id: req.uId });
            const checkUser = await PROJECT.find({ members: { $in: getUserInfo[0].email } })
            const pushObj = {
                replay:payload.replay,
                user_id:req.uId,
                comments_id:req.params.commentId
            }
            if (getTasktInfo && checkUser) {
                const addComment = await TASK.findByIdAndUpdate({ _id: task_id }, { $push: { replay_comment: pushObj } }, { new: true })
                res.status(200).send({ status: 200, message: "Task update successfully.", addComment });
            } else {
                if (!checkUser) {
                    res.status(301).json({ status: 301, message: "you are not part of this project" });
                }
                if (!getTasktInfo) {
                    res.status(301).json({ status: 301, message: "can't get any task" });
                }
            }
        } catch (error) {
            res.status(301).json({ status: 301, message: error });
        }
    }
}