import * as env from '../env/constants'
import * as cmd_indexes from './indexes'

export const BUILD_INDEXES:string = "indexes"

export const exec = ( command:"indexes"|string ) => {
  if(!command) {
    throw Error("Command required.")
  }

  switch (command) {
    case BUILD_INDEXES:
      return cmd_indexes.main ( env )
      break;
    
    default:
      throw Error("Unknown command \"" + command + "\"")
      break;
  }
}