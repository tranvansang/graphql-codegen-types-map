import { ASTNode } from 'graphql';
export declare const ERRORS: {
    anonymousOperation: (node: ASTNode) => never;
    failedToGetType: (node: ASTNode) => never;
    unexpected: (extra?: string | undefined) => never;
    unexpectedParentOfSelectionSet: (parent: any) => never;
    bugInCode: (extra?: string | undefined) => never;
    invalidTemplate: <V extends {}, O extends {}>(template: string, variables: V, casingOperations: O) => never;
};
