define([
    'dojo/_base/declare', 
    'dojo/_base/lang',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/on',
    'dojo/request',
    'dojo/topic',
    'dojo/dom-style'
], (
    declare, 
    lang,
    dom,
    domConstruct,
    on, 
    request,
    topic,
    domStyle
) => {
    var User = declare('User', null, {
        parentNode: null,
        selected: false,
        user: null,
        _btnSelectionner: null,
        constructor(args) {
            this.parentNode = args.parentNode;
            this.selected = args.selected == null ? false : args.selected;
            this.user = args.user;
        },
        start: function () {
            let tr = domConstruct.create('tr', {}, this.parentNode)
            this._domNode = tr;
            domConstruct.create('td', { innerHTML: this.user.firstname }, tr)
            domConstruct.create('td', { innerHTML: this.user.lastname }, tr)
            domConstruct.create('td', { innerHTML: this.user.login }, tr)
            let tdButtonWrapper = domConstruct.create('td', {}, tr)
            this._btnSelectionner = domConstruct.create('button', { innerHTML: 'Sélectionner' }, tdButtonWrapper)
            on(this._btnSelectionner, "click", lang.hitch(this, this._handleClick))
            this._adjustSelection()
        },

        _adjustSelection: function () {
            let buttonName = this.selected ? "Déselectionner":"Sélectionner" ;
            this._btnSelectionner.innerHTML=buttonName;
            domStyle.set(this._domNode, {
                backgroundColor: this.selected ? "lightblue":"white" 
            })
        },

        _handleClick: function() {
            this._toggleSelection()
            topic.publish('message', this.user)
        },

        _toggleSelection: function () {
            this.selected = !this.selected
            this._adjustSelection()
        }
    })
    return User;
})
