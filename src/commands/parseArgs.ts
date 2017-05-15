export type ListItem<T> = T|T[]

export const flatten = <T>( list:ListItem<T>[]|ListItem<T> ):T[] => {
  if ( !Array.isArray(list) )
    return flatten([list])
  const out:T[] = []
  const addItem = ( item:ListItem<T> ) => {
    if ( Array.isArray(item) )
    {
      item.forEach ( addItem )
    }
    else {
      out.push(item)
    }
  }
  list.forEach(item => {
    addItem(item)
  })
  return out
}

export const parseList = ( list:string|string[] ):string[] => {
  if ( 'string' === typeof list )
  {
    return parseList(list.split(/[\ |\,|\.]/gm))
  }
  return flatten(list)
}