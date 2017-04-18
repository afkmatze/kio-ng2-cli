import * as chalk from 'chalk'
import * as path from 'path'
import * as readline from 'readline'
import { formatter } from './format'

import * as api from './api'
import * as operators from './operators'


export * from './api'
import {LogOperatorPlugin,LogOperator} from './interfaces'
export * from './interfaces'
//export * from './operators'

export const map:LogOperator = operators.map
export const keys:LogOperator = operators.keys
