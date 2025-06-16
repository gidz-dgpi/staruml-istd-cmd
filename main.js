const cmdRepoMain = require('./cmd-repo/cmd-repo-main');
const mimUmlMain = require('./mim-uml/mim-uml-main');

function init() {
    cmdRepoMain.init();
    mimUmlMain.init();
}

exports.init = init;