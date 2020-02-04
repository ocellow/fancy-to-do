"use strict"
const UserModel = require('../models').User

class ControllerUser {

    static create (req, res, next){
        
        let { username, email, password } = req.body
        
        // res.status(200).json(req.body)
        UserModel.create(
                {
                    username, 
                    email, 
                    password
                }
                    )
        .then(result =>{
                res.status(201).json(result)
        })
        .catch (err=>{
            next(err)
        })
    }

    static read (req, res, next){
                
        UserModel.findAll()
        .then(result =>{
            res.status(200).json(result)
        })
        .catch (err=>{
            next(err)
        })
    }

    static find (req, res, next){
        UserModel.findByPk(req.params.id)
        .then (result =>{
            if (result) {
                res.status(200).json(result)                
            } else {
                throw {
                    statusCode: 404,
                    msg: "ID not found"
                }
            }
        })
        .catch(err =>{
           next(err)
        })
    }
    
    static update (req, res, next){

        let {username, email, password } = req.body
                
        UserModel.update(
            {
                username,
                email, 
                password
            },{
                where: {
                    id : req.params.id
                }
            }
        )
        .then(result =>{
            if (result) {
                res.status(200).json(result)        
            } else {
                throw {
                    statusCode: 400,
                    msg: 'validation errors'
                }
            }
        })
        .catch (err=>{
            next(err)
        })
    }

    static destroy (req, res, next){
        const findOne = UserModel.findOne({
            where: {
                id: Number(req.params.id)
            }
        })

        const destroy = UserModel.destroy({
            where: {
                id : Number(req.params.id)
            }
        })

        Promise.all([findOne, destroy])
        .then(result =>{
            if (result[0]) {
                res.status(200).json(result[0])
            } else {
                throw {
                    statusCode: 404,
                    msg: "ID not found"
                }
            }
        })
        .catch (err=>{
            next(err)
        })
    }


}



module.exports = ControllerUser