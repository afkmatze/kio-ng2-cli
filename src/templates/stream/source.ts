import { find, cat } from 'shelljs'
import * as fs from 'fs'
import { Readable, Writable, Transform } from 'stream'
import { ChildProcess, exec, ExecOptions } from 'child_process'
import { path, TEMPLATES } from '../../env'
import { TemplateName } from '../interfaces'



export const readTemplateFilesStream = ( templateName:TemplateName ) => {

  const templateRoot = path.join(TEMPLATES,templateName)
  const opts:ExecOptions = {
    cwd: templateRoot
  }


  const sessionTransform = new Transform({
    objectMode: true,
    write(chunk,enc,callback){
      console.log('session transform write',chunk,enc,callback)
      callback(null,chunk)
    }
  })

  const cp = exec('find . -type file',opts,(error,stdout,stderr)=>{
    console.log('proc finished',error,stdout)
    sessionTransform.end()
  })


  const createTransform = ( targetFile:string ) => {
    const FileTransform:Transform = new Transform({
      objectMode: true,
      transform: function(content,encoding,callback){
        callback(null,{
          filename: targetFile,
          content: content.toString()
        })
      }
    })
    FileTransform.pipe(sessionTransform)
    return FileTransform
  }

  const readFile = ( file ) => {
    const transform = createTransform(file)
    transform.write(cat(path.join(templateRoot,file)))
  }

  cp.stdout.on('data',(file)=>{
    readFile(file)
  })
  
/*  cp.stdout.on('data',(data)=>{
    const ok = FileTransform.write(data)
    if ( !ok )
    {
      cp.stdout
      FileTransform.once('drain',()=>{
        cp.stdout.resume()
      })
    }
  })
*/
  cp.stdout.on('end',()=>{
    sessionTransform.end()
  })
  
  return sessionTransform
}