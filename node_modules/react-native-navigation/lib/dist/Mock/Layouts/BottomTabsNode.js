"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = (0, tslib_1.__importDefault)(require("lodash"));
const layoutActions_1 = require("../actions/layoutActions");
const ParentNode_1 = (0, tslib_1.__importDefault)(require("./ParentNode"));
class BottomTabsNode extends ParentNode_1.default {
    selectedIndex = 0;
    constructor(layout, parentNode) {
        super(layout, 'BottomTabs', parentNode);
    }
    mergeOptions(options) {
        super.mergeOptions(options);
        if (options.bottomTabs?.currentTabIndex) {
            this.selectedIndex = options.bottomTabs?.currentTabIndex;
            (0, layoutActions_1.switchTabByIndex)(this, this.selectedIndex);
        }
        if (options.bottomTabs?.currentTabId) {
            const index = lodash_1.default.findIndex(this.children, (child) => child.nodeId === options?.bottomTabs?.currentTabId);
            if (index !== -1)
                this.selectedIndex = index;
            (0, layoutActions_1.switchTabByIndex)(this, this.selectedIndex);
        }
    }
    getVisibleLayout() {
        return this.children[this.selectedIndex].getVisibleLayout();
    }
}
exports.default = BottomTabsNode;
