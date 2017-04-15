import 'mocha'
import expect, { assertExists } from '../assert';
import assertFs from '../assert/fs'
import * as logger from '../console'
import * as env from '../env'
import { TemplateFiles, TemplateFile } from './interfaces'
import * as template from './'
import * as api from '../api'

describe('templates',()=>{

  describe('index template',()=>{

    const templateName = 'index'
    let indexTemplateFiles:TemplateFile[]
    let templateFiles:TemplateFiles

    it('render',()=>{
      const data = api.getIndexData("publication")
      logger.log('data',data)
      const files = api.render(templateName,data)
      logger.log('files \n',files.files.map(file => file.rendered).join('\n'))
    })

  })

  describe('publication component template',()=>{

    const templateName = 'publication'
    let indexTemplateFiles:TemplateFile[]
    let templateFiles:TemplateFiles

    it('render',()=>{
      const t = template.createTemplate("fragment",env.path.join(env.KIO_PATHS.components.publication,"fragment"))

      // const files = api.render(template)
      // logger.log('files \n',files.files.map(file => file.rendered).join('\n'))
    })

  })


})