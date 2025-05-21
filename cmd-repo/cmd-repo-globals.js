/**
 * Global Constants for Common  Model Data iStandaarden Repository
 * 
 * Log 20-5-2025:
 * - Copied from https://repository.istandaarden.nl/dgpi/modelleren/dgpi-staruml/staruml-istd
 * - Removed metData and pubData Locations
 * - Changed to adjust Common Modeldata locations
 */

/**
 * Location and Filenames Source Data Storage for Common Datamodel Repository
 */
const sourceData = {
    path: 'source-data',
    commonRootMetaDataFile: 'common-root-meta-data.mdj',
    commonModelMetaDataFile: 'common-model-meta-data.mfj',
    commonProfileMetaDataFile: 'common-profile-meta-data.mfj',
};

exports.sourceData = sourceData;
