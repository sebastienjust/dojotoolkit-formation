define(["dojo/on", "dojo/topic", "dojo/dom-construct", "dojo/dom"], (on, topic, domConstruct, dom) => {

    const HTML = `
    <button id="alertButton">Generer une alerte</button>
    <div><strong>Listener 1</strong></div>
    <div id="messageListener1"></div>
    <div><strong>Listener 2</strong></div>
    <div id="messageListener2"></div>
    `
    var counter = 0 ;
    function start() {
        dom.byId("app").innerHTML = HTML;

        var alertButton = dom.byId("alertButton"),
            createAlert = dom.byId("createAlert");

        
        on(alertButton, "click", function () {
            topic.publish("alertUser", `Nouveau message`, counter);
            counter += 1;
        });

        // Ecoute tous les évènements de type "alertUser" d'ou qu'ils viennent.
        topic.subscribe("alertUser", function (text, counter) {
            domConstruct.create("div", {innerHTML: counter + " " + text}, dom.byId("messageListener1"))
        });

        topic.subscribe("alertUser", function (text, counter) {
            domConstruct.create("div", {innerHTML: text+ " " + counter}, dom.byId("messageListener2"))
        });

    }

    return {
        start: start
    };

});