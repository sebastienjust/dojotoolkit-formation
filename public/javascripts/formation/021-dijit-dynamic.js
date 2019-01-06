define([
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/on",
    "dijit/registry",
    "dijit/form/ValidationTextBox",
    "dijit/form/Button",
    "dijit/form/Select",
    "dijit/form/DateTextBox"
], (dom, domConstruct, on, dijitRegistry,  ValidationTextBox, Button) => {

    var HTML = `
    <div id="content">
        <label>Entrez un code produit</label>
        <span id="productCodeWrapper"></span>
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

    var start = () => {

        var counter = 0;

        // Injection du HTML de base de la page comme sur les autres tutoriaux
        dom.byId("app").innerHTML = HTML;

        // Création à partir de la classe, les propriétés sont passées au constructeur, l'emplacement en 2e param.
        let productCodeInput = new ValidationTextBox({
            value: '1234-ABCD',
            placeholder: 'Entrez un code produit',
            required: true,
            missingMessage: 'Code produit obligatoire',
            pattern: '[0-9].*',
            invalidMessage: 'Le code produit doit commencer par un chiffre'
        }, dom.byId("productCodeWrapper"))

        let button = new Button({
            label: 'Envoyer'
        }, dom.byId('btnWrapper'))

        button.on("click", (e) => {
            if (productCodeInput.validate()) {
                log(`Produit: ${productCodeInput.value}`)
            } else {
                log("Code produit invalide")
            }
        })


    }
    return { start }
});
