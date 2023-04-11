import { ComponentDidDisappearEvent, ComponentWillAppearEvent, ModalDismissedEvent } from '../../src/interfaces/ComponentEvents';
import { ComponentDidAppearEvent, NavigationButtonPressedEvent } from '../../src/index';
import { BottomTabPressedEvent, CommandCompletedEvent } from '../../src/interfaces/Events';
export declare const events: {
    navigationButtonPressed: ((_event: NavigationButtonPressedEvent) => void)[];
    componentWillAppear: ((_event: ComponentWillAppearEvent) => void)[];
    componentDidAppear: ((_event: ComponentDidAppearEvent) => void)[];
    componentDidDisappear: ((_event: ComponentDidDisappearEvent) => void)[];
    modalDismissed: ((_event: ModalDismissedEvent) => void)[];
    bottomTabPressed: ((_event: BottomTabPressedEvent) => void)[];
    commandCompleted: ((_event: CommandCompletedEvent) => void)[];
    invokeComponentWillAppear: (event: ComponentWillAppearEvent) => void;
    invokeComponentDidAppear: (event: ComponentDidAppearEvent) => void;
    invokeComponentDidDisappear: (event: ComponentDidDisappearEvent) => void;
    invokeModalDismissed: (event: ModalDismissedEvent) => void;
    invokeNavigationButtonPressed: (event: NavigationButtonPressedEvent) => void;
    invokeBottomTabPressed: (event: BottomTabPressedEvent) => void;
    invokeCommandCompleted: (event: CommandCompletedEvent) => void;
};
