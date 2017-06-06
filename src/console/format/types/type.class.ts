import { FormatValueMapper, FormatValueMappers } from './interfaces'
import { 
  ValueTypeSimple, ValueMatcher, FormatterFunction, FormatParam, FormatArg, FormatChunk,
  instanceOfFormatArg
} from '../interfaces'


export abstract class FormatValueType <T extends ValueTypeSimple> implements FormatValueMapper<T> {

  abstract typeName:string
  abstract flag:RegExp
  
  //abstract nextParam <T extends ValueTypeSimple>( source:string, offset?:number ):FormatParam<T>

  typeMatcher:ValueMatcher<T>
  valueFormatter:FormatterFunction<T>

  private _expression:RegExp
  get expression():RegExp {
    if ( !this._expression )
    {
      this._expression = new RegExp('%' + this.flag)
    }
    return this._expression
  }

  /*match ( source:string ):FormatParam<T>[] {
    let param:FormatParam<T> = undefined
    let offset = 0

    const params:FormatParam<T>[] = []

    while ( param = this.nextParam<T>(source,offset) )
    {
      param.formatMapper = this
      params.push ( param )
      offset = param.offset + param.length
    }

    return params
  }*/


  /*nextIndex ( source:string ):number {
    const arg = this.nextParam ( source )
    return arg.offset ? arg.offset : -1
  }*/

  isEqual ( other:FormatValueType<T> ):boolean {
    return this.typeName === other.typeName
  }

  checkType ( value:any ) {
    return this.typeName === typeof value
  }


  render(formatArg:FormatArg<T>,idx?:number):string {
    if ( instanceOfFormatArg<string>(formatArg) )
    {
      return formatArg.value
    }
    return JSON.stringify(formatArg.value,null,'  ')
  }
}