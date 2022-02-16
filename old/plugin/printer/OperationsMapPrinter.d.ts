import { PrinterConfig } from "./config";
import { OperationsParser } from "..";
import { Types } from '@graphql-codegen/plugin-helpers';
export declare class OperationsMapPrinter {
    readonly parser: OperationsParser;
    readonly config: PrinterConfig;
    constructor(parser: OperationsParser, config: PrinterConfig);
    get commonPrependItems(): Types.ComplexPluginOutput;
    get allContent(): Types.ComplexPluginOutput;
    get documentsMap(): Types.ComplexPluginOutput;
    private getDocumentsMap;
    get operationsMapInterface(): Types.ComplexPluginOutput;
    private getOperationsMapInterface;
}
