var express = require('express');
const _ = require("lodash")
var router = express.Router();

var COURSES = [{
  name: "001-hello",
  title: "Hello world!",
  layout: "layout-raw"
},{
  name: "002-firstmodule",
  title: "First module",
  layout: "layout-raw"
},{
  name: "003-waitfordom",
  title: "Wait for dom",
  layout: "layout-raw"
}]

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Dojo formation',
    courses: COURSES
  });
});
_.forEach(COURSES, (k) => {
  router.get('/' + k.name, function (req, res, next) {
    res.render(k.name, {
      title: k.title,
      layout: k.layout
    });
  });
})
module.exports = router;