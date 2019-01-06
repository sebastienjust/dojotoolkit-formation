define(["dojo/dom", "dojo/dom-construct", "dojo/on", "dojo/query", "dojo/keys", "dojo/NodeList-traverse"], (dom, domConstruct, on, query, keys) => {

    const HTML = `
    <h1>Press Up/Down Arrow Or Enter Keys to traverse form.</h1>
    <h2>Home/End will go to the beginning or end.</h2>
    <form id="traverseForm">
        First Name: <input type="text" id="firstName">
        Last Name: <input type="text" id="lastName">
        Email Address: <input type="text" id="email">
        Phone Number: <input type="text" id="phone">
        <input type="submit" id="send" value="send">
    </form>
    <div id="logs"></div>
    `

    function start() {
        dom.byId("app").innerHTML = HTML;


        var inputs = query("input");

        on(dom.byId("traverseForm"), "keydown", function (event) {
            var node = query.NodeList([event.target]);
            var nextNode;

            //on listens for the keydown events inside of the div node, on all form elements
            switch (event.keyCode) {
                case keys.UP_ARROW:
                    nextNode = node.prev("input");
                    if (nextNode[0]) {
                        //if not first element
                        nextNode[0].focus();
                        //moving the focus from the current element to the previous
                    }
                    break;
                case keys.DOWN_ARROW:
                    nextNode = node.next("input");
                    if (nextNode[0]) {
                        //if not last element
                        nextNode[0].focus();
                        //moving the focus from the current element to the next
                    }
                    break;
                case keys.HOME:
                    inputs[0].focus();
                    break;
                case keys.END:
                    inputs[inputs.length - 2].focus();
                    break;
                case keys.ENTER:
                    event.preventDefault();
                    //prevent default keeps the form from submitting when the enter button is pressed
                    //on the submit button
                    if (event.target.type !== "submit") {
                        nextNode = node.next("input");
                        if (nextNode[0]) {
                            //if not last element
                            nextNode[0].focus();
                            //moving the focus from the current element to the next
                        }
                    } else {
                        // submit the form
                        console.log("form submitted!");
                    }
                    break;
                default:
                    console.log("some other key: " + event.keyCode);
            }
        });

    }

    return {
        start: start
    };

});