import expectCeylon, { assert } from 'ceylon'

export interface ExtendingAssertionOptions {
  assertion: boolean;
  message: string;
  actual?: any;
  expected?: any;
}

export interface ExtendingAssertion {
  ( actual:any , ...args:any[] ):ExtendingAssertionOptions|void
}

export interface Extension {
  name:string
  assertion:ExtendingAssertion
}

export const extensions:Map<string,Set<Extension>> = new Map()


export const use = ( scope:string, extension:Extension ) => {

  if ( !extensions.has(scope) )
  {
    const set:Set<Extension> = new Set()
    extensions.set(scope,set)
    expectCeylon[scope] = ( actual:any ) => {
      const api = expectCeylon(actual)
      set.forEach(ext=>{
        const methodName = ext.name
        const negMethodName = methodName.replace(/^to/,'toNot')
        api[methodName] = ( ...args:any[] ) => ext.assertion(false,actual,...args)
        api[negMethodName] = ( ...args:any[] ) => ext.assertion(true,actual,...args)        
      })
      return api
    }
  }
    
  const scopeSet:Set<Extension> = extensions.get(scope)
  if(!scopeSet.has(extension))
  {
    scopeSet.add(extension)
  }

  const scopeTest = expectCeylon[scope]('')
/*  console.log('added scope "%s"' , scope)
  console.log('expectCeylon.%s',scope,expectCeylon[scope])
  console.log('added extension "%s"' , extension.name)
  console.log('expectCeylon.%s("").%s',scope,extension.name,scopeTest[extension.name])
*/
}




export { default as expect } from 'ceylon'