/**
 * StarUML Common Model Data Preferences
 * 
 * Log 19-5-2025:
 * - Created new
 */

const keys = {
    commonModelDataSlug: 'common.model.data.slug'
};

const schema = {};
schema[keys.commonModelDataSlug] = {
    text: 'Gemeenschappelijke Model Data Slug',
    description: 'Slug vanaf Model Data groep',
    type: 'string',
    default: 'common-model-data'
};
/**
 * StarUML Gemeenschappelijke Modellen Preferences Keys
 */
exports.keys = keys;
/**
 * StarUML Gemeenschappelijke Modellen Preferences Schema
 */
exports.metaData = {
    id: 'cmd-istd',
    name: 'Common Model',
    schema: schema
};