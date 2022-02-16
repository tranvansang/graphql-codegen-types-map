import { PluginFunction, Types } from '@graphql-codegen/plugin-helpers';
import { AllConfigOptions } from "./printer";
import { ReplaceReturnType } from "../utils";
export interface OperationsMapPrinterConfig {
    operationsMap: Partial<AllConfigOptions>;
}
export declare type Plugin = ReplaceReturnType<PluginFunction<OperationsMapPrinterConfig>, Types.Promisable<Types.ComplexPluginOutput>>;
export declare const plugin: Plugin;
