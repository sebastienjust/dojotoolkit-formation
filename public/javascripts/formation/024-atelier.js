define([
    "dojo/dom", "dojo/dom-construct", "dojo/request", "dijit/form/Textbox", "dijit/form/Button"
], (
    dom, domConstruct, request, Textbox, Button
) => {
        var start = () => {
            var app = dom.byId("app")
            var firstNameInput = new Textbox({
                placeholder: 'prénom',
            }, domConstruct.create('div', {}, app))
            var lastNameInput = new Textbox({
                placeholder: 'nom',
            }, domConstruct.create('div', {}, app))
            var loginNameInput = new Textbox({
                placeholder: 'login',
            }, domConstruct.create('div', {}, app))
            var buttonsWrapper = domConstruct.create('div', {}, app)
            var buttonPrevious = new Button({ label: 'previous', 'iconClass':'dijitIconBookmark' }, domConstruct.create('span', {}, buttonsWrapper))
            var buttonNext = new Button({ label: 'next', 'iconClass':'dijitIconBookmark' }, domConstruct.create('span', {}, buttonsWrapper))
            var currentUser = 0;
            var userList = []
            request.get('/users', { handleAs: 'json' }).then(users => {
                userList = users;
                refreshForm()
            })
            buttonPrevious.on('click', () => {
                if (currentUser == 0) return;
                currentUser--
                refreshForm()
            })
            buttonNext.on('click', () => {
                if (currentUser == userList.length - 1) return;
                currentUser++
                refreshForm()
            })
            function refreshForm() {
                var user = userList[currentUser];
                firstNameInput.set({ value: user.firstname })
                lastNameInput.set({ value: user.lastname })
                loginNameInput.set({ value: user.login })
                buttonPrevious.set('disabled', currentUser == 0)
                buttonNext.set('disabled', currentUser == userList.length - 1)
            }
        }
        return { start }
    });
