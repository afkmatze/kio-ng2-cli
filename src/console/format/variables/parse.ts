import { FormatVariableParseOptions, FormatVariableParam, FormatVariable, FormatVariableData } from './interfaces'

export type SimpleVariableMatch = any[string]

const mapToData = ( offset:number, source:string, flag:string ):FormatVariableData => {
  return {
    offset ,
    source ,
    flag
  }
}

const mapToParam = ( offset:number, source:string, flag:string, param:string ):FormatVariableParam => {
  return {
    offset ,
    source ,
    param ,
    flag
  }
}

const matchExpression = ( expr:RegExp, source:string ) => {
  const matches:RegExpExecArray[] = []

  let current:RegExpExecArray
  let lastOffset = -1
  while ( (current = expr.exec(source)) && !!current ) {
    if ( current.index <= lastOffset )
      break
    matches.push ( current )
    lastOffset = current.index
  }
  return matches
}

export const parse = ( formatString:string, options:FormatVariableParseOptions ):FormatVariableData[] => {

  const {
    flags
  } = options

  const expr = new RegExp(`%([0-9|.|,]+)?([${flags.join('')}]){1}`,'gm')
  const matches = matchExpression(expr,formatString)
  
  return matches
    .map ( (match:RegExpExecArray):FormatVariableData => {
      const {
        index
      } = match

      if ( match.length > 2 )
      {
        const [ source=undefined, param=undefined, flag=undefined ] = match
        return mapToParam ( match.index, source, flag, param )
      }
      else
      {
        const [ source=undefined, flag=undefined ] = match
        return mapToData ( match.index, source, flag )
      }
    } )

}