/**
 * StarUML iStandaard Source Data Repository User Interaction Functions
 * 
 * Log 20-05-2025
 * - Setup complete clean version based on existing StarUML Istd
 * 
 */

const trans = require('./cmd-repo-trans-source-data');

/**
 * Build Repository Selection Options from Repo List
 * @param {{id: number, name: string}[]} repoList
 * @returns {{text: string, value: string}[]}
 */
function buildRepoOptions(repoList) {
    const repoOptions = [];

    for (const repo of repoList) {
        repoOptions.push({
            text: repo.name,
            value: String(repo.id)
        });
    }

    return repoOptions;
}

/**
 * Get Branche Options from Branche List
 * @param {String[]} brancheList 
 * @returns {{text: string, value: string}[]}
 */
function getBrancheOptions(brancheList) {
    const brancheOptions = []

    for (const branch of brancheList) {
        brancheOptions.push({
            text: branch.name,
            value: branch.name
        })
    }

    return brancheOptions
}

/**
 * Retrieve StarUML Source Data from Repository
 * @returns {Promise<string>} result message
 */
async function retrieve() {
    // Initialize transaction
    trans.init();

    // (0) Get available Model Data Repos
    const repoList = await trans.getCommonModelDataRepoList();

    if (repoList.length == 0 | repoList == undefined) {
        return 'Geen Model Data repository gevonden!!';
    }

    // (1.a) Select a Model Data Repo
    const repoOptions = buildRepoOptions(repoList);
    const repoSelected = await app.dialogs.showSelectDropdownDialog(
        'Selecteer een Model Data repository.',
        repoOptions);

    if (repoSelected.buttonId != 'ok') {
        return 'Geen Model Data repository geselecteerd!!';
    }

    // (1.b) Select a Work Branche
    const SelectedRepoOption = repoOptions.find(item => item.value == repoSelected.returnValue);
    const projectId = SelectedRepoOption.value;
    const projectName = SelectedRepoOption.text;
    const workBrancheList = await trans.getWorkBranches(projectId);

    if (workBrancheList.length == 0 | workBrancheList == undefined) {
        return 'Geen (non-protected) werk-branches beschikbaar!';
    }

    const brancheOptions = getBrancheOptions(workBrancheList);
    const branchSelected = await app.dialogs.showSelectDropdownDialog(
        `Selecteer "werk-branche" in repo "${projectName}"`,
        brancheOptions);

    if (branchSelected.buttonId != 'ok') {
        return 'Geen werk-branche geselecteerd!';
    }

    const branch = branchSelected.returnValue;

    // (2) Load Common Data
    const root = await trans.loadCommonRootData(projectId, branch);
    const profile = await trans.importCommonProfileData(root, projectId, branch);
    const model = await trans.importCommonModelData(root, projectId, branch);

    return `Project met Model and Profile opgehaald van repository ${projectName} / branch ${branch}`;
}

/**
 * Store StarUML Source Data in the Repository
 * @param commitMessage {string}
 * @returns {Promise<string>} result message
 */
async function store() {
    // Initialize transaction
    trans.init();

    // Specify commit message
    const dialogResult = await app.dialogs.showInputDialog('Geef commit message op:', 'Updating Common Data Project');
    const commitMessage = dialogResult.returnValue.trim();

    if (commitMessage.length == 0 || dialogResult.buttonId != 'ok') {
        return 'De commit message mag niet leeg zijn!'
    }

    // Update Common Project Data
    const projectData = await trans.getProjectData();

    if (projectData.status != 200) {
        return `Ophalen project-data is gefaalt!`;
    }

    const jsonContent = trans.buildJsonContent(projectData.root);
    const rootUpdateResponse = await trans.updateCommonRootData(jsonContent, projectData.projectId, projectData.branch, commitMessage);

    if (rootUpdateResponse.status != 200) {
        console.log(rootUpdateResponse);
        return `Bewaren Project Root Data in Repository gefaald! Foutmelding: ${rootUpdateResponse.status}-${rootUpdateResponse.statusText}`
    }

    const modelUpdateResponse = await trans.updateCommonModelData(jsonContent, projectData.projectId, projectData.branch, commitMessage);

    if (modelUpdateResponse.status != 200) {
        console.log(modelUpdateResponse);
        return `Bewaren UML Model Data in Repository gefaald! Foutmelding: ${modelUpdateResponse.status}-${modelUpdateResponse.statusText}`
    }

    const profileUpdateResponse = await trans.updateCommonProfileData(jsonContent, projectData.projectId, projectData.branch, commitMessage);

    if (profileUpdateResponse.status != 200) {
        console.log(profileUpdateResponse);
        return `Bewaren UML Profile Data in Repository gefaald! Foutmelding: ${profileUpdateResponse.status}-${profileUpdateResponse.statusText}`
    }

    return `Laatste wijzigingen van Project met Model and Profile bewaard in repository "${projectData.projectNameWithNameSpace}" / branch "${projectData.branch}"`;
}

exports.retrieve = retrieve;
exports.store = store;