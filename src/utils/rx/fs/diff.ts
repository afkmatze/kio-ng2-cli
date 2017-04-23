import { Observable } from 'rxjs'
import { path, KIO_PROJECT_ROOT, KIO_PROJECT_CACHE, KIO_PATHS } from '../../../env'
import { ExecData } from './interfaces'
import { ExecOptions } from 'child_process'

import { existsSync } from './fs'
import { exec } from './exec'
import { file as tmpFile } from './tmp'

export const diff = ( opts?:ExecOptions, ...targets:string[] ) => {
  if ( 'string' === typeof opts )
  {
    return diff ( {}, opts, ...targets )
  }
  
  const parser = diffParser()

  return Observable.from(targets).flatMap(
      target => {
        if ( existsSync(target) )
        {
          //console.log('is file: \n---\n', target, '\n---')
          return Observable.of(target)
        }
        return tmpFile(target)
      }
    )
    .toArray()
    .map ( filenames => {
      const command = `diff ${filenames.map(t => `"${t}"`).join(' ')}`
      //console.log('diff command: ', command)
      return command
    } )
    .flatMap ( command => exec(command,opts) )
    .map(out=>{
      if ( out.stderr )
      {
        return Observable.throw(out.stderr)
      }
      /*if ( !out.stdout )
      {
        console.warn('no data on stdout', out)
      }*/
      return parser.parse(out.stdout ? out.stdout.toString() : '')
    })
    .toArray()
    .map ( result => {
      //console.log('diff result', result)
      return parser.result()
    } )
  
}

const rx_index = /^(.+)c(.+)$/gm
const rx_leftRow = /^\>\ (.+)$/gm
const rx_rightRow = /^\<\ (.+)$/gm

const diffParser = ( ) => {
  const diffs = []

  let diffIndex = 0
  let currentDiff = null

  return {
    parse: ( row:string ) => {
      if ( rx_index.test(row) )
      {
        currentDiff = {
          index: row.match(rx_index)[0],
          leftRows: [],
          rightRows: [],
        }
        diffs.push(currentDiff)
      }
      if ( currentDiff )
      {
        if ( rx_leftRow.test (row) )
        {
          currentDiff.leftRows.push(row.substr(2))
        }
        else if ( rx_rightRow.test (row) )
        {
          currentDiff.rightRows.push(row.substr(2))
        }
      }
      return row
    },
    result: () => {
      return diffs.slice()
    }
  }

}


export const parseDiff = ( source:string ) => {

  const rx_index = /^(.+)c(.+)$/gm
  const rx_leftRow = /^\>\ (.+)$/gm

  const matches = []
  do {

    const match = rx_index.exec(source)
    if ( !match )
      break
    
    const [ full, leftIndex, rightIndex ] = match
    const leftRowMatches = source.slice(match.index+match.length).match(rx_leftRow)
    matches.push({full,leftIndex, rightIndex, leftRowMatches})
  }while(true)

  return matches

}