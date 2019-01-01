define([
    // Définit une dépendance vers le module dojo/dom
    'dojo/dom'
], function(dom){
    // Quand les dépendances sont chargées, ce code est executé

    var oldText = {};

    // This returned object becomes the defined value of this module
    return {
        setText: function (id, text) {
            var node = dom.byId(id);
            oldText[id] = node.innerHTML;
            node.innerHTML = text;
        },

        restoreText: function (id) {
            var node = dom.byId(id);
            node.innerHTML = oldText[id];
            delete oldText[id];
        }
    };
});