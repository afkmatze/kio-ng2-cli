import 'mocha'
import expect, { assertExists } from '../assert';
import assertFs from '../assert/fs'
import * as logger from '../console'
import * as env from '../env'
import { TemplateFiles, TemplateFile } from './interfaces'
import { getTemplateFiles, readTemplateFile } from './files'

describe('template files',()=>{

  describe('index template',()=>{

    const templateName = 'index'
    let indexTemplateFiles:TemplateFile[]
    let templateFiles:TemplateFiles

    it('create with name',()=>{
      indexTemplateFiles = getTemplateFiles(templateName)
      expect(indexTemplateFiles.length).toNotBe(0)
      indexTemplateFiles.forEach(item=>{
        expect(item.filename).toMatch(/\.\w+$/)
      })
      logger.log('indexTemplateFiles',indexTemplateFiles)
      templateFiles = {
        templateName: templateName,
        targetDir: env.resolve(env.KIO_PATHS.root),
        files: indexTemplateFiles
      }
    })

    it('reads files',()=>{
      const templateFile = readTemplateFile(templateFiles,templateFiles.files[0])
      expect(templateFile).toExist()
      expect(templateFile.source).toMatch(/export\ const\ /)
      //logger.log('templateFile',templateFile.source)
    })

  })


})