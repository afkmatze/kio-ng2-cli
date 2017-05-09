import { IndexTypes, IndexType } from '../interfaces'
import * as path from 'path'

export const filterByIndexType = ( indexType:IndexType ) => {
  let expr
  switch (indexType) {
    
    case IndexTypes.navigation:
    case IndexTypes.structure:
    case IndexTypes.publication:
      expr = /\.component\.ts$/
      break;

    case IndexTypes.fixture:
      expr = /\.fixture\.ts$/
      break;

    case IndexTypes.criteria:
      expr = /\.criteria\.ts$/
      break;    
  }

  return ( filename:string="", idx?:number, files?:string[] ) => {
    return filename ? expr.test(path.basename(filename)) : false
  }
}