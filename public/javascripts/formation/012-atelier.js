define([
    'dojo/_base/declare', 
    'dojo/_base/lang',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/on',
    'dojo/request',
    'dojo/topic',
    'dojo/dom-style',
    'formation/User'
], (
    declare, 
    lang,
    dom,
    domConstruct,
    on, 
    request,
    topic,
    domStyle,
    User
) => {
        // Objectif de l'atelier:
        //   Faire un tableau avec une liste de users (requete GET /users). Les noms de famille doivent être mis en majuscules.
        //   => request et deferred
        //   Chaque ligne est un objet d'une classe "formation/Utilisateur" avec nom, prénom, login et un bouton "Sélectionner"
        //   => dom cronstruct et classes
        //   Quand le bouton sélectionner est cliqué, son libellé passe à "déselectionner", mettre une couleur sur la ligne
        //   Quand le bouton déselectionner est cliqué, revenir à l'état sélectionner et enlever la couleur
        //   => utiliser on()
        //   Créer une zone de texte avec "Bonjour <prenom> <nom>!" pour la personne sélectionnée, ou le message "Sélectionnez une personne"
        //   => utiliser topic

        var start = () => {
            var app = dom.byId("app")
            var usersTableWrapper = domConstruct.create('table', {}, app)
            var logsWrapper = domConstruct.create('div', {}, app);
            
            request.get('/users', { handleAs: 'json' }).then(response => {

                // table.map(function(item){ return item; })
                // table.map(item => { return item; })
                // table.map(item => (item) )
                // t1= {a:1, b:2, c:3} {...t1, b:2}

                response.map(u => ({...u, lastname:u.lastname.toUpperCase()})).forEach(user => {
                    console.log(user)
                    var userWidget = new User({ user: user, parentNode: usersTableWrapper });
                    
                    userWidget.start();
                })
            })
            topic.subscribe('message', (user) => {
                domConstruct.create('div', { innerHTML: `Bonjour ${user.firstname} ${user.lastname}` }, logsWrapper)
            })

        }
        return { start }
    });
