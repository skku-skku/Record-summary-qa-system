import BottomTabs from './BottomTabsNode';
import ComponentNode from './ComponentNode';
import Stack from './StackNode';
import ParentNode from './ParentNode';
export default class LayoutNodeFactory {
    static create(layout: any, parentNode?: ParentNode): Stack | BottomTabs | ComponentNode;
}
