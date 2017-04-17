import { Component } from './Component.class';
import { KioPublicationComponent, KioComponentFileType } from '../interfaces';
export declare class PublicationComponent extends Component {
    static FileTypes: KioComponentFileType[];
    data: KioPublicationComponent;
    constructor(data: KioPublicationComponent);
    private _modifiers;
    private _childTypes;
    modifiers: any;
    childTypes: any;
    update(): void;
    toJSON(): KioPublicationComponent;
}
