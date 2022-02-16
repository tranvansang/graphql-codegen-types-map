import { validateOperationsTemplate } from './expandTemplate'
import merge from 'lodash.merge'
import { pickKeys, KeysObj } from '~/utils'

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
  operationTypeTemplate: string
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
  variablesTypeTemplate: string
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
  operationKindTemplate: string

  /**
   * configures whether to generate object `OperationsMap` interfaces
   *
   * @default true
   */
  withOperationsMap: boolean
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
  operationDocumentTemplate: string

  /**
   * configures whether to generate object `documentsMap` constant which can be used on
   * the runtime.
   *
   * @default true
   */
  withDocumentsMap: boolean
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
  importTypesFrom: string | undefined
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
  importedTypesAlias: string
}

export interface AllConfigOptions extends OperationsMapConfig, TypesImportConfig, DocumentsMapConfig {}

export const defaultConfig: AllConfigOptions = {
  // Operations Map values:
  operationTypeTemplate: '{OperationName}{OperationKind}',
  variablesTypeTemplate: '{OperationName}{OperationKind}Variables',
  operationKindTemplate: '{operationKind}',
  withOperationsMap: true,

  // Documents Map values:
  withDocumentsMap: true,
  operationDocumentTemplate: '{OperationName}{OperationKind === "Fragment" ? "FragmentDoc" : "Document"}',

  // Import Types from values:
  importedTypesAlias: 'Types',
  importTypesFrom: undefined,
}

const operationsMapConfigKeysObs: KeysObj<keyof OperationsMapConfig> = {
  operationKindTemplate: null,
  operationTypeTemplate: null,
  variablesTypeTemplate: null,
  withOperationsMap: null,
}

const documentsMapConfigKeysObs: KeysObj<keyof (DocumentsMapConfig &
  Pick<OperationsMapConfig, 'operationKindTemplate'>)> = {
  operationDocumentTemplate: null,
  withDocumentsMap: null,
  operationKindTemplate: null,
}

const typesImportConfigKeysObs: KeysObj<keyof TypesImportConfig> = {
  importTypesFrom: null,
  importedTypesAlias: null,
}

export class PrinterConfig {
  private readonly config: AllConfigOptions

  constructor(rawConfig: Partial<AllConfigOptions> = {}) {
    this.config = merge(defaultConfig, rawConfig)
  }

  get allOptions() {
    return this.config
  }

  get operationMap() {
    return this.pickConfigEntries(operationsMapConfigKeysObs)
  }

  get documentsMap() {
    return this.pickConfigEntries(documentsMapConfigKeysObs)
  }

  get importTypes() {
    const config = this.pickConfigEntries(typesImportConfigKeysObs)
    const importRef = config.importTypesFrom ? `${config.importedTypesAlias}.` : ''
    return { ...config, importRef }
  }

  validateConfig() {
    const { operationKindTemplate, variablesTypeTemplate, operationTypeTemplate } = this.operationMap
    validateOperationsTemplate(operationKindTemplate, variablesTypeTemplate, operationTypeTemplate)
    validateOperationsTemplate(this.documentsMap.operationDocumentTemplate)
  }

  private pickConfigEntries = <T extends keyof AllConfigOptions>(pick: KeysObj<T>) =>
    pickKeys<T, AllConfigOptions>(this.config, pick)
}
