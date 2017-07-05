import { Project, RootModuleInfo, BuildInfo, api } from 'kio-ng2-env'
import { NamedComponent } from 'kio-ng2'
import * as path from 'path'

export class EnvFile implements Project {

  static FromFile ( filepath:string ):EnvFile {
    const data = <Project>require(filepath)
    const envFile = new EnvFile()
    return Object.assign(envFile,data)
  }

  static FromProjectPath ( projectPath:string ):EnvFile {
    const projectName = api.modules.resolve.rootModule(projectPath).name
    const projectPackagePath = path.join(projectPath,projectName + '.json')
    return this.FromFile ( projectPackagePath )
  }

  /**
   * project package name
   */
  name:string

  /**
   * main project module
   */
  rootModule:RootModuleInfo

  lastBuild:BuildInfo

  components:NamedComponent[]
}