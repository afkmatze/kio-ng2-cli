import { Observable } from 'rxjs';
import { PublicationComponent, Component } from './components';
import { IndexName } from './indexes/interfaces';
import { ComponentModel, getComponents } from './components';
export { ComponentModel, getComponents };
export declare const targetDirForTemplate: (templateName: "fragment" | "txt" | "src" | "index") => string;
export declare const components: (components: Observable<Component | PublicationComponent>) => {
    renderTemplate: (templateName: string, indexName?: IndexName) => void;
};
