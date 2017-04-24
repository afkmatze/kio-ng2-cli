import { Observable, Scheduler } from 'rxjs'
import { logObserver } from './log'

import * as env from '../../env'
import * as logger from '../../console'

import 'mocha'
import expect from 'ceylon'
import assertFs from '../../assert/fs'

import * as rxfs from './fs'

interface TestFile {
  filename: string
  content: string
}

interface TempTestFile {
  file:TestFile
  tmp:string
  unlink():Observable<boolean>
}

const writeTestFile = ( testFile:TestFile ):Observable<TempTestFile> => {
  const temp_filename = env.path.join(env.path.resolve('./'),Date.now()+'_'+testFile.filename)
  return rxfs.writeFile(temp_filename,testFile.content).map(filepath => {
    return ({
      file: testFile,
      tmp: filepath,
      unlink: () => rxfs.unlink(filepath)
    })
  })
}

const randomInt = (max:number=100,min:number=0):number => {
  return Math.floor(Math.random()*(max-min)+min)
}

const testStrings = [ 'foo', 'bla', 'waste' ]


const randomText = (concat:string=" ") => {
  const length = randomInt(300,30)
  return '.'.repeat(length).split('.').map(() => testStrings[randomInt(testStrings.length)] )
      .map((w,idx)=>{
        return (idx%10===0) ? '\n'+w : w 
      })
      .join(concat)
}


let testStringIdx = 0

const randomWord = ():string => {
  return testStrings[(testStringIdx++)%testStrings.length]
}

const randomLines = (max?:number,min?:number):string => {
  const r = randomInt(max,min)
  return '\n'.repeat(r)
}

const renderTestFile = () => {
  return `Hello World

${randomWord()}

Current time is: ${new Date()}

in ms: ${Date.now()}

${randomText(" ")}

${randomLines(15)}

${randomText()}
`  
}

describe('test rxfs',()=>{

  describe('rxfs.findFiles',function(){

    this.timeout(10 * 1000)

    let firstFile

    it('finds files',()=>{
      return rxfs.findFiles(env.KIO_PROJECT_ROOT,/\.ts$/).toPromise().then ( result => {
        firstFile = result
      } )
    })

    it('gets stat',()=>{
      return rxfs.readstats(firstFile).toPromise()
    })
    
    xit('readdir',()=>{
      const obs = rxfs.readdir(env.KIO_PROJECT_ROOT)
      return obs.toPromise().then ( result => {
        console.log('result',result)
      } )
    })

  })

  describe('diff',function(){

    this.timeout(10000)

    const testFileNames = ['testFile01.txt','testFile02.txt']
    let testFiles:TempTestFile[]

    before(()=>{

      return Observable.from(testFileNames).delay(300)
            .flatMap ( testFilename => {
              return writeTestFile({
                filename: testFilename,
                content: renderTestFile()
              })
            },1)
            .toArray()
            .toPromise()
            .then ( tmpFiles => {
              testFiles = tmpFiles
            } )

    })

    it('diffs',()=>{
      const testFileNames:string[] = testFiles.map(testFile => testFile.tmp)
      return rxfs.diff({},...testFileNames)
              .map( (result,idx) => {
                return result
              })
              .toPromise()
    })


    after(()=>{
      return Observable
            .concat(testFiles)
            .delay((Math.random()*1000)+2000)
            .flatMap ( 
              testFile => testFile
                .unlink() 
            )
            .toArray()
            .toPromise()
    })


  })

  describe('tmp file',()=>{

    let tmpFile

    before(()=>{
      return rxfs.tmp.file('foo').toPromise()
        .then ( result => {
          tmpFile = result
        } )
    })

    it('exists',()=>{
      assertFs(tmpFile).toBeAFile()
    })

  })

})