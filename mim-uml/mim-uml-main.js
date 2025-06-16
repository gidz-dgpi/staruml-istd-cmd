/**
 * StarUML iStandaarden Common Model Data Extension Main Module
 * 
 * Log 6-6-2025:
 * - Setup initial
 */

const mimUmlFactory = require('./mim-uml-factory');

function _handleCreateObjecttype(args) {
    mimUmlFactory.createObjecttype(args);
}

function _handleAddAttribuut(args) {
    mimUmlFactory.addAttribuut(args);
}

function _handleCreateKeuze(args) {
    mimUmlFactory.createKeuze(args);
}

async function _handleAddKeuze(args) {
    await mimUmlFactory.addKeuze(args);
}

function _handleCreateRelatiesoort(args) {
    mimUmlFactory.createRelatiesoort(args);
}

function _handleCreateDirectedRelatiesoort(args) {
    mimUmlFactory.createDirectedRelatiesoort(args);
}

function _handleCreateGeneralisatie(args) {
    mimUmlFactory.createGeneralisatie(args);
}

function init() {
    app.commands.register('mim:uml:create:objecttype', _handleCreateObjecttype);
    app.commands.register('mim:uml:add:attribuut', _handleAddAttribuut);
    app.commands.register('mim:uml:create:keuze', _handleCreateKeuze);
    app.commands.register('mim:uml:add:keuze', _handleAddKeuze);
    app.commands.register('mim:uml:create:relatiesoort', _handleCreateRelatiesoort);
    app.commands.register('mim:uml:create:directed_relatiesoort', _handleCreateDirectedRelatiesoort);
    app.commands.register('mim:uml:create:generalisatie', _handleCreateGeneralisatie);
    console.log(app.factory.getModelIds());
    console.log(app.contextMenu)
    console.log(app.toolbox)


}

exports.init = init;