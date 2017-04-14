import * as shelljs from 'shelljs'
import * as path from 'path'
import * as env from '../env/constants'
import * as childprocess from 'child_process'
import { CompilerOptions } from 'typescript'

export const shellCheck = ( testFlag:string, value:string ):boolean => {
  return shelljs.exec(`[[ ${testFlag} ${value} ]]`).code === 0
}

const compileTarget = ( filename:string ) => {

  const tmpFile = 'tmp' + Date.now() + '.' + path.basename(filename)
  childprocess.execSync('tsc '+filename+' --outFile ' + tmpFile, {
    cwd: env.KIO_PROJECT_ROOT
  } )
  return tmpFile
}

export const evalProject = (recompile:boolean=false) => {
  const tsconf = require(env.resolve('./tsconfig.json'))
  const compilerOpts:CompilerOptions = tsconf.compilerOptions
  const outpath = env.resolve(compilerOpts.outDir)
  if ( recompile || !shellCheck('-d ',outpath) )
  {
    childprocess.execSync('tsc',{
      cwd: env.resolve('./')
    })
  }
  return outpath
}

export const evalFile = ( filename:string , pwd:string ) => {

  const outpath = evalProject()
  const compiledFile = path.join(outpath,filename.replace(env.KIO_PROJECT_ROOT,'.')).replace(/\.ts$/,'.js')
  const moduleData = require(compiledFile)  
  return moduleData
}