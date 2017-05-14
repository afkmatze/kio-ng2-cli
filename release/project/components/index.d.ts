import { NamedComponent, NamedFragmentComponentStructure } from 'kio-ng2-component-routing';
import { KioNodeType } from 'kio-ng2';
export declare const isNamedFragmentComponentStructure: (other: any) => other is NamedFragmentComponentStructure;
export declare const writeNamedComponent: <T extends KioNodeType>(namedComponent: NamedComponent) => never;
