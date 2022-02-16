import { expandTemplate, OperationTemplateVariables } from './expandTemplate'
import { PrinterConfig } from './config'
import { OperationsParser, DefinitionType } from '~/plugin'
import { Types } from '@graphql-codegen/plugin-helpers'
import { LazyGetter as Lazy } from 'lazy-get-decorator'

const emptyOutput: Types.ComplexPluginOutput = { content: '' }

const mergeOutputs = (separator = '\n', ...outputs: Types.ComplexPluginOutput[]) => {
  const content = outputs.map(x => x.content).join(separator)

  let prepend: string[] = []
  let append: string[] = []

  for (const output of outputs) {
    append = [...(output.append || []), ...append]
    prepend = [...prepend, ...(output.prepend || [])]
  }

  return { prepend, append, content }
}

export class OperationsMapPrinter {
  constructor(readonly parser: OperationsParser, readonly config: PrinterConfig) {}

  @Lazy()
  get commonPrependItems(): Types.ComplexPluginOutput {
    const { importTypesFrom, importedTypesAlias } = this.config.importTypes

    const prepend = [importTypesFrom && `import * as ${importedTypesAlias} from '${importTypesFrom}'`].filter(
      x => !!x
    ) as string[]

    return { content: '', prepend }
  }

  @Lazy()
  get allContent(): Types.ComplexPluginOutput {
    const { withDocumentsMap, withOperationsMap } = this.config.allOptions

    return mergeOutputs(
      '\n\n',
      this.commonPrependItems,
      withOperationsMap ? this.operationsMapInterface : emptyOutput,
      withDocumentsMap ? this.documentsMap : emptyOutput
    )
  }

  @Lazy()
  get documentsMap(): Types.ComplexPluginOutput {
    const names: { [kind in DefinitionType['kind']]: string } = {
      fragment: 'fragmentsDocumentMap',
      subscription: 'subscriptionsDocumentMap',
      mutation: 'mutationsDocumentMap',
      query: 'queriesDocumentMap',
    }

    const fields = Object.values(names)
      .map(x => `...${x}`)
      .join(',\n  ')

    const content = [
      ...Object.entries(names).map(([kind, name]) =>
        this.getDocumentsMap(name, kind as DefinitionType['kind'])
      ),

      `export const documentsMap = {\n  ${fields}\n}`,
    ].join('\n\n')

    return { content }
  }

  private getDocumentsMap = (constantName: string, definitionsKind: DefinitionType['kind']) => {
    const { parser, config } = this
    const { allDefinitions } = parser

    const { operationDocumentTemplate, operationKindTemplate } = config.documentsMap
    const { importRef } = config.importTypes

    const definitions = allDefinitions.filter(x => x.kind === definitionsKind)

    const fields = definitions
      .map(definition => {
        const variables: OperationTemplateVariables = {
          operationName: definition.name,
          operationKind: definition.kind,
        }
        const expand = (template: string) => expandTemplate(template, variables)

        const fields = [
          `document: ${importRef}${expand(operationDocumentTemplate)}`,
          `kind: '${expand(operationKindTemplate)}' as const`,
        ]

        return `'${definition.name}': { ${fields.filter(x => !!x).join(', ')} }`
      })
      .join(',\n  ')

    return `export const ${constantName} = {\n  ${fields}\n}`
  }

  @Lazy()
  get operationsMapInterface(): Types.ComplexPluginOutput {
    const content = [
      this.getOperationsMapInterface('FragmentsMap', 'fragment'),
      this.getOperationsMapInterface('MutationsMap', 'mutation'),
      this.getOperationsMapInterface('QueriesMap', 'query'),
      this.getOperationsMapInterface('SubscriptionsMap', 'subscription'),
      `export interface OperationsMap extends FragmentsMap, MutationsMap, QueriesMap, SubscriptionsMap { }`,
    ].join('\n\n')

    return { content }
  }

  private getOperationsMapInterface = (interfaceName: string, definitionsKind: DefinitionType['kind']) => {
    const { parser, config } = this
    const { importRef } = config.importTypes
    const { allDefinitions } = parser
    const { operationKindTemplate, operationTypeTemplate, variablesTypeTemplate } = config.operationMap

    const definitions = allDefinitions.filter(x => x.kind === definitionsKind)

    const fields = definitions
      .map(definition => {
        const variables: OperationTemplateVariables = {
          operationName: definition.name,
          operationKind: definition.kind,
        }
        const expand = (template: string) => expandTemplate(template, variables)

        const fields = [
          `operationType: ${importRef}${expand(operationTypeTemplate)}`,
          `variablesType: ${
            definition.kind === 'fragment' ? '{}' : importRef + expand(variablesTypeTemplate)
          }`,
          `kind: '${expand(operationKindTemplate)}'`,
        ]

        return `'${definition.name}': { ${fields.filter(x => !!x).join(', ')} }`
      })
      .join('\n  ')

    return `export interface ${interfaceName} {\n  ${fields}\n}`
  }
}
