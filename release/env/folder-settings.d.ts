import { KioFolderSettings, KioFolderSettingArg } from './interfaces';
export declare const DEFAULT_EXCLUDES: RegExp[];
export declare const folderSettings: (arg: KioFolderSettingArg, mergeDefaults?: boolean) => KioFolderSettings;
