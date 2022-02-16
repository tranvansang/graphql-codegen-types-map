import { OperationTypeNode } from 'graphql';
export declare type OperationKind = OperationTypeNode | 'fragment';
export interface OperationTemplateVariables {
    operationName: string;
    operationKind: OperationKind;
}
export declare type TemplateVariables = OperationTemplateVariables;
export declare const expandTemplate: <T extends OperationTemplateVariables>(template: string, variables: T) => string;
export declare const validateOperationsTemplate: (...templates: string[]) => void;
