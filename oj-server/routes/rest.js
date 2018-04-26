const express = require('express');//import express package
const router = express.Router();//import router
const problemService = require('../services/problemService');

//get all problems
router.get('/problems', function(req, res){
    problemService.getProblems().then(problems => res.json(problems));
})



module.exports = router;