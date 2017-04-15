import { TemplateFile } from '../../interfaces';
import { PublicationComponent } from '../../../components/classes';
import { ComponentDataKey, mapComponentData } from '../common.publication';
import { PublicationComponentTemplateData } from '../interfaces';
export declare const mapComponentDataKey: (key: ComponentDataKey, component: PublicationComponent) => any;
export { mapComponentData };
export declare const mapTemplateFile: (file: TemplateFile, data: PublicationComponentTemplateData, replaceRoot?: string) => TemplateFile;
export default mapComponentData;
