const express = require('express');
const Course = require('../model/Course');
const {arrayMongooseObject} = require('../../util/mongoose');
const {mongooseObject} = require('../../util/mongoose');
const Role = require('../model/Role');
const { requiresAuth } = require('express-openid-connect');


class meController{
    // [GET]  /me/stored/courses

    storedCourses(req,res,next){
        const role = Role.findOne({email: req.oidc.user.email})
        role.then(roles => {
            if(roles.role == "prof" || roles.role == "admin"){
                Course.find({})
                .then(courses => res.render('me/storedCourses', {
                    courses : arrayMongooseObject(courses)}))
                .catch(next);        
            }
            if(roles.role =="user"){
                Course.find({})
                .then(courses => res.render('me/storedCoursesStudent', {
                    courses : arrayMongooseObject(courses)}))
                .catch(next);  
            }
        })



        // if(role.role == "prof" || role.role == "admin"){
        //     Course.find({})
        //         .then(courses => res.render('me/storedCourses', {
        //             courses : arrayMongooseObject(courses)}))
        //         .catch(next);
        // }
        // else{
        //     Course.find({})
        //     .then(courses => res.render('me/storedCoursesStudent', {
        //         courses : arrayMongooseObject(courses)}))
        //     .catch(next);
        // }
       

    }

}

module.exports = new meController;