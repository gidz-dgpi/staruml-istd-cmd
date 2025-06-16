/**
 * MIM UML Model Meta-data and View Factories
 * 
 * Log 6-6-2025:
 * - Setup initial
 */

/**
 * Get StereoType Reference from current MIM-profile
 * @param {string} name Name of the MIM StereoType Reference 
 */
function getStereoTypeRef(name) {
    const stereoTypes = app.repository.select(`@UMLStereotype[name=${name}]`);

    if (stereoTypes.length == 1) {
        return stereoTypes[0];
    } else if (stereoTypes.length > 1) {
        app.toast.error(`Twee of meer "Stereotypen" met de naam "${name}" gevonden!`);
        return undefined;
    } else {
        app.toast.error(`Geen "Stereotype" met de naam "${name}" gevonden!`);
        return undefined;
    }

}

/**
 * Create MIM 1.2 UML `<<Objecttype>>` Model and View
 * @argument args
 * @returns {UMLClass}
 */
function createObjecttype(args) {
    const stereoTypeRef = getStereoTypeRef('Objecttype');

    if (stereoTypeRef) {
        const createOptions = {
            'model-init': {
                stereotype: stereoTypeRef,
                name: 'ObjecttypeNew',
            },
            'view-init': {
                stereotypeDisplay: 'label',
                suppressOperations: true,
            }
        };


        options = Object.assign(args, createOptions);
        return app.factory.createModelAndView(options)
    } 

}

/**
 * Add MIM 1.2 UML `<<Attribuutsoort>>` Model to selected `<<Objecttype>>`
 * @argument args
 * @returns {UMLAttribute}
 */
function addAttribuut(args) {
    const selectedModel = app.selections.getSelected();

    if ((selectedModel instanceof type.UMLClass) && (selectedModel.stereotype.name == 'Objecttype')) {
        const stereoTypeRef = getStereoTypeRef('Attribuutsoort');

        if (stereoTypeRef) {
            const options = {
                id: args.id,
                parent: selectedModel,
                field: args.field,
                modelInitializer: (attribuut) => {
                    attribuut.name = 'attribuutNew';
                    attribuut.stereotype = stereoTypeRef;
                }
            }
                
            return app.factory.createModel(options)
        } 

    }

}

/**
 * Create MIM 1.2 UML `<<Keuze>>` Model and View
 * @argument args
 * @returns {UMLClass}
 */
function createKeuze(args) {
    const stereoTypeRef = getStereoTypeRef('Keuze');

    if (stereoTypeRef) {

        const createOptions = {
            'model-init': {
                stereotype: stereoTypeRef,
                name: 'KeuzeNew',
            },
            'view-init': {
                stereotypeDisplay: 'label',
                suppressOperations: true,
            }
        };


        options = Object.assign(args, createOptions);
        return app.factory.createModelAndView(options)
    } 

}

/**
 * Add MIM 1.2 UML `<<Keuze>>` Model to selected `<<Objecttype>>`
 * @argument args
 * @returns {Promise<UMLAttribute> | Promise<void>}
 */
async function addKeuze(args) {
    const selectedModel = app.selections.getSelected();

    if ((selectedModel instanceof type.UMLClass) && (selectedModel.stereotype.name == 'Objecttype')) {
        const stereoTypeRef = getStereoTypeRef('Keuze');
        const classList = app.repository.select('@UMLClass');
        console.log(classList);
        const keuzes = classList.filter(value => value.stereotype === stereoTypeRef);
        console.log(keuzes);

        const response = await app.elementListPickerDialog.showDialog('Selecteer een <<Keuze>>', keuzes);
        console.log(response);
        const keuzeType = response.returnValue;

        if (stereoTypeRef) {
            const options = {
                id: args.id,
                parent: selectedModel,
                field: args.field,
                modelInitializer: (keuze) => {
                    keuze.name = 'attribuutNew';
                    keuze.stereotype = stereoTypeRef;
                    keuze.type = keuzeType;
                }
            }
                
            return app.factory.createModel(options)
        } 

    }

}

/**
 * Create MIM 1.2 UML `<<Relatiesoort>>` Model and View
 * @argument args
 * @returns {UMLAssociation}
 */
function createRelatiesoort(args) {
    const stereoTypeRef = getStereoTypeRef('Relatiesoort');

    if (stereoTypeRef) {
        const createOptions = {
            'model-init': {
                stereotype: stereoTypeRef,
                name: 'RelatiesoortNew',
            },
            'view-init': {
                stereotypeDisplay: 'label',
                suppressOperations: true,
            }
        };


        options = Object.assign(args, createOptions);
        return app.factory.createModelAndView(options)
    }
}

/**
 * Create MIM 1.2 UML Directed `<<Relatiesoort>>` Model and View
 * @argument args
 * @returns {UMLAssociation}
 */
function createDirectedRelatiesoort(args) {
    const stereoTypeRef = getStereoTypeRef('Relatiesoort');

    if (stereoTypeRef) {
        const createOptions = {
            'model-init': {
                stereotype: stereoTypeRef,
                name: 'DirectedRelatiesoortNew',
                end2: {
                    navigable: 'navigable',
                },
            },
            'view-init': {
                stereotypeDisplay: 'label',
                suppressOperations: true,
            }
        };

        options = Object.assign(args, createOptions);
        return app.factory.createModelAndView(options)
    }

}

/**
 * Create MIM 1.2 UML `<<Generalisatie>>` Model and View
 * @argument args
 * @returns {UMLGeneralization}
 */
function createGeneralisatie(args) {
    const stereoTypeRef = getStereoTypeRef('Generalisatie');

    if (stereoTypeRef) {
        const createOptions = {
            'model-init': {
                stereotype: stereoTypeRef,
                name: 'subtype',
            },
            'view-init': {
                stereotypeDisplay: 'label',
                suppressOperations: true,
            }
        };

        options = Object.assign(args, createOptions);
        return app.factory.createModelAndView(options)
    }

}

exports.createObjecttype = createObjecttype;
exports.addAttribuut = addAttribuut;
exports.createKeuze = createKeuze;
exports.addKeuze = addKeuze;
exports.createRelatiesoort = createRelatiesoort;
exports.createDirectedRelatiesoort = createDirectedRelatiesoort;
exports.createGeneralisatie = createGeneralisatie;