export * from './resolveTarget'
export * from './interfaces'
import { find } from 'shelljs'
import { Template, TemplateFile, TemplateData, TemplateName, TemplateSource } from './interfaces'
import * as env from '../env'
import * as fs from 'fs'
import { Types } from './types'
import { renderTemplateFile } from './render'
import { resolveTargetWithName } from './resolveTarget'
import { findTemplateSourceFiles } from './files'
import {
  createTemplateSource, createTemplateByName, createTemplate
} from './create'

export { Types }

export * from './render'
export * from './files'
export * from './create'