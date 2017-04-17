import { LogOperator } from './interfaces'
import { operator as operatorMap, LogOperatorMap, LogWriterMap } from './operator/map'
import { operatorKeys, LogOperatorKeys, LogWriterKeys } from './operator/keys'
import * as api from './api'

export const map:LogOperatorMap = operatorMap(api)
export const keys:LogOperatorKeys = operatorKeys(api)

