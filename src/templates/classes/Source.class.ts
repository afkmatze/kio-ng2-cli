import { Readable, ReadableOptions, Writable, WritableOptions } from 'stream'
import { TemplateName } from '../interfaces'
import { KIO_PATHS, TEMPLATES, path } from '../../env'

export const resolveTemplateSource = ( templateName:TemplateName ):string => {
  return path.join(TEMPLATES,templateName)
}

export interface TemplateSourceOptions {
  templateName:TemplateName;  
}

export class TemplateSource extends Readable {

  constructor(options:TemplateSourceOptions){
    super({
      objectMode: true
    })
    this.setTemplateName(options.templateName)
  }

  protected setTemplateName(templateName:TemplateName){
    this.templateName = templateName
    this.templateFilepath = path.resolve(TEMPLATES,templateName)
  }

  private templateName:TemplateName
  private templateFilepath:string

  private sizeCount:number=0

  protected _read(size:number){
    console.log('should read "%s"',size)

    const message = `Hello World #${++this.sizeCount}, at ${new Date()}`
    this.push(message)

    if ( this.sizeCount >= 10 )
    {
      this.push(null)
    }
  }

}