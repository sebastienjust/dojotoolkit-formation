var express = require('express');
const _ = require("lodash")
var router = express.Router();

const DOJO = `    <!-- load Dojo -->
<script>
    var dojoConfig = {
        async: true,
        packages: [{
            name: "formation",
            location: location.pathname.replace(/\/[^/]*$/, '') + '/javascripts/formation'
        }]
    }
</script>
<script src="//ajax.googleapis.com/ajax/libs/dojo/1.10.4/dojo/dojo.js" data-dojo-config="async: true"></script>
`
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
},{
  name: "004-dom",
  title: "DOM",
  layout: "layout-app",
  view: "body-app",
  module: "004-dom"
},{
  name: "005-domEvents",
  title: "DOM Events",
  layout: "layout-app",
  view: "body-app",
  module: "005-domEvents"
},{
  name: "006-query",
  title: "Query",
  layout: "layout-app",
  view: "body-app",
  module: "006-query"
},{
  name: "007-nodelist",
  title: "Node List",
  layout: "layout-app",
  view: "body-app",
  module: "007-nodelist"
},{
  name: "008-events",
  title: "Events",
  layout: "layout-app",
  view: "body-app",
  module: "008-events"
},{
  name: "009-publish",
  title: "Topics",
  layout: "layout-app",
  view: "body-app",
  module: "009-publish"
},{
  name: "010-keyboard",
  title: "Clavier",
  layout: "layout-app",
  view: "body-app",
  module: "010-keyboard"
},{
  name: "011-deferred",
  title: "Deferred",
  layout: "layout-app",
  view: "body-app",
  module: "011-deferred"
},{
  name: "012-atelier",
  title: "Atelier",
  layout: "layout-app",
  view: "body-app",
  module: "012-atelier"
},{
  name: "020-dijit",
  title: "Dijit",
  layout: "layout-app",
  view: "body-app",
  module: "020-dijit"
},{
  name: "021-dijit-dynamic",
  title: "Dijit dynamique",
  layout: "layout-app",
  view: "body-app",
  module: "021-dijit-dynamic"
},{
  name: "022-dijit-own",
  title: "Dijit own widgets",
  layout: "layout-app",
  view: "body-app",
  module: "022-dijit-own"
},{
  name: "023-atelier",
  title: "Atelier dijit",
  layout: "layout-app",
  view: "body-app",
  module: "023-atelier"
},{
  name: "024-atelier",
  title: "Atelier dijit",
  layout: "layout-app",
  view: "body-app",
  module: "024-atelier"
},{
  name: "025-atelier",
  title: "Atelier dijit own widget",
  layout: "layout-app",
  view: "body-app",
  module: "025-atelier"
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
    res.render(k.view || k.name, {
      title: k.title,
      layout: k.layout,
      ...k
    });
  });
})
module.exports = router;