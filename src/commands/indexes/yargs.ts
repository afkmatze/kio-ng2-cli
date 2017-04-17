import { KioContentType } from 'kio-ng2'
import { CommandModule } from 'yargs'
import * as fs from 'fs'
import { KioComponentType, KioComponent, KioStructureComponent, KioPublicationComponent } from '../../components/interfaces'
import { logError, log } from '../../console'
import * as path from 'path'
import * as env from '../../env'
import * as stringUtils from '../../utils/string'

import { findComponents } from '../../components/find'
import { Component } from '../../components/classes'
import * as templates from '../../templates'

import exec from './exec'

import * as api from '../../api'

export const yargs:CommandModule = {
  command: 'buildIndexes',
  aliases: ['index'],
  describe: 'Updates index files in ' + env.KIO_PATHS.root,
  builder: ( argv ) => {
    return argv
      .usage('Usage: $0 index [publication|structure|fixture|criteria]')
      .option('no-cache',{
        type: 'boolean',
        default: false,
        describe: 'prevent reading from cache'
      })
      .option('filter',{
        alias: 'f',
        choices: ['publication','navigation','structure','fixture','criteria'],
        default: ['publication','navigation','structure','fixture','criteria'],
        demand: true
      })
  },  
  handler: (args:any) => {
    const [ command ] = args._
    env.config.update({...args, command})
    exec(args)
    .toPromise()
      .then ((files) => {
        log('wrote %s index files', files.length)
      }).catch(error => {
        console.log('failed with "%s"', error)
        console.error(error)
      })
    /*args.filter.forEach ( filterValue => {
      api.writeIndex(filterValue,args["no-cache"]===false)
      //writeComponentsToIndex(path.join(env.KIO_PROJECT_ROOT,env.KIO_PATHS.root),stringUtils.classify(filterValue+'Components'),files)
    } )*/
    //console.log('files',args)
  }
}