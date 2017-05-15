import { NamedComponent } from 'kio-ng2-component-routing';
export interface ConfigFile {
    components: NamedComponent[];
}
export interface ProjectConfig extends ConfigFile {
    configFilepath?: string;
}
