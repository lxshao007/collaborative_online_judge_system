const express = require('express');//import express package
const router = express.Router();//import router

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const problemService = require('../services/problemService');



//get all problems
router.get('/problems', function(req, res){
    problemService.getProblems().then(problems => res.json(problems));
});

//get one problem
router.get('/problems/:id', function(req, res){
    const id = req.params.id;
    problemService.getProblem(+id)
        .then(problem => res.json(problem));
});

//post problems
router.post('/problems', jsonParser, function(req, res){
    problemService.addProblem(req.body)
    .then(problem => {
            res.json(problem);
        }, (error) => {
            res.status(400).send('Problem name already exists!');
        });
});

module.exports = router;