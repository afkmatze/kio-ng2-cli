export declare type TemplateDataType = 'publication' | 'index';
export interface TemplateData<TemplateDataType> {
    type: TemplateDataType;
    [key: string]: any;
}
