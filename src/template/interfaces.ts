import { KioContentType } from 'kio-ng2'

export interface TemplateData {
  [key:string]: any
}
export type TemplateName = "index"|"src"|"fragment"|"txt" 

export interface ComponentTemplateData extends TemplateData {
  contentType:KioContentType;
  modifiers:string[];
  childTypes:KioContentType[];
  classifiedParentComponentName:string;
  pathToStructureComponents:string;
  dasherizedParentComponentPath:string;
  selector:string;
  dasherizedModuleName:string;
  classifiedModuleName:string;
}

export interface ComponentImport {
  importAlias?:string;
  importName:string;
  importPath:string;
}

export interface IndexTemplateData extends TemplateData {
  exportName:string;
  components:ComponentImport[];
}

export interface TemplateFile {
  filename:string;
  source?:string;
  rendered?:string;
}

export interface TemplateFiles {
  templateName:string;
  targetDir:string;
  files:TemplateFile[];
}