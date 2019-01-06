define(["dojo/dom", "dojo/dom-construct", "dojo/on"], (dom, domConstruct, on) => {

    const HTML = `
    <ul id="list" style="border:1px solid red;">
        <li id="one">One</li>
        <li id="two">Two</li>
        <li id="three">Three</li>
        <li id="four">Four</li>
        <li id="five">Five</li>
    </ul>
    <button id="moveFirst">Placer Three en 1er</button>
    <button id="moveBeforeTwo">Avant Two</button>
    <button id="moveAfterFour">Après Four</button>
    <button id="moveLast">En dernier</button>
    <button id="destroyFirst">Détruire 1er</button>
    <button id="destroyAll">Détruire tout</button>
    `

    function start() {
        populateList()

        dom.byId("app").innerHTML = HTML;

        // Connect the buttons
        on(dom.byId("moveFirst"), "click", moveFirst);
        on(dom.byId("moveBeforeTwo"), "click", moveBeforeTwo);
        on(dom.byId("moveAfterFour"), "click", moveAfterFour);
        on(dom.byId("moveLast"), "click", moveLast);
        on(dom.byId("destroyFirst"), "click", destroyFirst);
        on(dom.byId("destroyAll"), "click", destroyAll);

    }


    function populateList() {
        var list = dom.byId("app");
        var three = dom.byId("three");

        domConstruct.create("li", {
            innerHTML: "Six"
        }, list);

        domConstruct.create("li", {
            innerHTML: "Seven",
            className: "seven",
            style: {
                fontWeight: "bold"
            }
        }, list);

        domConstruct.create("li", {
            innerHTML: "Three and a half"
        }, three, "after");
    }

    function moveFirst() {
        var list = dom.byId("list"),
            three = dom.byId("three");

        domConstruct.place(three, list, "first");
    }

    function moveBeforeTwo() {
        var two = dom.byId("two"),
            three = dom.byId("three");

        domConstruct.place(three, two, "before");
    }

    function moveAfterFour() {
        var four = dom.byId("four"),
            three = dom.byId("three");

        domConstruct.place(three, four, "after");
    }

    function moveLast() {
        var list = dom.byId("list"),
            three = dom.byId("three");

        domConstruct.place(three, list);
    }

    function destroyFirst(){
        var list = dom.byId("list"),
            items = list.getElementsByTagName("li");
    
        if(items.length){
            domConstruct.destroy(items[0]);
        }
    }
    function destroyAll(){
        domConstruct.empty("list");
    }

    return {
        start: start
    };

});