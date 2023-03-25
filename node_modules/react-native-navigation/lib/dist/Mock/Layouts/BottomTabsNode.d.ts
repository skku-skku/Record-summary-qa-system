import { Options } from '../../src/index';
import ParentNode from './ParentNode';
export default class BottomTabsNode extends ParentNode {
    selectedIndex: number;
    constructor(layout: any, parentNode?: ParentNode);
    mergeOptions(options: Options): void;
    getVisibleLayout(): import("./ComponentNode").default;
}
