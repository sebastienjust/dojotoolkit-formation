define(["dojo/request", "dojo/_base/array", "dojo/dom-construct", "dojo/dom"],
    function (request, arrayUtil, domConstruct, dom) {
        const HTML = `
        <table id="userlist"></table>
        `

        function start() {
            dom.byId("app").innerHTML = HTML;
            getUserList().then(function (users) {
                var userlist = dom.byId("userlist");
                arrayUtil.forEach(users, function (user) {
                    domConstruct.create("tr", {
                        id: user.id,
                        innerHTML: `<td>${user.firstname}</td><td>${user.lastname}</td><td>${user.login}</td>`
                    }, userlist);
                });
            });

        }

        function getUserList() {
            return request.get("users", {
                handleAs: "json"
            }).then(function (response) {
                return response;
            });
        }

        return {
            start: start
        }
    });