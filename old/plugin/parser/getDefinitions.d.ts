import { ASTNode, DocumentNode, VariableDefinitionNode } from 'graphql';
export declare const getVariablesAst: (node: ASTNode) => VariableDefinitionNode | undefined;
export declare const getFragments: (allAst: DocumentNode) => {
    node: import("graphql").FragmentDefinitionNode;
    name: string;
    onType: string;
    kind: "fragment";
}[];
export declare const getOperations: (allAst: DocumentNode) => {
    node: import("graphql").OperationDefinitionNode;
    name: string;
    kind: import("graphql").OperationTypeNode;
    variables: VariableDefinitionNode | undefined;
}[];
export declare type FragmentType = ReturnType<typeof getFragments>[0];
export declare type OperationType = ReturnType<typeof getOperations>[0];
export declare type DefinitionType = OperationType | FragmentType;
