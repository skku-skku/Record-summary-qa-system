"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const BottomTabsNode_1 = (0, tslib_1.__importDefault)(require("./BottomTabsNode"));
const ComponentNode_1 = (0, tslib_1.__importDefault)(require("./ComponentNode"));
const StackNode_1 = (0, tslib_1.__importDefault)(require("./StackNode"));
class LayoutNodeFactory {
    static create(layout, parentNode) {
        switch (layout.type) {
            case 'Component':
                return new ComponentNode_1.default(layout, parentNode);
            case 'Stack':
                return new StackNode_1.default(layout, parentNode);
            default:
            case 'BottomTabs':
                return new BottomTabsNode_1.default(layout, parentNode);
        }
    }
}
exports.default = LayoutNodeFactory;
