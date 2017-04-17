import { Observable } from 'rxjs';
import { Component, PublicationComponent } from '../../components';
import { IndexType } from '../../indexes/interfaces';
import { IndexTemplateData } from '../../templates';
import { BuildIndexArgs } from '../../env';
export declare const createIndexSource: (indexType: IndexType, components: (Component | PublicationComponent)[]) => Observable<{
    name: string;
    source: string;
}>;
export declare const createIndexTemplateData: (indexType: IndexType, components: (Component | PublicationComponent)[]) => IndexTemplateData;
export declare const writeComponentsToIndexTemplate: (indexType: IndexType, components: (Component | PublicationComponent)[] | Observable<Component | PublicationComponent>) => any;
export declare const selectSource: (cached?: boolean) => Observable<any>;
declare var _default: (config?: BuildIndexArgs) => Observable<string[]>;
export default _default;
