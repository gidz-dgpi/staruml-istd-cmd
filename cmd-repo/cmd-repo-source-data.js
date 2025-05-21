/**
 * StarUML iStandaard Source Data Repository Functions
 * 
 * Log 20-05-2025
 * - Setup complete clean version based on existing StarUML Istd
 * 
 */

const trans = require('./cmd-repo-trans-source-data');

/**
 * Get Repository Selection Options from Repo List
 * @param {String[]} repoList
 */
function getRepoOptions(repoList) {
    const repoOptions = []

    for (let i = 0; i < repoList.length; i++) {
        repoOptions.push({
            text: String(repoList[i].name),
            value: String(repoList[i].id)
        })
    }

    return repoOptions
}

/**
 * Select a Model Data Repo Option
 * @param {{text: string, value: string}[]} options 
 * @returns {Promise<dialog>}
 */
async function selectModelDataRepo(options) {
    return app.dialogs.showSelectDropdownDialog(
        'Selecteer een Model Data repository.',
        options)
}

/**
 * Retrieve StarUML Source Meta Data from Repository
 */
async function retrieveSourceDataFromRepo() {
    // Initialize process vars
    let modelDataRepoOptions = [];
    let modelDataRepoSelection = {
        id: undefined,
        name: undefined,
        branch: undefined,
    };
    let metaModelRoot = undefined;
    trans.init();

    const modelDataRepoList = await trans.getCommonModelDataRepoList();
    console.log(modelDataRepoList);
}

exports.retrieve = retrieveSourceDataFromRepo;