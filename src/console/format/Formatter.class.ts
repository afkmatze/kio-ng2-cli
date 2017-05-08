import { 
  FormatSource, Param, FormatParam,
  isInstanceOf
} from './interfaces'

import { 
  FormatValueType
} from './types'

import { FormatParser, ParseResult, Chunk } from './Parser.class'

export interface TypeFilter<T> {
  ( valueType:FormatValueType<T>, idx?:number ):boolean
}

export class Formatter {

  private types:Set<FormatValueType<any>>=new Set();

  addType<T>( formatValueType:FormatValueType<T> ) {
    this.types.add(formatValueType)
  }

  getTypeByName <T>( typeName:string ):FormatValueType<T> {
    return Array.from(this.types).find ( <T>(type:FormatValueType<T>) => {
      return type.typeName === typeName
    } )
  }

  getTypeByValue <T>( value:T ) {
    return Array.from(this.types).find ( <T>(type:FormatValueType<T>) => {
      return type.checkType ( value )
    } )
  }

  parse ( format:string, ...args:any[] ):ParseResult {
    const parser = new FormatParser(format, args, Array.from(this.types.values()))
    const result = parser.parse()
    return result
  }

  printf ( format:string, ...args:any[] ):string {
    const chunks = this.parse(format,...args).chunks
    //console.log('prinf::chunks', chunks)
    return chunks
          .map ( <T>(chunk:Chunk<T>,idx:number) => this.renderChunk ( chunk, idx ) )
          .join('')
  }

  protected renderChunk <T>( chunk:Chunk<T>, idx:number ):string {

    if ( isInstanceOf.FormatParam<T> ( chunk ) )
    {
      const type = this.getTypeByName<T> ( chunk.typeName )
      const rendered = type.render ( chunk )
      //console.log('render chunk #%s with type', idx, type.typeName, chunk, '\n[RENDERED]\n', rendered, '\n-----' )
      return rendered
    }

    if ( isInstanceOf.FormatSource ( chunk ) )
    {
      return chunk.source
    }

    if ( isInstanceOf.Param<T> ( chunk ) )
    {
      const type = this.getTypeByValue<T> ( chunk.value )
      return type.render ( chunk )
    }
  }

  formatStringValue(value:string){
    return value
  }

  formatNumberValue(value:number){
    return `${value}`
  }

  formatDateValue(value:Date){
    return `${value}`
  }
/*
  formatValue(value){
    if ( 'string' === typeof value )
      return this.formatStringValue(value)
    if ( 'number' === typeof value )
        return this.formatNumberValue(value)
    if ( 'boolean' === typeof value )
        return this.formatStringValue(value?'true':'false')
    if ( value instanceof Date )
        return this.formatDateValue(value)
    if ( value instanceof Buffer )
        return value.toString()
    return value
  }*/

}