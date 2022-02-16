module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(12));
__export(__webpack_require__(13));
__export(__webpack_require__(14));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(11));
__export(__webpack_require__(4));


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("lazy-get-decorator");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = __webpack_require__(0);
var utils_1 = __webpack_require__(1);
var filterDefinitions = function (allAst, kind) {
    return allAst.definitions.filter(function (d) { return d.kind === kind; });
};
exports.getVariablesAst = function (node) {
    var variable = undefined;
    graphql_1.visit(node, {
        VariableDefinition: function (node) {
            variable = node;
            return graphql_1.BREAK;
        },
    });
    return variable;
};
exports.getFragments = function (allAst) {
    return filterDefinitions(allAst, 'FragmentDefinition').map(function (node) { return ({
        node: node,
        name: node.name.value,
        onType: node.typeCondition.name.value,
        kind: 'fragment',
    }); });
};
exports.getOperations = function (allAst) {
    return filterDefinitions(allAst, 'OperationDefinition').map(function (node) { return ({
        node: node,
        name: node.name ? node.name.value : utils_1.ERRORS.anonymousOperation(node),
        kind: node.operation,
        variables: exports.getVariablesAst(node),
    }); });
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("lodash.merge");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(16));
var OperationsMapPrinter_1 = __webpack_require__(20);
exports.OperationsMapPrinter = OperationsMapPrinter_1.OperationsMapPrinter;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var changeCase = __importStar(__webpack_require__(17));
var esprima_1 = __webpack_require__(18);
var static_eval_1 = __importDefault(__webpack_require__(19));
var utils_1 = __webpack_require__(1);
var casingOperations = Object.keys(changeCase)
    .map(function (x) {
    var _a;
    return (_a = {}, _a[x] = changeCase[x], _a);
})
    .reduce(function (l, r) { return (__assign(__assign({}, l), r)); }, {});
