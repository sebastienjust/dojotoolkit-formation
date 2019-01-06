define(["dojo/on", "dojo/topic", "dojo/dom-construct", "dojo/dom"], (on, topic, domConstruct, dom) => {

    const HTML = `
    <button id="alertButton">Alert</button>
    <button id="createAlert">Create alert button</button>
    <div id="messages"></div>
    `

    function start() {
        dom.byId("app").innerHTML = HTML;


        var alertButton = dom.byId("alertButton"),
            createAlert = dom.byId("createAlert");

        on(alertButton, "click", function () {
            topic.publish("alertUser", "Nouveau message.");
        });

        on(createAlert, "click", function (evt) {
            var anotherButton = domConstruct.create("button", {
                innerHTML: "Nouveau bouton"
            }, createAlert, "after");

            on(anotherButton, "click", function (evt) {
                topic.publish("alertUser", "Encore un nouveau message.");
            });
        });

        // Ecoute tous les évènements de type "alertUser" d'ou qu'ils viennent.
        topic.subscribe("alertUser", function (text) {
            domConstruct.create("div", {innerHTML: text}, dom.byId("messages"))
        });

    }

    return {
        start: start
    };

});