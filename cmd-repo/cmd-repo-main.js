/**
 * StarUML iStandaarden Common Model Data Extension Main Module
 * 
 * Log 20-5-2025:
 * - Copied from https://repository.istandaarden.nl/dgpi/modelleren/dgpi-staruml/staruml-istd
 * - Alle overbodige code verwijderd
 * - Herstructureing naar Common Model Menu
 */

const prefsRepoMetaData = require('../repo/repo-prefs').metaData;
const prefsCmdMetaData = require('../cmd-repo/cmd-repo-prefs').metaData;
const repoUiSourceData = require('./cmd-repo-ui-source-data');

async function _handleRepoRetrieveCommonModelData() {
    const result = await repoUiSourceData.retrieve();
    app.toast.info(result);
}

async function _handleRepoStoreCommonModelData() {
    const result = await repoUiSourceData.store();
    app.toast.info(result);
}

function init() {
    app.preferences.register(prefsRepoMetaData);
    app.preferences.register(prefsCmdMetaData);
    app.commands.register('cmd:repo:retrieve:model:data', _handleRepoRetrieveCommonModelData);
    app.commands.register('cmd:repo:store:model:data', _handleRepoStoreCommonModelData);
}

exports.init = init;