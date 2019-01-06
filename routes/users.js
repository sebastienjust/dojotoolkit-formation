var express = require('express');
var router = express.Router();


const SAMPLE_USERS = [
    {id:1, firstname:'Jean Michel', lastname:'Dupont', login:'jmdupont'},
    {id:2, firstname:'Mireille', lastname:'Martelle', login:'mmartelle'},
    {id:3, firstname:'Stéphanie', lastname:'Girard', login:'sgirard'}
]
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify(SAMPLE_USERS));
});

module.exports = router;
