import { IndexTypes, IndexType } from '../interfaces'

export const filterByIndexType = ( indexType:IndexType ) => {
  let expr
  switch (indexType) {
    
    case IndexTypes.navigation:
    case IndexTypes.structure:
    case IndexTypes.publication:
      expr = /\.component\.ts$/
      break;

    case IndexTypes.fixture:
      expr = /\.component\.fixture\.ts$/
      break;

    case IndexTypes.criteria:
      expr = /\.component\.criteria\.ts$/
      break;    
  }

  return ( filename:string="", idx?:number, files?:string[] ) => {
    return filename ? expr.test(filename) : false
  }
}