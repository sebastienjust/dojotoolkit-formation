define(["dojo/dom", "dojo/dom-construct", "dojo/on", "dijit/registry", "dojo/parser", "dijit/form/ValidationTextBox", "dijit/form/Button", "dijit/form/Select", "dijit/form/DateTextBox"], (dom, domConstruct, on, dijitRegistry, parser) => {

    var HTML = `
    <div style="display:grid; grid-template-columns:200px 200px; grid-column-gap: 5px; grid-row-gap: 5px;">
        <label>Entrez un code produit</label>
        <input data-dojo-type="dijit/form/ValidationTextBox" data-dojo-props="id:'productCode', value:'1234-ABCD', placeholder:'Entrez un code produit', required:true, missingMessage:'Code produit obligatoire'" />
        <label>Catégorie</label>
        <select data-dojo-type="dijit/form/Select" data-dojo-props="id:'productCategory', required:true">
            <option value="SOLIDES">Solides</option>
            <option value="LIQUIDES">Liquides</option>
        </select>
        <label>Date</label>
        <input data-dojo-type="dijit/form/DateTextBox" data-dojo-props="id:'date'", value:'2018-08-25'" />
    </div>
    <div>
        <button data-dojo-type="dijit/form/Button" data-dojo-props="id:'btn'">Envoyer</button>
        <button data-dojo-type="dijit/form/Button" data-dojo-props="id:'btnAutoCreate'">Auto Creation</button>
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

        // Demande à dojo de resoudre tous les widgets présents à l'écran et les créer
        // data-dojo-type, data-dojo-props
        parser.parse();

        // Récupère un pointeur vers le bouton. Attention: ce n'est plus dom.byId() mais dijitRegistry.byId()
        let button = dijitRegistry.byId("btn");

        let productCodeInput = dijitRegistry.byId("productCode")
        
        // Les widgets ont des propriétés, on peut les setter une par une ou en groupe
        // Les propriétés présentes dépendent de chaque widget -> voir la doc 
        productCodeInput.set({
            'pattern': '[0-9].*',
            'invalidMessage': 'Le code produit doit commencer par un chiffre'
        })
        let productCategoryInput = dijitRegistry.byId("productCategory")

        // Chaque widget dispose de sa propre méthode "on" qui agit comme dojo/on à cela près
        // qu'il n'y a pas besoin de supprimer manuellement le handler. Lorsque le widget est détruit
        // les resources associées sont libérées.
        button.on("click", (e) => {

            // Certains widgets ont une validation intégrée (date, ValidationTextBox, FilteringSelect, etc.)
            // validate() renvoie true si le widget est valide conformément aux règles que l'on s'est fixées
            // (regexp, required, etc.)
            if (productCodeInput.validate()) {
                log(`Produit: ${productCodeInput.value} Catégorie: ${productCategoryInput.value}`)
            } else {
                log("Code produit invalide")
            }
        })

        dijitRegistry.byId("btnAutoCreate").on("click", () => {
            productCodeInput.set('value', counter + "-PRODUCT");
            productCategoryInput.set('value', "LIQUIDES");
            dijitRegistry.byId('date').set("value", new Date());
            counter += 1
        })


    }
    return { start }
});
