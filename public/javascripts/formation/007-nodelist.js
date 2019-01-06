define(["dojo/query", "dojo/dom", "dojo/on", "dojo/dom-class",
    // Utilisé pour ajouter des fonctionnalités à NodeList
    "dojo/NodeList-dom",
    "dojo/NodeList-fx",
], (query, dom, on, domClass) => {

    const HTML = `
    <button type="button" id="btn">Pick out fresh fruits</button>

    <h3>Fresh Fruits</h3>
    <ul id="freshList"></ul>
    
    <h3>Fruits</h3>
    <ul>
        <li class="fresh">Apples</li>
        <li class="fresh">Persimmons</li>
        <li class="fresh">Grapes</li>
        <li class="fresh">Fresh Figs</li>
        <li class="dried">Dates</li>
        <li class="dried">Raisins</li>
        <li class="dried">Prunes</li>
        <li class="fresh dried">Apricots</li>
        <li class="fresh">Peaches</li>
        <li class="fresh">Bananas</li>
        <li class="fresh">Cherries</li>
    </ul>
    `

    function start() {
        dom.byId("app").innerHTML = HTML;

        var nodes = query("li.fresh");
        nodes.on("click", function (event) {
            alert("I love fresh " + event.target.innerHTML);
        });

        query("li.fresh")
            .addClass("fresher")
            .attr("title", "freshened")
            .style("background", "lightblue")

        query("#btn").on("click", () => {
            query("li.fresh")
                .slideTo({
                    left: 200,
                    auto: true
                })
                .animateProperty({
                    properties: {
                        backgroundColor: {
                            start: "#fff",
                            end: "#ffc"
                        }
                    }
                })
                .play()
        })
    }

    return {
        start: start
    };

});