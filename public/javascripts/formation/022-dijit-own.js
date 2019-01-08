define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/on",
    "dojo/request",
    "dijit/registry",
    "dijit/_WidgetBase", 
    "dijit/_Templated",
    "dijit/form/ValidationTextBox",
    "dijit/form/Button",
    "dijit/form/Select",
    "dijit/form/DateTextBox"
], (
    // Quand la liste commence à être longue, pensez bien à l'ordre
    declare, lang, dom, domClass, domConstruct, on, request, dijitRegistry, _WidgetBase, _Templated,  ValidationTextBox, Button
) => {

    var HTML = `
    <div id="content">
    </div>
    <div>
        <span id="btnWrapper"></span>
    </div>
    <div id="logs">
    </div>
    `
    function log(message) {
        domConstruct.create("div", { innerHTML: message }, dom.byId("logs"));
    }

    var UserBox = declare('UserBox', [_WidgetBase, _Templated], {
        baseClass: "UserBox",
        templateString: `<div>
            <span data-dojo-attach-point="firstnameNode"></span>
            <span data-dojo-attach-point="lastnameNode"></span>
            <span data-dojo-attach-point="loginNode"></span>
            </div>`,
        selected: false,
        firstname: '',
        lastname: '',
        login: '',
        fullname: null,

        loginNode: null,
        lastnameNode: null,
        firstnameNode: null,

        postMixInProperties: function () {
            console.log("postMixinProperties", this)
            this.inherited(arguments);
            this.fullname = this.firstname+ " " + this.lastname;
        },

        postCreate: function() {
            console.log("postCreate", this.id)
            this.inherited(arguments);
            this._refreshContent()
            var onClickHandle = on(this.domNode, "click", lang.hitch(this, this._toggleSelected))
            this.own(onClickHandle)
            this.watch("selected", lang.hitch(this, this._renderSelected))
        },

        _toggleSelected: function() {
            console.log("toggle selected", this.id)
            this._set("selected", !this.selected);
        },

        _renderSelected() {
            console.log("Render à l'écran", this.id)
            domClass.toggle(this.domNode, "UserBoxSelected", this.selected);
        },

        /** Appelé par le constructeur ET par l'extérieur */
        _setSelectedAttr: function(value) {
            // Ceci set la propriété MAIS n'appelle pas _setXXXAttr MAIS lance un évènement type onChange
            this._set("selected", value);
            console.log("Appel externe à selected avec ", value, this.id)
        },

        _refreshContent: function () {
            this.firstnameNode.innerHTML = "" + this.firstname
            this.lastnameNode.innerHTML = "" + this.lastname
            this.loginNode.innerHTML = "" + this.login
        }
    })

    var start = () => {

        var userBoxes = []

        // Injection du HTML de base de la page comme sur les autres tutoriaux
        dom.byId("app").innerHTML = HTML;

        request.get('/users', { handleAs: 'json' }).then(response => {
            response.forEach(users => {
                userBoxes.push(new UserBox({
                    selected: false,
                    firstname: users.firstname,
                    lastname: users.lastname,
                    login: users.login,
                }, domConstruct.create('span', {}, 'content')))
            });
        })

        var btn = new Button({label: "Selection 1er"}, dom.byId('btnWrapper'))
        btn.on("click", () => userBoxes[0].set("selected", !userBoxes[0].get('selected')))

    }
    return { start }
});
