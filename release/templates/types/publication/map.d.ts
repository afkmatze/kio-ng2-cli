import { PublicationComponentTemplateData } from '../interfaces';
import { PublicationComponent } from '../../../components/classes';
import { DataKeyType } from './keys';
export declare const mapDataKey: (key: DataKeyType, component: PublicationComponent) => any;
export declare const mapComponentData: (componentData: PublicationComponent) => PublicationComponentTemplateData;
