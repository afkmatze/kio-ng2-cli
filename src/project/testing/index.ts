import { Observable } from 'rxjs'
import * as path from 'path'
import * as env from '../../env'
import * as rxfs from 'rxfs'
import { ExecData } from 'rxfs'
import * as stringUtils from '../../utils/string'
export * from './Runner.class'
import { TestRunner, ComponentTest } from './Runner.class'
import * as templates from '../templates'
import files from '../files'

export * from './resolve'

const runner = new TestRunner()

export default runner


export const renderTests = ( targetFilename:string ) => {

  return files().publicationComponents()
      .catch ( error => {
        console.log('Failed to list publication components.')
        console.error(error)
        return Observable.throw(error)
      } )
      .map ( (componentFilepath:string) => path.basename(componentFilepath,'.component.ts') )
      .map ( stringUtils.classify )
      .toArray()
      .flatMap ( componentNames => {
        const targetFilepath:string = path.resolve(targetFilename)
        const targetDir:string = path.resolve(path.dirname(targetFilename))
        return templates
          .renderTemplateWithData('test',{
            pathToKioIndexes: './'+path.relative(targetDir,env.resolve(env.resolveKioPath('root'))),
            componentNames 
          })
          .flatMap (
            ({file,content}) => {
              return rxfs.writeFile(targetFilepath,Observable.of(new Buffer(content))).map ( () => path.relative(process.cwd(),targetFilepath) )
            }
          )
      }, 1 )
}


export const execTestAt = ( specFilename:string ) => {

  const specDirpath = path.dirname(specFilename)
  const command = `ts-node "./${path.basename(specFilename)}"`
  console.log('Exec "%s"', command)
  return rxfs.exec(command,{
    cwd: specDirpath
  })
  .map ( (row:ExecData,idx) => {
    const {
      stderr ,
      stdout
    } = row
    let text:string
    if ( stdout )
    {
      text = stdout.toString('utf8')
      console.log('<------------------------------------------------')
      console.log('- row: %s ', idx )
      console.log('-------------------------------------------------')
      console.log('%s',text)
      console.log('------------------------------------------------->')
    }
    else {
      console.error(stderr.toString('utf8'))
    }
    return text
  } )
}