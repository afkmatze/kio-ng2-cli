const stringUtils = require('ember-cli-string-utils')

export const dasherize = (str:string):string => stringUtils.dasherize(str)
export const decamelize = (str:string):string => stringUtils.decamelize(str)
export const camelize = (str:string):string => stringUtils.camelize(str)
export const classify = (str:string):string => stringUtils.classify(str)
export const underscore = (str:string):string => stringUtils.underscore(str)
export const capitalize = (str:string):string => stringUtils.capitalize(str)