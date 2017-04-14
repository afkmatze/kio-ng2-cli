import * as fs from 'fs'

export const parseFile = ( filename:string ) => {
  const source = fs.readFileSync(filename,'utf8')

  const re_exports = /^export\ (\w+)\ (\w+)[\ \=]{0,1}\ (.*)$/gm

  const getExports = () => {
    const matches = []
    let match
    while ( match = re_exports.exec(source) )
    {
      const [ src, typename, varname, ...rest ] = match
      matches.push({src,typename,varname,rest})
    }
    return matches
  }
  const getValueOf = (exportName:string) => {

  }

  return {
    getExports
  }
}