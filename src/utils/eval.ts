import * as shelljs from 'shelljs'
import * as path from '../env/path'
import * as env from '../env/constants'
import * as childprocess from 'child_process'
import { CompilerOptions } from 'typescript'

export const shellCheck = ( testFlag:string, value:string ):boolean => {
  return shelljs.exec(`[[ ${testFlag} "${value}" ]]`).code === 0
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

  const tmp_outpath = path.resolve(env.resolveProjectCache(),'tsc-out')

  if ( recompile || !shellCheck('-d ',tmp_outpath) )
  {
    const cp = shelljs.exec(`tsc --outDir "${tmp_outpath}"`,{
      cwd: env.KIO_PROJECT_ROOT,
      async: false
    })

    if ( cp.stderr )
    {
      throw Error(cp.stderr.toString())
    }
  }
  return tmp_outpath
}

export const evalFile = ( filename:string , pwd:string ) => {
  
  /*const relFilepath:string = env.relative(filename).replace(/\.ts$/,'')
  const tname = 'eval '+path.basename(filename)
  console.time(tname)
  const cmd = `ts-node -p "JSON.stringify(require('./${relFilepath}'),null,'  ')"`
  const tsEval = shelljs.exec(cmd,{
    cwd: env.KIO_PROJECT_ROOT
  }).stdout
  const data = JSON.parse(<string>tsEval)
  console.timeEnd(tname)
  return data*/

  
  filename = env.relative(filename)
  const outpath = evalProject()
  
  /*childprocess.execSync(`tsc "${env.resolve(filename)}" --outDir "${outpath}"`,{
    cwd: env.KIO_PROJECT_ROOT
  })*/

  const compiledFile = path.resolve(outpath,filename).replace(/\.ts$/,'.js')
  const moduleData = require(compiledFile)
  //shelljs.rm('-rf',outpath)
  return moduleData
}