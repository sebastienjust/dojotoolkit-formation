define([
    "dojo/_base/declare", "dojo/_base/lang",
    "dojo/dom", "dojo/dom-construct", "dojo/request", "dijit/form/Textbox", "dijit/form/Button",
    "dijit/_WidgetBase", "dijit/_Templated"
], (
    declare, lang, dom, domConstruct, request, Textbox, Button, _WidgetBase, _Templated
) => {

        var UserForm = declare("UserForm", [_WidgetBase, _Templated], {
            templateString: `
            <div class="" style="display:grid; grid-template-columns: min-content auto;">
                <label>Prénom</label>
                <div data-dojo-attach-point="firstNameNode"></div>
                <label>Nom</label>
                <div data-dojo-attach-point="lastNameNode"></div>
                <label>Login</label>
                <div data-dojo-attach-point="loginNode"></div>
            </div>
        `,
            baseClass: 'UserForm',
            user: null,

            firstNameNode: null,
            lastNameNode: null,
            loginNode: null,

            firstNameInput: null,
            lastNameInput: null,
            loginInput: null,

            postCreate: function () {
                this.firstNameInput = new Textbox({}, domConstruct.create('div', {}, this.firstNameNode))
                this.lastNameInput = new Textbox({}, domConstruct.create('div', {}, this.lastNameNode))
                this.loginInput = new Textbox({}, domConstruct.create('div', {}, this.loginNode))

                this.watch("user", lang.hitch(this, this._userChanged))
            },

            _userChanged: function () {
                this.firstNameInput.set('value', this.user == null ? "" : this.user.firstname)
                this.lastNameInput.set('value', this.user == null ? "" : this.user.lastname)
                this.loginInput.set('value', this.user == null ? "" : this.user.login)
            }
        })

        var start = () => {
            var app = dom.byId("app")
            var userForm = new UserForm({
                user: null
            }, domConstruct.create('div', {}, app))
            request.get('/users', { handleAs: 'json' }).then(users => {
                userForm.set('user', users[0])
            })
        }
        return { start }
    });
