import * as ComponentInterfaces from '../interfaces';
import { KioComponentFileType } from '../interfaces';
export declare class Component {
    static FileTypes: KioComponentFileType[];
    data: ComponentInterfaces.KioComponent;
    constructor(data: ComponentInterfaces.KioComponent);
    readonly typeName: string;
    readonly dir: string;
    readonly name: string;
    readonly dasherizedName: string;
    readonly childTypes: string[];
    readonly modifiers: string[];
    readonly contentType: string;
    relativeTo(toPathname: string): string;
    relativeFrom(fromPathname: string): string;
    getFiles(): string[];
    getFile(fileType: KioComponentFileType): string;
    toString(): string;
    toJSON(): ComponentInterfaces.KioComponent;
}
