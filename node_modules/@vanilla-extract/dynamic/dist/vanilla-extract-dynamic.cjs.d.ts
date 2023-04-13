declare type CSSVarFunction = `var(--${string})` | `var(--${string}, ${string | number})`;
declare type Contract = {
    [key: string]: CSSVarFunction | null | Contract;
};
declare type Primitive = string | boolean | number | null | undefined;
declare type MapLeafNodes<Obj, LeafType> = {
    [Prop in keyof Obj]: Obj[Prop] extends Primitive ? LeafType : Obj[Prop] extends Record<string | number, any> ? MapLeafNodes<Obj[Prop], LeafType> : never;
};

declare type Styles = {
    [cssVarName: string]: string;
};
declare function assignInlineVars(vars: Record<string, string>): Styles;
declare function assignInlineVars<ThemeContract extends Contract>(contract: ThemeContract, tokens: MapLeafNodes<ThemeContract, string>): Styles;

declare function setElementVars(element: HTMLElement, vars: Record<string, string>): void;
declare function setElementVars<ThemeContract extends Contract>(element: HTMLElement, contract: ThemeContract, tokens: MapLeafNodes<ThemeContract, string>): void;

export { assignInlineVars, setElementVars };
