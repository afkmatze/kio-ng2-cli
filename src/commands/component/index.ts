import { KioContentType } from 'kio-ng2'
import { KioComponentType, KioComponent, KioStructureComponent, KioPublicationComponent } from '../../interfaces/kio-component'
import { logError, log } from '../../console'
import { parseArgs } from '../../argv'
import * as path from 'path'
import * as env from '../../env/constants'
import * as stringUtils from '../../utils/string'

import { renderType } from './render'

import { CommandModule } from 'yargs'

export * from './yargs'
