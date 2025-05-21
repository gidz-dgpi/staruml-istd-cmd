/**
 * StarUML Gegevensmodel iStandaarden Extension Main Module
 * 
 * Log 20-5-2025:
 * - Copied from https://repository.istandaarden.nl/dgpi/modelleren/dgpi-staruml/staruml-istd
 * - Alle overbodige code verwijderd
 * - Herstructureing naar Common Model Menu
 */

const prefsRepoMetaData = require('../repo/repo-prefs').metaData;
const prefsCmdMetaData = require('../cmd-repo/cmd-repo-prefs').metaData;
const sourceData = require('./cmd-repo-source-data');

async function _handleRepoRetrieveCommonModelData() {
    await sourceData.retrieve();
}

function _handleRepoStoreCommonModelData() {
    console.log('nog te implementeren');
}

function init() {
    app.preferences.register(prefsRepoMetaData);
    app.preferences.register(prefsCmdMetaData);
    app.commands.register('cmd:repo:retrieve:model:data', _handleRepoRetrieveCommonModelData);
    app.commands.register('cmd:repo:store:model:data', _handleRepoStoreCommonModelData);
}

exports.init = init;