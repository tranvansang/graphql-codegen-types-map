export interface OperationsMapConfig {
    /**
     * `operationTypeTemplate` value controls which name will be used
     * to reference operations return data type (can also be imported from another file)
     *
     * in  the following example, `operationTypeTemplate` produces `VoteMutation` value:
     *
     * @example
     *  export interface OperationsMap {
     *     vote: {
     *       operationType: Types.VoteMutation; // <--- controlled by operationTypeTemplate
     *       variablesType: Types.VoteMutationVariables;
     *       kind: "mutation";
     *     };
     *   }
     * @default '{OperationName}{OperationKind}'
     */
    operationTypeTemplate: string;
    /**
     * `variablesTypeTemplate` value controls which name will be used
     * to reference variables type (can also be imported from another file)
     *
     * in  the following example, `variablesTypeTemplate` produces `VoteMutationVariables` value:
     *
     * @example
     *  export interface OperationsMap {
     *     vote: {
     *       operationType: Types.VoteMutation;
     *       variablesType: Types.VoteMutationVariables; // <--- controlled by variablesTypeTemplate
     *       kind: "mutation";
     *     };
     *   }
     * @default '{OperationName}{OperationKind}Variables'
     */
    variablesTypeTemplate: string;
    /**
     * `operationKindTemplate` value controls what String Literal value will be given
     * for the operation's `kind` type or what actual string value will be given for the
     * `documentsMap` entry.
     *
     * in  the following example, `operationKindTemplate` produces `mutation` values:
     *
     * @example
     *  export interface OperationsMap {
     *     vote: {
     *       operationType: Types.VoteMutation;
     *       variablesType: Types.VoteMutationVariables;
     *       kind: "mutation"; // <-- controlled by operationKindTemplate
     *     };
     *   }
     *
     *  export const documentsMap = {
     *      vote: {
     *        document: Types.VoteDocument,
     *        kind: "mutation" as const // <-- controlled by operationKindTemplate
     *      }
     *  };
     *
     * @default '{operationKind}'
     */
    operationKindTemplate: string;
    /**
     * configures whether to generate object `OperationsMap` interfaces
     *
     * @default true
     */
    withOperationsMap: boolean;
}
export interface DocumentsMapConfig {
    /**
     * `operationDocumentTemplate` value controls which name will be used
     * to reference document object in the `documentsMap` entry.
     *
     * in  the following example, `operationDocumentTemplate` produces `VoteDocument` value:
     *
     * @example
     *  export const documentsMap = {
     *      vote: {
     *        document: Types.VoteDocument, // <-- controlled by operationDocumentTemplate
     *        kind: "mutation" as const
     *      }
     *  };
     *
     * @default '{OperationName}{OperationKind === "Fragment" ? "FragmentDoc" : "Document"}'
     */
    operationDocumentTemplate: string;
    /**
     * configures whether to generate object `documentsMap` constant which can be used on
     * the runtime.
     *
     * @default true
     */
    withDocumentsMap: boolean;
}
export interface TypesImportConfig {
    /**
     * If value is present (non undefined), then all types will be imported
     * from another file, which is described by this template:
     *
     * `import * as ${importedTypesAlias} from '${importTypesFrom}'`
     * @example
     * import * as Types from "./gqlTypes";
     * @default undefined
     */
    importTypesFrom: string | undefined;
    /**
     * When values are imported from another file, `importedTypesAlias`
     * describes what alias will be given for the namespace.
     *
     * The following template will be used:
     *
     * `import * as ${importedTypesAlias} from '${importTypesFrom}'`
     * @example
     * import * as Types from "./gqlTypes";
     * @default 'Types'
     */
    importedTypesAlias: string;
}
export interface AllConfigOptions extends OperationsMapConfig, TypesImportConfig, DocumentsMapConfig {
}
export declare const defaultConfig: AllConfigOptions;
export declare class PrinterConfig {
    private readonly config;
    constructor(rawConfig?: Partial<AllConfigOptions>);
    get allOptions(): AllConfigOptions;
    get operationMap(): Pick<AllConfigOptions, "operationTypeTemplate" | "variablesTypeTemplate" | "operationKindTemplate" | "withOperationsMap">;
    get documentsMap(): Pick<AllConfigOptions, "operationKindTemplate" | "operationDocumentTemplate" | "withDocumentsMap">;
    get importTypes(): {
        importRef: string;
        importTypesFrom: string | undefined;
        importedTypesAlias: string;
    };
    validateConfig(): void;
    private pickConfigEntries;
}
