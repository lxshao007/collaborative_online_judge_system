const ProblemModel = require('../models/problemModel');

const getProblems = function() {
    //store problems in database later; need promise to handle asyncronous call
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, function(err, problems){
            if (err){
                reject(err);
            } else {
                resolve(problems);
            }
        })
    });
}

//get problem by ID
const getProblem = function(id) {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({id: id}, function(err, problem){
            if(err) {
                reject(err);
            } else {
                resolve(problem);
            }
        })
    });
}

//add problem

const addProblem = function(newProblem) {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({name: newProblem.name}, function(err, data) {
            if (data) {
                reject("Problem name already exists")
            } else {
                ProblemModel.count({}, function(err, num) {
                    newProblem.id = num + 1;
                    //create mongodb object
                    let mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save();
                    resolve(mongoProblem);
                })
            }
        })
        
    });
}




module.exports = {
    getProblems,
    getProblem,
    addProblem
}