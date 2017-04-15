export * from 'path'
import { join } from 'path'
import { KioPath } from './interfaces'

function pathJoin ( ...args:string[] ) {
  return create(this.toString(),...args)
}

export const create = ( ...args:string[] ) => {
  const out = join(...args)
  return <KioPath>Object.assign(out,{
    join: pathJoin.bind(out)
  })
}