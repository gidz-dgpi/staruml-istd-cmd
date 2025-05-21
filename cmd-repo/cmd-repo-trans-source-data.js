/**
 * iStandaard Repository Source Data Transactions
 * 
 * Log 20-05-2025:
 * - Setup complete clean version based on existing StarUML Istd
 */

const api = require('../repo/repo-api');
const keysRepoMetaData = require('../repo/repo-prefs').keys;
const keysCmdRepoMetaData = require('../cmd-repo/cmd-repo-prefs').keys;

/**
 * Initialize Transaction Connection(s)
 */
function init() {
    api.init();
}

/**
 * Get Model Data Repositories
 * @returns {Promise<String[]>}
 */
async function getCommonModelDataRepoList() {
    const namespace = app.preferences.get(keysRepoMetaData.repoModelGroupPath) + 
        '/' + app.preferences.get(keysCmdRepoMetaData.commonModelDataSlug);
    return api.listProjectsForGroup(namespace)
        .then(response => {
            return response.data.filter(item => item.name != 'gitlab-profile')
        });
}

exports.init = init;
exports.getCommonModelDataRepoList = getCommonModelDataRepoList;
