import { IndexTemplateData } from '../interfaces';
import { TemplateFile } from '../../interfaces';
import { ComponentIndex } from '../../../indexes/interfaces';
export declare const mapTemplateData: (indexData: ComponentIndex) => IndexTemplateData;
export declare const mapTemplateFile: (file: TemplateFile, data: IndexTemplateData) => TemplateFile;
