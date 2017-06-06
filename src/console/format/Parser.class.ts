import formatTypes from './types'
import { FormatMappingArg, FormatValueType } from './types'
import * as variables from './variables'
import { FormatVariableArg, FormatVariableData, FormatVariableParam } from './variables'
import { 
  FormatSource, Param, FormatParam,  
  isInstanceOf
} from './interfaces'

export type Chunk<T> = FormatSource|Param<T>|FormatParam<T>

export interface ParseResult {
  chunks: Chunk<any>[]
}


export const variableToParam = <T>( value:T, typeName:string, variable:FormatVariableArg ) => {
  if ( variables.isInstanceOfFormatVariableParam ( variable ) )
  {
    return {
      flag: variable.flag,
      paramArgs: variable.param,
      offset: variable.offset,
      source: variable.source,
      typeName,
      value
    }
  }

  return {
    flag: variable.flag,
    offset: variable.offset,
    source: variable.source,
    typeName,
    value
  }
  
}

export class FormatParser {

  constructor(readonly format:string,readonly args:any[],readonly types:FormatValueType<any>[]=formatTypes){
    this.flags = []
    
    types.forEach ( <T>(formatType:FormatValueType<T>) => {
      const flags = formatType.flag.toString().match ( /([a-z]){1}/g )
      flags.forEach ( flag => {
        this.typeMap.set(flag,formatType)
        this.flags.push ( flag ) 
      } )
    } )
  }

  readonly typeMap:Map<string,FormatValueType<any>> = new Map()
  readonly flags:string[]

  parse():ParseResult {
    const result:ParseResult = {
      chunks: []
    }

    const addFormatSource = ( arg:FormatSource ) => {
      result.chunks.push(arg)
    }

    const addParam = <T>( arg:Param<T> ) => {
      result.chunks.push(arg)
    }

    const addFormatParam = <T>( arg:FormatParam<T> ) => {
      result.chunks.push(arg)
    }

    const args = this.args.slice()

    let lastOffset = 0
    variables
      .parse ( this.format, {
        flags: this.flags
      } )
      .forEach ( (variable:variables.FormatVariableArg,idx:number) => {
        const type = this.typeMap.get(variable.flag)
        //console.log('type for flag %s: ', variable.flag, '\n----\n', type, '\n----\n', variable)
        addFormatSource({
          source: this.format.substr ( lastOffset, variable.offset - lastOffset )
        })

        const param = variableToParam(args.shift(),type.typeName,variable)
        addFormatParam(param)
        lastOffset = variable.offset + variable.source.length
      } )
    addFormatSource({
      source: this.format.substr(lastOffset)
    })

    args.forEach ( value => {
      addParam({
        value
      })
    } )

    return result
  }
}