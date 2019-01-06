define(["dojo/dom", "dojo/dom-construct"],
    function (dom, domConstruct) {

        function start() {
            var app = dom.byId("app"),
                three = dom.byId("three");

            var list = domConstruct.create("ul", {}, app);

            domConstruct.create("li", {
                innerHTML: "one"
            }, list);
            domConstruct.create("li", {
                innerHTML: "two"
            }, list);
            var three = domConstruct.create("li", {
                innerHTML: "three"
            }, list);
            domConstruct.create("li", {
                innerHTML: "four",
                className: "four",
                style: {
                    fontWeight: "bold"
                }
            }, list);
            domConstruct.create("li", {
                innerHTML: "Three and a half"
            }, three, "after");
            domConstruct.create("li", {
                id: "myId",
                innerHTML: "five",
                className: "five"
            }, list);
            domContruct.create("li", {
                id: "sixEmpty"
            }, list)

            // attention dangereux (Cross scripting)
            // equivalent de document.getElementById("myId").innerHTML = "FIVE !!!"
            dom.byId("myId").innerHTML = "FIVE !!!"
            
        }

        return {start:start};

    });