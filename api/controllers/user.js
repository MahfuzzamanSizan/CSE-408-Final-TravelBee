import User from "../models/User.js"


export const updateUser = async (req, res, next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
}

export const deleteUser = async (req, res, next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
}

export const getUser = async (req, res, next)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(err){    
        res.status(500).json(err)
    }
}

export const getUsers = async (req, res, next)=>{
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(err){
        next(err)
    }
}

//get user count
export const getUserCount = async (req, res, next)=>{
    try{
        const userCount = await User.countDocuments()
        res.status(200).json(userCount)
    }catch(err){
        next(err)
    }
}