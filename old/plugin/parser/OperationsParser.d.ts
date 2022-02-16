import { DocumentNode, GraphQLSchema, TypeInfo } from 'graphql';
export declare class OperationsParser {
    readonly allAst: DocumentNode;
    readonly schema: GraphQLSchema;
    readonly typeInfo: TypeInfo;
    constructor(allAst: DocumentNode, schema: GraphQLSchema);
    get allFragments(): {
        node: import("graphql").FragmentDefinitionNode;
        name: string;
        onType: string;
        kind: "fragment";
    }[];
    get allOperations(): {
        node: import("graphql").OperationDefinitionNode;
        name: string;
        kind: import("graphql").OperationTypeNode;
        variables: import("graphql").VariableDefinitionNode | undefined;
    }[];
    get allDefinitions(): import("./getDefinitions").DefinitionType[];
}
