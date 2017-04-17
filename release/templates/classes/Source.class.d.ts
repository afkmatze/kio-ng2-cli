/// <reference types="node" />
import { Readable } from 'stream';
import { TemplateName } from '../interfaces';
export declare const resolveTemplateSource: (templateName: string) => string;
export interface TemplateSourceOptions {
    templateName: TemplateName;
}
export declare class TemplateSource extends Readable {
    constructor(options: TemplateSourceOptions);
    protected setTemplateName(templateName: TemplateName): void;
    private templateName;
    private templateFilepath;
    private sizeCount;
    protected _read(size: number): void;
}
