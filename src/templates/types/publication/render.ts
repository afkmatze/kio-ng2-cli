import { Observable } from 'rxjs'
import { KIO_PATHS, TEMPLATES, path, config } from '../../../env'
import { ComponentModel } from '../../../components/classes'
import { IndexTemplateData } from '../interfaces'
import * as logger from '../../../console'
import { TemplateFile, TemplateData } from '../../interfaces'
import * as rxfs from '../../../utils/rx/fs'
import * as ejs from 'ejs'

export const renderTemplateFileWithData = ( templateFile:TemplateFile, data:TemplateData ):Observable<string> => {
  const source = Observable.of(templateFile.source.toString())
  return source
      .map(templateSource => ejs.render(templateSource, data))
}