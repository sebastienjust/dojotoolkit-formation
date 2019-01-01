const express = require('express')
const _ = require("lodash")
const app = express()
const port = 3000
const homepage_links = [{
    url: "001-hello/index.html", description="Hello world"
}]
const homepage_links_html = _.map(homepage_links, it => `<li><a href="${it.url}">${it.description}</a></li>`)
const homepage = `<!doctype html><html><head></head><body><h1>Dojo-toolkit formation</h1><ul>${homepage_links_html}</ul></body></html>`

app.get('/', (req, res) => res.send(homepage))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))