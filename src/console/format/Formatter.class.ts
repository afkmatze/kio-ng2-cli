import { ValueType, ValueFormatter, ValueTypeMatcher, TypeMatcher, ValueTypeFormatter } from './interfaces'

export class Formatter implements ValueFormatter<string>, ValueFormatter<number>, ValueFormatter<Date> {

  private types:Map<TypeMatcher,ValueTypeFormatter>=new Map();

  addType( typeMatcher:TypeMatcher, typeFormatter:ValueTypeFormatter ){
    this.types.set(typeMatcher,typeFormatter)
  }


  getValueFormatter(value){
    const matcherIterator = this.types.keys()
    let matcher:IteratorResult<TypeMatcher>
    do
    {
      matcher = matcherIterator.next()
      if (matcher.done)
        return null

      const m:TypeMatcher = matcher.value
      if ( m(value) )
        return this.types.get(m)
      
    }while(true)
  }

  formatValue(value){
    const formatter = this.getValueFormatter(value)
    if ( !formatter )
    {
      console.warn('no formatter for value',value)
    }
    else{
      value = formatter.formatValue(value)
    }
    return value
  }

  printf(format:string,...args:any[]){
    return format.replace(/\%\w/gm,(src:string,match:string,pos:number)=>{
      return this.formatValue(args.shift())
    })
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