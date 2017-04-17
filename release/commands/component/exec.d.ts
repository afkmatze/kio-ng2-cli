import { Observable } from 'rxjs';
import { PublicationComponent } from '../../components';
import { TemplateFile } from '../../templates';
import { CommandConfigCreateComponent } from '../../env';
export declare const writeComponentToCache: (component: PublicationComponent) => Observable<PublicationComponent>;
export declare const writeTemplateFile: (component: PublicationComponent, templateFile: TemplateFile) => Observable<PublicationComponent>;
export declare const execCreateComponent: (config: CommandConfigCreateComponent) => Observable<PublicationComponent>;
export default execCreateComponent;
