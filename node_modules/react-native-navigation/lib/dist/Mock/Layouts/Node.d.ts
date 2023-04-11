import { Options } from '../../src/index';
import ParentNode from './ParentNode';
interface Data {
    name: string;
    options: Options;
}
export declare type NodeType = 'Component' | 'ExternalComponent' | 'Stack' | 'BottomTabs' | 'TopTabs' | 'SideMenuRoot' | 'SideMenuLeft' | 'SideMenuRight' | 'SideMenuCenter' | 'SplitView';
export default class Node {
    readonly nodeId: string;
    readonly data: Data;
    readonly type: NodeType;
    parentNode?: ParentNode;
    constructor(layout: any, type: NodeType, parentNode?: ParentNode);
}
export {};
