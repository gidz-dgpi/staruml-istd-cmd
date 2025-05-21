/**
 * Log 19-5-2025:
 * - Copied from https://repository.istandaarden.nl/dgpi/modelleren/dgpi-staruml/staruml-istd
 * - Romoved XSD related functions
 */

/**
 * Get UMLPackage Element that matches the name
 * @param {Array} elements 
 * @param {String} name 
 * @returns {UMLPackage | undefined}
 */
function getUMLPackagElementByName(elements, name) {
    return elements.find(element => (element.name == name) && (element instanceof type.UMLPackage))
}

/**
 * Get UMLClass Element that matches the name
 * @param {Array} elements 
 * @param {String} name 
 * @returns {UMLClass | undefined}
 */
function getUMLClassElementByName(elements, name) {
    return elements.find(element => (element.name == name) && (element instanceof type.UMLClass))
}

/**
 * Get UMLDataType from Gegevensmodel Package
 * @param {UMLPackage} gegevensModelPkg 
 * @param {String} attrDataTypeName 
 * @returns {UMLDataType | undefined}
 */
function getUMLDataType(gegevensModelPkg, attrDataTypeName) {
    return gegevensModelPkg.ownedElements.find(element => element._type = 'UMLDataType' && element.name == attrDataTypeName)
}

/**
 * Add a String Type Tag to a Project or UMLObjectType
 * @param {UMLObjectType} parent 
 * @param {String} tagName 
 * @param {String} tagValue 
 * @returns {Tag}
 */
function addStringTag(parent, tagName, tagValue) {
    return app.factory.createModel({
        id: "Tag",
        parent: parent,
        field: "tags",
        modelInitializer: tag => {
            tag.name = tagName
            tag.kind = type.Tag.TK_STRING; // or TK_BOOLEAN, TK_NUMBER, TK_REFERENCE, TK_HIDDEN
            tag.value = tagValue
            // tag.checked = true; // for TK_BOOLEAN
            // tag.number = 100; // for TK_NUMBER
            // tag.reference = ...; // for TK_REFERENCE
        }
    })
}

/**
 * Get the Value from a Tag
 * @param {UMLObjectType} parent 
 * @param {String} tagName 
 * @returns {Object | undefined}
 */
function getTagValue(parent, tagName) {
    const tag = parent.tags.find(tag => tag.name == tagName)
    return tag ? tag.value : undefined
}

/**
 * Encode Base64 String with JSON to a JavaScript Object
 * @param {String} base64JsonStr as JavaScript
 * @returns {Object}
 */
function encodeBase64JsonStrToObj(base64JsonStr) {
    return JSON.parse(atob(base64JsonStr))
}

/**
 * Nice formatted String from JavaScript JSON Object
 * @param {Object} json 
 * @returns {String}
 */
function jsonToString(json) {
    return JSON.stringify(json, null, '\t')
}

exports = {
    getUMLPackagElementByName,
    getUMLClassElementByName,
    getUMLDataType,
    addStringTag,
    getTagValue,
    encodeBase64JsonStrToObj,
    jsonToString,
}