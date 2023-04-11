"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchTabByIndex = void 0;
const LayoutStore_1 = require("../Stores/LayoutStore");
const switchTabByIndex = (bottomTabs, index) => {
    if (bottomTabs) {
        LayoutStore_1.LayoutStore.getVisibleLayout().componentDidDisappear();
        LayoutStore_1.LayoutStore.selectTabIndex(bottomTabs, index);
        LayoutStore_1.LayoutStore.getVisibleLayout().componentDidAppear();
    }
};
exports.switchTabByIndex = switchTabByIndex;