exports.expandTemplate = function (template, variables) {
    var ast = esprima_1.parse('`' + template.replace(/{/g, '${') + '`').body[0].expression;
    var allVariables = __assign(__assign({}, utils_1.fromEntries(Object.entries(variables).map(function (_a) {
        var name = _a[0], value = _a[1];
        return [
            changeCase.pascalCase(name),
            changeCase.pascalCase(value),
        ];
    }))), variables);
    var result = static_eval_1.default(ast, __assign(__assign({}, casingOperations), allVariables));
    if (result.includes('[object Object]')) {
        return utils_1.ERRORS.invalidTemplate(template, allVariables, casingOperations);
    }
    return result;
};
var validateTemplate = function (templates, dummyVariables) {
    for (var _i = 0, templates_1 = templates; _i < templates_1.length; _i++) {
        var template = templates_1[_i];
        exports.expandTemplate(template, dummyVariables);
    }
};
exports.validateOperationsTemplate = function () {
    var templates = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        templates[_i] = arguments[_i];
    }
    return validateTemplate(templates, {
        operationKind: 'query',
        operationName: 'validation',
    });
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(9));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(10));
__export(__webpack_require__(2));
__export(__webpack_require__(6));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = __webpack_require__(0);
var parser_1 = __webpack_require__(2);
var printer_1 = __webpack_require__(6);
exports.plugin = function (schema, rawDocuments, rawConfig) {
    try {
        var config = new printer_1.PrinterConfig(rawConfig.operationsMap);
        config.validateConfig();
        var documents = rawDocuments;
        var allAst = graphql_1.concatAST(documents
            .map(function (v) {
            return v.document ||
                // The next line is to make it work with older versions (<= v1.6.1) of @graphql-codegen
                v.content;
        })
            .filter(function (x) { return !!x; }));
        var parser = new parser_1.OperationsParser(allAst, schema);
        var operationsMapPrinter = new printer_1.OperationsMapPrinter(parser, config);
        return operationsMapPrinter.allContent;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = __webpack_require__(0);
var lazy_get_decorator_1 = __webpack_require__(3);
var getDefinitions_1 = __webpack_require__(4);
var OperationsParser = /** @class */ (function () {
    function OperationsParser(allAst, schema) {
        this.allAst = allAst;
        this.schema = schema;
        this.typeInfo = new graphql_1.TypeInfo(schema);
    }
    Object.defineProperty(OperationsParser.prototype, "allFragments", {
        get: function () {
            return getDefinitions_1.getFragments(this.allAst);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OperationsParser.prototype, "allOperations", {
        get: function () {
            return getDefinitions_1.getOperations(this.allAst);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OperationsParser.prototype, "allDefinitions", {
        get: function () {
            return __spreadArrays(this.allFragments, this.allOperations);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        lazy_get_decorator_1.LazyGetter()
    ], OperationsParser.prototype, "allFragments", null);
    __decorate([
        lazy_get_decorator_1.LazyGetter()
    ], OperationsParser.prototype, "allOperations", null);
    __decorate([
        lazy_get_decorator_1.LazyGetter()
    ], OperationsParser.prototype, "allDefinitions", null);
    return OperationsParser;
}());
exports.OperationsParser = OperationsParser;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = __webpack_require__(0);
exports.ERRORS = {
    anonymousOperation: function (node) {
        throw new Error("Anonymous operations are not allowed: " + graphql_1.print(node));
    },
    failedToGetType: function (node) {
        throw new Error("Failed to get a type of the node: " + graphql_1.print(node));
    },
    unexpected: function (extra) {
        throw new Error("Unexpected error ocurred" + (extra ? ": " + extra : ''));
    },
    unexpectedParentOfSelectionSet: function (parent) {
        throw new Error("Unexpected parent of SelectionSet: " + JSON.stringify((parent === null || parent === void 0 ? void 0 : parent.kind) || parent));
    },
    bugInCode: function (extra) {
        throw new Error("There is a bug in the code" + (extra ? ": " + extra : ''));
    },
    invalidTemplate: function (template, variables, casingOperations) {
        var errorMessage = "Invalid variable or function name used in \"operationsMap\" template. " +
            ("Given template: \"" + template + "\". ") +
            ("Allowed variables: \"" + Object.keys(variables).join(', ') + "\". ") +
            ("Allowed functions: \"" + Object.keys(casingOperations).join(', ') + "\". ") +
            "Usage example: \"{pascalCase(operationName)}{pascalCase(operationKind)}Variables\"";
        throw new Error(errorMessage);
    },
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_merge_1 = __importDefault(__webpack_require__(5));
exports.unionToArray = function (obj) {
    return Object.keys(obj);
};
exports.pickKeys = function (obj, keysObj) {
    var keys = exports.unionToArray(keysObj);
    var entries = Object.entries(obj)
        .filter(function (_a) {
        var key = _a[0];
        return keys.includes(key);
    })
        .map(function (_a) {
        var _b;
        var key = _a[0], value = _a[1];
        return (_b = {}, _b[key] = value, _b);
    });
    return lodash_merge_1.default.apply(void 0, __spreadArrays([{}], entries));
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var object_fromentries_1 = __importDefault(__webpack_require__(15));
exports.fromEntries = object_fromentries_1.default;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("object.fromentries");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var expandTemplate_1 = __webpack_require__(7);
var lodash_merge_1 = __importDefault(__webpack_require__(5));
var utils_1 = __webpack_require__(1);
exports.defaultConfig = {
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
};
var operationsMapConfigKeysObs = {
    operationKindTemplate: null,
    operationTypeTemplate: null,
    variablesTypeTemplate: null,
    withOperationsMap: null,
};
var documentsMapConfigKeysObs = {
    operationDocumentTemplate: null,
    withDocumentsMap: null,
    operationKindTemplate: null,
};
var typesImportConfigKeysObs = {
    importTypesFrom: null,
    importedTypesAlias: null,
};
var PrinterConfig = /** @class */ (function () {
    function PrinterConfig(rawConfig) {
        var _this = this;
        if (rawConfig === void 0) { rawConfig = {}; }
        this.pickConfigEntries = function (pick) {
            return utils_1.pickKeys(_this.config, pick);
        };
        this.config = lodash_merge_1.default(exports.defaultConfig, rawConfig);
    }
    Object.defineProperty(PrinterConfig.prototype, "allOptions", {
        get: function () {
            return this.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrinterConfig.prototype, "operationMap", {
        get: function () {
            return this.pickConfigEntries(operationsMapConfigKeysObs);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrinterConfig.prototype, "documentsMap", {
        get: function () {
            return this.pickConfigEntries(documentsMapConfigKeysObs);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrinterConfig.prototype, "importTypes", {
        get: function () {
            var config = this.pickConfigEntries(typesImportConfigKeysObs);
            var importRef = config.importTypesFrom ? config.importedTypesAlias + "." : '';
            return __assign(__assign({}, config), { importRef: importRef });
        },
        enumerable: true,
        configurable: true
    });
    PrinterConfig.prototype.validateConfig = function () {
        var _a = this.operationMap, operationKindTemplate = _a.operationKindTemplate, variablesTypeTemplate = _a.variablesTypeTemplate, operationTypeTemplate = _a.operationTypeTemplate;
        expandTemplate_1.validateOperationsTemplate(operationKindTemplate, variablesTypeTemplate, operationTypeTemplate);
        expandTemplate_1.validateOperationsTemplate(this.documentsMap.operationDocumentTemplate);
    };
    return PrinterConfig;
}());
exports.PrinterConfig = PrinterConfig;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("change-case");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("esprima");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("static-eval");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var expandTemplate_1 = __webpack_require__(7);
var lazy_get_decorator_1 = __webpack_require__(3);
var emptyOutput = { content: '' };
var mergeOutputs = function (separator) {
    if (separator === void 0) { separator = '\n'; }
    var outputs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        outputs[_i - 1] = arguments[_i];
    }
    var content = outputs.map(function (x) { return x.content; }).join(separator);
    var prepend = [];
    var append = [];
    for (var _a = 0, outputs_1 = outputs; _a < outputs_1.length; _a++) {
        var output = outputs_1[_a];
        append = __spreadArrays((output.append || []), append);
        prepend = __spreadArrays(prepend, (output.prepend || []));
    }
    return { prepend: prepend, append: append, content: content };
};
var OperationsMapPrinter = /** @class */ (function () {
    function OperationsMapPrinter(parser, config) {
        var _this = this;
        this.parser = parser;
        this.config = config;
        this.getDocumentsMap = function (constantName, definitionsKind) {
            var _a = _this, parser = _a.parser, config = _a.config;
            var allDefinitions = parser.allDefinitions;
            var _b = config.documentsMap, operationDocumentTemplate = _b.operationDocumentTemplate, operationKindTemplate = _b.operationKindTemplate;
            var importRef = config.importTypes.importRef;
            var definitions = allDefinitions.filter(function (x) { return x.kind === definitionsKind; });
            var fields = definitions
                .map(function (definition) {
                var variables = {
                    operationName: definition.name,
                    operationKind: definition.kind,
                };
                var expand = function (template) { return expandTemplate_1.expandTemplate(template, variables); };
                var fields = [
                    "document: " + importRef + expand(operationDocumentTemplate),
                    "kind: '" + expand(operationKindTemplate) + "' as const",
                ];
                return "'" + definition.name + "': { " + fields.filter(function (x) { return !!x; }).join(', ') + " }";
            })
                .join(',\n  ');
            return "export const " + constantName + " = {\n  " + fields + "\n}";
        };
        this.getOperationsMapInterface = function (interfaceName, definitionsKind) {
            var _a = _this, parser = _a.parser, config = _a.config;
            var importRef = config.importTypes.importRef;
            var allDefinitions = parser.allDefinitions;
            var _b = config.operationMap, operationKindTemplate = _b.operationKindTemplate, operationTypeTemplate = _b.operationTypeTemplate, variablesTypeTemplate = _b.variablesTypeTemplate;
            var definitions = allDefinitions.filter(function (x) { return x.kind === definitionsKind; });
            var fields = definitions
                .map(function (definition) {
                var variables = {
                    operationName: definition.name,
                    operationKind: definition.kind,
                };
                var expand = function (template) { return expandTemplate_1.expandTemplate(template, variables); };
                var fields = [
                    "operationType: " + importRef + expand(operationTypeTemplate),
                    "variablesType: " + (definition.kind === 'fragment' ? '{}' : importRef + expand(variablesTypeTemplate)),
                    "kind: '" + expand(operationKindTemplate) + "'",
                ];
                return "'" + definition.name + "': { " + fields.filter(function (x) { return !!x; }).join(', ') + " }";
            })
                .join('\n  ');
            return "export interface " + interfaceName + " {\n  " + fields + "\n}";
        };
    }
    Object.defineProperty(OperationsMapPrinter.prototype, "commonPrependItems", {
        get: function () {
            var _a = this.config.importTypes, importTypesFrom = _a.importTypesFrom, importedTypesAlias = _a.importedTypesAlias;
            var prepend = [importTypesFrom && "import * as " + importedTypesAlias + " from '" + importTypesFrom + "'"].filter(function (x) { return !!x; });
            return { content: '', prepend: prepend };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OperationsMapPrinter.prototype, "allContent", {
        get: function () {
            var _a = this.config.allOptions, withDocumentsMap = _a.withDocumentsMap, withOperationsMap = _a.withOperationsMap;
            return mergeOutputs('\n\n', this.commonPrependItems, withOperationsMap ? this.operationsMapInterface : emptyOutput, withDocumentsMap ? this.documentsMap : emptyOutput);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OperationsMapPrinter.prototype, "documentsMap", {
        get: function () {
            var _this = this;
            var names = {
                fragment: 'fragmentsDocumentMap',
                subscription: 'subscriptionsDocumentMap',
                mutation: 'mutationsDocumentMap',
                query: 'queriesDocumentMap',
            };
            var fields = Object.values(names)
                .map(function (x) { return "..." + x; })
                .join(',\n  ');
            var content = __spreadArrays(Object.entries(names).map(function (_a) {
                var kind = _a[0], name = _a[1];
                return _this.getDocumentsMap(name, kind);
            }), [
                "export const documentsMap = {\n  " + fields + "\n}",
            ]).join('\n\n');
            return { content: content };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OperationsMapPrinter.prototype, "operationsMapInterface", {
        get: function () {
            var content = [
                this.getOperationsMapInterface('FragmentsMap', 'fragment'),
                this.getOperationsMapInterface('MutationsMap', 'mutation'),
                this.getOperationsMapInterface('QueriesMap', 'query'),
                this.getOperationsMapInterface('SubscriptionsMap', 'subscription'),
                "export interface OperationsMap extends FragmentsMap, MutationsMap, QueriesMap, SubscriptionsMap { }",
            ].join('\n\n');
            return { content: content };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        lazy_get_decorator_1.LazyGetter()
    ], OperationsMapPrinter.prototype, "commonPrependItems", null);
    __decorate([
        lazy_get_decorator_1.LazyGetter()
    ], OperationsMapPrinter.prototype, "allContent", null);
    __decorate([
        lazy_get_decorator_1.LazyGetter()
    ], OperationsMapPrinter.prototype, "documentsMap", null);
    __decorate([
        lazy_get_decorator_1.LazyGetter()
    ], OperationsMapPrinter.prototype, "operationsMapInterface", null);
    return OperationsMapPrinter;
}());
exports.OperationsMapPrinter = OperationsMapPrinter;


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map