define(["dojo/query", "dojo/dom", "dojo/on", "dojo/dom-class",
    // Utilisé pour ajouter des fonctionnalités à query
    "dojo/NodeList-dom"
], (query, dom, on, domClass) => {

    const HTML = `
    <ul id="list">
        <li class="odd">
            <div class="bold">
                <a class="odd">Odd</a>
            </div>
        </li>
        <li class="even">
            <div class="italic">
                <a class="even">Even</a>
            </div>
        </li>
        <li class="odd">
            <a class="odd">Odd</a>
        </li>
        <li class="even">
            <div class="bold">
                <a class="even">Even</a>
            </div>
        </li>
        <li class="odd">
            <div class="italic">
                <a class="odd">Odd</a>
            </div>
        </li>
        <li class="even">
            <a class="even">Even</a>
        </li>
    </ul>

    <ul id="list2">
        <li class="odd">Odd</li>
    </ul>

    <button id="highlightOdds">Odds</button>
    <button id="highlightOddsMore">Odds+</button>
    <button id="highlightEvens">Evens</button>
    `

    function start() {
        dom.byId("app").innerHTML = HTML;

        // Récupération de la liste
        var list = query("#list")[0];
        console.log("list:", list);

        // Récupération de tous ceux qui ont la classe odd
        var odds = query(".odd");
        console.log("odds:", odds);

        // Récupération d'un tableau d'éléments restreints à la première liste qui ont la class odd
        var odds1 = query("#list .odd");
        console.log("odds1", odds1);

        // Récupération d'un tableau de nodes avec la classe "odd" de la première liste
        // en utilisant un DOMNode
        var odds2 = query(".odd", dom.byId("list"));
        console.log("odds2", odds2);

        // Les elements avec classe odd sur un tag "a"
        var oddA = query("a.odd");
        console.log("oddA", oddA);

        // Tous les éléments de type A avec un LI comme ancètre
        var allA = query("li a");
        console.log(allA);

        // Tous les éléments de type A avec un LI DIRECTEMENT parent.
        var someA = query("li > a");
        console.log(someA);

        on(dom.byId("highlightOdds"), "click", () => {
            query(".odd").forEach((node, index, nodelist) => {
                // pour chacun récupéré, on met en rouge
                domClass.add(node, "formation-006-query-red");
            })
        })

        on(dom.byId("highlightEvens"), "click", () => {
            query(".even").addClass("formation-006-query-blue")
        })

        on(dom.byId("highlightOddsMore"), "click", () => {
            query(".odd")
                .removeClass("formation-006-query-red")
                .addClass("formation-006-query-darkred")
                .style("color", "white")
        })

        query("button").on("click", (e)=>console.log("Clicked:", e))

    }



    return {
        start: start
    };

});