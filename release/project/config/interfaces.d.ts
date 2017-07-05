import { NamedComponent } from 'kio-ng2';
export interface ConfigFile {
    components: NamedComponent[];
}
export interface ProjectConfig extends ConfigFile {
    configFilepath?: string;
}
