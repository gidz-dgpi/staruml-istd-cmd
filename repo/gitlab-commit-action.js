/**
 * Class for a GitLab Commits API action item
 * 
 * Log 19-5-2025:
 * - Copied from https://repository.istandaarden.nl/dgpi/modelleren/dgpi-staruml/staruml-istd
 */
class GitLabCommitAction {
    /**
     * The path to the file to include in the commit
     */
    filePath;
    /**
     * The new content of the file
     */
    content;
    /**
     * The action to perform on this file
     */
    action;

    /**
     * Creates a new GitLabCommitAction
     * @param {String} filePath 
     * @param {String} action 
     * @param {*} content 
     */
    constructor(filePath, action, content) {
        this.filePath = filePath;
        this.content = content;
        this.action = action
    }
}

exports.GitLabCommitAction = GitLabCommitAction;