/**
 * GitLab Repository Api Module for StarUML Extension
 * Based on https://docs.gitlab.com/ee/api
 * 
 * Log 21-5-2025:
 * - Copied from https://repository.istandaarden.nl/dgpi/modelleren/dgpi-staruml/staruml-istd
 * - Rewrite asynchrone functions with "async" and "await" statements
 */

const axios = require('axios');
const preferenceKeys = require('./repo-prefs').keys;
const apiPath = '/api/v4';
var gitLabApi = undefined;

/**
 * Initialize Generic Axios GitLab Api Settings from StarUML Preferences
 */
function init() {
    const serverURL = app.preferences.get(preferenceKeys.repoServerURL)
    const authToken = app.preferences.get(preferenceKeys.repoAuthToken)
    const baseURL = serverURL + apiPath
    gitLabApi = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
            'PRIVATE-TOKEN': authToken
        }
    })
}

/**
 * Handling of low-level Api Error
 * @param {Error} error 
 */
function _handleApiError(error) {
    app.toast.error(error);
    throw error;
}

/**
 * Based on https://docs.gitlab.com/api/projects/#get-a-single-project
 * @param {String | Number} projectId 
 */
async function getProject(projectId) {
    const id = encodeURIComponent(projectId);
    const url = `/projects/${id}`;

    try {
        const response = await gitLabApi.get(url);
        return response;
    } catch (error) {
        _handleApiError(error);
    }
}

/**
 * Based on https://docs.gitlab.com/ee/api/branches.html#list-repository-branches
 * @param {String | Number} projectId 
 * @returns {Promise<string[]>}
 */
async function listRepoBranches(projectId) {
    const id = encodeURIComponent(projectId);
    const url = `/projects/${id}/repository/branches`;

    try {
        const response = await gitLabApi.get(url);
        return response;
    } catch (error) {
        _handleApiError(error);
    }
}

/**
 * Get the id of the group which has given namespace
 * @param {string} namespace
 * @returns {Promise<number>}
 */
async function getGroupId(namespace) {
    const url = '/groups';
    var params = {};
    params['search'] = namespace;

    try {
        const response = await gitLabApi.get(url, { params: params });
        return response.data[0].id;
    } catch (error) {
        _handleApiError(error);
    }
}

/**
 * List the projects belonging to given group (namespace)
 * Based on https://docs.gitlab.com/api/groups/#list-groups
 * @param {string} namespace
 * @returns {Promise<String[]>}
 */
async function listProjectsForGroup(namespace) {
    const groupId = await getGroupId(namespace);
    const url = '/groups/' + groupId + '/projects?pagination=keyset&per_page=100&order_by=id&sort=asc';
    var params = {};
    params['include_subgroups'] = 'true';

    try {
        const response = await gitLabApi.get(url, { params: params });
        return response;
    } catch (error) {
        _handleApiError(error);
    }
}

/**
 * Based on https://docs.gitlab.com/ee/api/repository_files.html
 * @param {String | Number} projectId 
 * @param {String} filePath 
 * @returns {encodedURI}
 */
function buildRepoFilesPath(projectId, filePath) {
    const id = encodeURIComponent(projectId)
    const ueFilePath = encodeURIComponent(filePath)
    return `/projects/${id}/repository/files/${ueFilePath}`
}

/**
 * Based on: https://docs.gitlab.com/ee/api/repository_files.html#get-file-from-repository
 * @param {String | Number} projectId 
 * @param {String} filePath 
 * @param {String} ref 
 * @returns {Promise<JB64>} JB64-formated String. Based on: https://jb64.org
 */
async function getFileFromRepo(projectId, filePath, ref) {
    const config = { params: { ref: ref } };
    const repoFilePath = buildRepoFilesPath(projectId, filePath);

    try {
        const response = await gitLabApi.get(repoFilePath, config);
        return response;
    } catch (error) {
        _handleApiError(error);
    }
}

/**
 * Based on: https://docs.gitlab.com/ee/api/repository_files.html#create-new-file-in-repository
 * @param {String | Number} projectId 
 * @param {String} branch 
 * @param {String} filePath 
 * @param {String} content 
 * @param {String} commitMessage 
 * @returns {Promise<any>} GitLab Api Response
 */
async function createNewFileInRepo(projectId, branch, filePath, content, commitMessage) {
    const data = {
        branch: branch,
        content: content,
        commit_message: commitMessage
    };
    const repoFilePath = buildRepoFilesPath(projectId, filePath);

    try {
        const response = await gitLabApi.post(repoFilePath, data);
        return response;
    } catch (error) {
        _handleApiError(error);
    }
}

/**
 * Based on: https://docs.gitlab.com/ee/api/repository_files.html#update-existing-file-in-repository
 * @param {String | Number} projectId 
 * @param {String} branch 
 * @param {String} filePath 
 * @param {String} content 
 * @param {String} commitMessage 
 * @returns {Promise<any>} GitLab Api Response
 */
async function updateExistingFileInRepo(projectId, branch, filePath, content, commitMessage) {
    const data = {
        branch: branch,
        content: content,
        commit_message: commitMessage
    };
    const repoFilePath = buildRepoFilesPath(projectId, filePath);

    try {
        const response = await gitLabApi.put(repoFilePath, data);
        return response;
    } catch (error) {
        _handleApiError(error);
    }
}

exports.init = init;
exports.getProject = getProject;
exports.listProjectsForGroup = listProjectsForGroup;
exports.listRepoBranches = listRepoBranches;
exports.getFileFromRepo = getFileFromRepo;
exports.createNewFileInRepo = createNewFileInRepo;
exports.updateExistingFileInRepo = updateExistingFileInRepo;