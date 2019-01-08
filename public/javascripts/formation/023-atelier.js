define(["dojo/dom", "dojo/dom-construct", "dojo/request", "dijit/form/Textarea"], (dom, domConstruct, request, Textarea) => {
    var start = () => {
        var app = dom.byId("app")
        var textarea = new Textarea({
            value:'Waiting download',
            rows:20
        }, domConstruct.create('div', {}, app))
        setTimeout(() => {
            request.get('/users', {handleAs:'json'}).then(users => {
                textarea.set('value', JSON.stringify(users, null, 2))
            })
        }, 2000)
        
    }
    return { start }
});
