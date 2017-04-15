import { ComponentTemplateData, IndexTemplateData } from './interfaces'
import * as ejs from 'ejs'
import * as fs from 'fs'
import * as path from 'path'
import { find } from 'shelljs'
import { readFile, getFiles } from './read'

import { Component, PublicationComponent } from '../components'

export type ComponentArg = PublicationComponent|Component

const writeFile = ( filename:string, data:string ) => new Promise((resolve,reject)=>{
  fs.writeFile(filename,data,{encoding: 'utf8'},(error)=>{
    error ? reject(error) : resolve()
  })
})

/*

const renderComponentIndex = ( ) => {
  const componentNames:string[] = []
  const singleImports = files.map ( fileComponent => {
    componentNames.push ( fileComponent.name+'Component' )
    return `import { ${fileComponent.name}Component } from './${path.relative(indexPath,fileComponent.dir)}/${fileComponent.dasherizedName}.component'`
  } )

  return `${singleImports.join('\n')}

export { ${componentNames.join(', ')} }
export const ${indexName} = [ ${componentNames.join(', ')} ]
  `
}

const renderFixtureIndex = ( indexPath:string, indexName:string , files:ComponentArg[] ) => {
  const componentNames:string[] = []
  const singleImports = files.map ( fileComponent => {
    componentNames.push ( fileComponent.name )
    return `import { Fixture as ${fileComponent.name} } from './${path.relative(indexPath,fileComponent.dir)}/${fileComponent.dasherizedName}.component.cquery.fixture'`
  } )

  return `${singleImports.join('\n')}

export { ${componentNames.join(', ')} }
  `
}

const renderCriteriaIndex = ( indexPath:string, indexName:string , files:ComponentArg[] ) => {
  const componentNames:string[] = []
  const singleImports = files.map ( fileComponent => {
    componentNames.push ( fileComponent.name )
    return `import { Criteria as ${fileComponent.name} } from './${path.relative(indexPath,fileComponent.dir)}/${fileComponent.dasherizedName}.component.cquery.fixture'`
  } )

  return `${singleImports.join('\n')}

export { ${componentNames.join(', ')} }
  `
}
*/