/**
 * iStandaard Repository Source Data Transaction Functions
 * 
 * Log 20-05-2025:
 * - Setup complete clean version based on existing StarUML Istd
 */

const path = require('path');
const cwd = require('process').cwd;
const readFileSync = require('fs').readFileSync;
const utils = require('../cmd-dgpi/cmd-dgpi-utils');
const api = require('../repo/repo-api');
const keysRepoMetaData = require('../repo/repo-prefs').keys;
const keysCmdRepoMetaData = require('../cmd-repo/cmd-repo-prefs').keys;
const sourceData = require('./cmd-repo-globals').sourceData;

const PROJECT_ID_TAG = 'projectId';
const BRANCH_TAG = 'branch';

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
    const response = await api.listProjectsForGroup(namespace);
    return response.data.filter(item => item.name != 'gitlab-profile');
}

/**
 * Get available Work Branches
 * @param {String | Number} projectId 
 * @returns {Promise<String[]>}
 */
async function getWorkBranches(projectId) {
    const response = await api.listRepoBranches(projectId);
    return response.data.filter(item => !item.protected);
}

/**
 * Load Common Root Data from Repository / Branch
 * @param {String | Number} projectId 
 * @param {String} branch
 * 
 * @returns {Project} root
 */
async function loadCommonRootData(projectId, branch) {
    // get root content from repo / branch
    const filePath = `${sourceData.path}/${sourceData.commonRootDataFile}`;
    const response = await api.getFileFromRepo(projectId, filePath, branch);
    const json = utils.encodeJB64ToObj(response.data.content);
    // load application root object
    const root = app.project.loadFromJson(json);
    // add Tags that are used to keep repository storage locations info
    utils.addStringTag(root, PROJECT_ID_TAG, projectId)
    utils.addStringTag(root, BRANCH_TAG, branch)
    return root;
}

/**
 * Import Model Data from Repository / Branch
 * @param {Project} root
 * @param {String | Number} projectId 
 * @param {String} branch
 * 
 * @returns {UMLModel} model
 */
async function importCommonModelData(root, projectId, branch) {
    // get model content from repo / branch
    const filePath = `${sourceData.path}/${sourceData.commonModelDataFile}`;
    const response = await api.getFileFromRepo(projectId, filePath, branch);
    const json = utils.encodeJB64ToObj(response.data.content);
    // load application root object
    const model = app.project.importFromJson(root, json);
    return model;
}

/**
 * Import Profile Data from Repository / Branch
 * @param {Project} root
 * @param {String | Number} projectId 
 * @param {String} branch
 * 
 * @returns {UMLProfile} profile
 */
async function importCommonProfileData(root, projectId, branch) {
    // get profile content from repo / branch
    const filePath = `${sourceData.path}/${sourceData.commonProfileDataFile}`;
    const response = await api.getFileFromRepo(projectId, filePath, branch);
    const json = utils.encodeJB64ToObj(response.data.content);
    // load application root object
    const profile = app.project.importFromJson(root, json);
    return profile;
}

/**
 * Update Common Root Data in Repository / branch
 * @param {Object} jsonContent Javascript Object in StarUML Project Export format
 * @param {string | number} projectId 
 * @param {string} branch 
 * @param {string} commitMessage 
 */
async function updateCommonRootData(jsonContent, projectId, branch, commitMessage) {
    const jsonRootContent = {};

    for (const key in jsonContent) {

        if (key != 'tags' && key != 'ownedElements') {
            jsonRootContent[key] = jsonContent[key];
        }

    }
    
    const content = utils.jsonToString(jsonRootContent);
    const filePath = `${sourceData.path}/${sourceData.commonRootDataFile}`;
    const response = await api.updateExistingFileInRepo(projectId, branch, filePath, content, commitMessage);
    return response;
}

/**
 * Update Common Model Data in Repository / branch
 * @param {Object} jsonContent Javascript Object in StarUML Project Export format
 * @param {string | number} projectId 
 * @param {string} branch 
 * @param {string} commitMessage 
 */
async function updateCommonModelData(jsonContent, projectId, branch, commitMessage) {
    const jsonModelContent = jsonContent.ownedElements.find(element => element._type == 'UMLModel');
    const content = utils.jsonToString(jsonModelContent);
    const filePath = `${sourceData.path}/${sourceData.commonModelDataFile}`;
    const response = await api.updateExistingFileInRepo(projectId, branch, filePath, content, commitMessage);
    return response;
}

/**
 * Update Common Profile Data in Repository / branch
 * @param {Object} jsonContent Javascript Object in StarUML Project Export format
 * @param {string | number} projectId 
 * @param {string} branch 
 * @param {string} commitMessage 
 */
async function updateCommonProfileData(jsonContent, projectId, branch, commitMessage) {
    const jsonProfileContent = jsonContent.ownedElements.find(element => element._type == 'UMLProfile');
    const content = utils.jsonToString(jsonProfileContent);
    const filePath = `${sourceData.path}/${sourceData.commonProfileDataFile}`;
    const response = await api.updateExistingFileInRepo(projectId, branch, filePath, content, commitMessage);
    return response;
}

/**
 * Build JSON Javascript Object from Project root
 * @param {Project} root 
 * @returns {Object} Javascript Object in StarUML Project Export format
 */
function buildJsonContent(root) {
    const tempProjectFile = path.join(__dirname, '..', 'temp', 'temp.mdj');
    //console.log(tempProjectFile);
    app.project.exportToFile(root, tempProjectFile);
    const jsonContent = JSON.parse(readFileSync(tempProjectFile, 'utf-8'));
    //console.log(jsonContent);
    return jsonContent;
} 

/**
 * Get Data and Repo Config
 * @returns {{root: Project, projectId: string, branch: string}}
 */
function getProjectData() {
    const root = app.project.getProject();
    return {
        root: root,
        projectId: utils.getTagValue(root, PROJECT_ID_TAG),
        branch: utils.getTagValue(root, BRANCH_TAG)
    }
}

exports.init = init;
exports.getCommonModelDataRepoList = getCommonModelDataRepoList;
exports.getWorkBranches = getWorkBranches;
exports.loadCommonRootData = loadCommonRootData;
exports.importCommonModelData = importCommonModelData;
exports.importCommonProfileData = importCommonProfileData;
exports.updateCommonRootData = updateCommonRootData;
exports.updateCommonModelData = updateCommonModelData;
exports.updateCommonProfileData = updateCommonProfileData;
exports.getProjectData = getProjectData;
exports.buildJsonContent = buildJsonContent;