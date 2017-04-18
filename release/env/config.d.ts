import { GlobalConfig } from './interfaces';
export declare class CLIConfig {
    private _data;
    update(config: GlobalConfig): void;
    readonly data: GlobalConfig;
}
declare var _default: CLIConfig;
export default _default;
