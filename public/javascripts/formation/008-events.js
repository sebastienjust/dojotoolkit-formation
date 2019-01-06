define(["dojo/on", "dojo/dom", "dojo/_base/lang"], (on, dom, lang) => {

    const HTML = `
    <button type="button" id="myScopedButton1">Btn1</button>
    <button type="button" id="myScopedButton2">Btn2</button>
    `

    function start() {
        dom.byId("app").innerHTML = HTML;

        var myScopedButton1 = dom.byId("myScopedButton1"),
            myScopedButton2 = dom.byId("myScopedButton2"),
            myObject = {
                id: "myObject",
                onClick: function (evt) {
                    alert("The scope of this handler is " + this.id);
                }
            };

        // alert "myScopedButton1"
        on(myScopedButton1, "click", myObject.onClick);
        // alert "myObject" et non pas "myScopedButton2"
        on(myScopedButton2, "click", lang.hitch(myObject, "onClick"));
    }

    return {
        start: start
    };

});