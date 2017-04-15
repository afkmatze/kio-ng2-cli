import { Component } from './Component.class';
import { KioPublicationComponent, KioComponentFileType } from '../interfaces';
export declare class PublicationComponent extends Component {
    static FileTypes: KioComponentFileType[];
    data: KioPublicationComponent;
    constructor(data: KioPublicationComponent);
    private _modifiers;
    private _childTypes;
    readonly modifiers: string[];
    readonly childTypes: string[];
    update(): void;
    toJSON(): KioPublicationComponent;
}
