# GraphQL Codegen Types Map

## Description

This package is a plugin for the [graphql-code-generator](https://graphql-code-generator.com/) which lists all known operations and fragment entries in:
- _TypeScript interface_, linking operation's `name` with:
  - kind (`subscription`, `mutation`, `query`, `fragment`)
  - variables type
  - return data type
- [_optionally_] _constant object_ (which can be used at runtime), linking operation's `name` with:
  - kind (`subscription`, `mutation`, `query`, `fragment`),
  - reference to corresponding DocumentNode.

where these constructs can be used as a building blocks to link all the context about a single operation/fragment just by its name.

## codegen.yml

see working example of `codegen.yml` at [packages/graphql-codegen-types-map-test/codegen.yml](https://github.com/lukaskl/graphql-codegen-types-map/blob/master/packages/graphql-codegen-types-map-test/codegen.yml)

```yml
overwrite: true
schema:
  - './githunt/schema.gql'
documents:
  - './githunt/**/*.graphql'

generates:
  ...
  generated/operationsMap.ts:
    hooks:
      afterOneFileWrite:
        - prettier --write
    config:
      operationsMap:
          operationTypeTemplate: "{OperationName}{OperationKind}"
          variablesTypeTemplate: '{OperationName}{OperationKind}Variables'
          operationKindTemplate: '{operationKind}'
          operationDocumentTemplate: '{OperationName}'
          importTypesFrom: './gqlTypes'
    plugins:
      - add: '/* eslint-disable */'
      - 'graphql-codegen-types-map'
```

### Config

You can see more about each of the config value at [config.ts](https://github.com/lukaskl/graphql-codegen-types-map/blob/master/packages/graphql-codegen-types-map/src/plugin/printer/config.ts)

| config                      | description                                                                                                                                              |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `withOperationsMap`         | configures whether to generate object `OperationsMap` interfaces.                                                                                        |
| `operationTypeTemplate`     | controls which name will be used to reference operations return data type (can also be imported from another file)                                       |
| `variablesTypeTemplate`     | controls which name will be used to reference variables type (can also be imported from another file)                                                    |
| `operationKindTemplate`     | controls what string literal value will be given for the operation's `kind` type or what actual string value will be given for the `documentsMap` entry. |
| `operationDocumentTemplate` | controls which name will be used to reference document object in the `documentsMap` entry                                                                |
| `withDocumentsMap`          | configures whether to generate object `documentsMap` constant which can be used on the runtime.                                                          |
| `importTypesFrom`           | If value is present (non `undefined`), then all types will be imported from this given location.                                                         |
| `importedTypesAlias`        | When values are imported from another file, `importedTypesAlias` describes what alias will be given for the namespace.                                   |


defaults of these values are:

```ts
withOperationsMap: true
operationTypeTemplate: '{OperationName}{OperationKind}'
variablesTypeTemplate: '{OperationName}{OperationKind}Variables'
operationKindTemplate: '{operationKind}'
operationDocumentTemplate: '{OperationName}{OperationKind === "Fragment" ? "FragmentDoc" : "Document"}'
withDocumentsMap: true
importTypesFrom: undefined
importedTypesAlias: 'Types'
```

### Templates

Templates (all the config values which end with suffix Template) are JavaScript literals (just `${` is replaced with `{` for compatibility with other file types, such as `.json`, `.yml`) and a few extra values are in the context, such as:
 - variables:
   - `operationKind` - kind (`subscription`, `mutation`, `query`, `fragment`) of the operation
   - `operationName` - name of the operation
   - `OperationKind` - pascalCase of the operationKind
   - `OperationName` - pascalCase of the operationName
 - casing functions provided by the [change-case](https://www.npmjs.com/package/change-case) NPM package.


---

## Example generated code

### Example Operations map types

```ts
/* eslint-disable */
import * as Types from "./gqlTypes";

export interface QueriesMap {
  getComment: {
    operationType: Types.GetCommentQuery
    variablesType: Types.GetCommentQueryVariables
    kind: "query"
  }
  getFeed: {
    operationType: Types.GetFeedQuery
    variablesType: Types.GetFeedQueryVariables
    kind: "query"
  }
  getRepositoryContributors: {
    operationType: Types.GetRepositoryContributorsQuery
    variablesType: Types.GetRepositoryContributorsQueryVariables
    kind: "query"
  }
}

export interface MutationsMap {
  submitRepository: {
    operationType: Types.SubmitRepositoryMutation
    variablesType: Types.SubmitRepositoryMutationVariables
    kind: "mutation"
  }
  submitComment: {
    operationType: Types.SubmitCommentMutation
    variablesType: Types.SubmitCommentMutationVariables
    kind: "mutation"
  }
}

export interface SubscriptionsMap {
  onCommentAdded: {
    operationType: Types.OnCommentAddedSubscription
    variablesType: Types.OnCommentAddedSubscriptionVariables
    kind: "subscription"
  }
}

export interface FragmentsMap {
  FeedEntry: {
    operationType: Types.FeedEntryFragment
    variablesType: {}
    kind: "fragment"
  }
  RepoInfo: {
    operationType: Types.RepoInfoFragment
    variablesType: {}
    kind: "fragment"
  }
}

export interface OperationsMap
  extends FragmentsMap,
    MutationsMap,
    QueriesMap,
    SubscriptionsMap {}
```

### Example documents map constant

```ts
export const fragmentsDocumentMap = {
  FeedEntry: { document: Types.FeedEntry, kind: "fragment" as const },
  RepoInfo: { document: Types.RepoInfo, kind: "fragment" as const },
}

export const subscriptionsDocumentMap = {
  onCommentAdded: { document: Types.OnCommentAdded, kind: "subscription" as const }
}

export const mutationsDocumentMap = {
  submitRepository: { document: Types.SubmitRepository, kind: "mutation" as const },
  submitComment: { document: Types.SubmitComment, kind: "mutation" as const },
}

export const queriesDocumentMap = {
  getComment: { document: Types.GetComment, kind: "query" as const },
  getFeed: { document: Types.GetFeed, kind: "query" as const },
  getRepositoryContributors: { document: Types.GetRepositoryContributors, kind: "query" as const }
}

export const documentsMap = {
  ...fragmentsDocumentMap,
  ...subscriptionsDocumentMap,
  ...mutationsDocumentMap,
  ...queriesDocumentMap
}
```

### Building example code yourself

run these commands:

```
yarn
yarn build
yarn test
```

and then observe `packages/graphql-codegen-types-map-test/generated/operationsMap.ts`
you'll see real example of generated code.