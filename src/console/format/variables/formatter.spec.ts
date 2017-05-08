import 'mocha'
import expect, { assert } from 'ceylon'
import { 
  mockType, mockParam, MockedParam, randomValue, randomInt, values, 
  mockTest,
  TestData,
  TestParams, TestParam
} from '../../../test/mock'

import { 
  ValueTypeSimple, ValueType, 
  ValueFormatter, ValueMatcher, 
  TypeMatcher, ValueTypeFormatter, ValueTypeMatcher,
  TypeFormat,
  formatter,
  isInstanceOf
} from '../'


const typeNameIsString = ( typeName:any, value:any ):value is string => {
  return typeName === 'string'
}

const typeNameIsNumber = ( typeName:any, value:any ):value is number => {
  return typeName === 'number'
}


const TEST_FORMAT:TestParams[] = [
  ['Hello',mockParam('s',null,'World'),'today is',mockParam('o')]
]

const logTestData = ( testData:TestData ) => {
  console.log('format\n••••••\n',testData.format,'\n••••••\n')
  console.log('args\n[\n')
  testData.args.forEach ( (arg,idx) => {
    console.log('--')
    console.log('#Arg %s\t[%s]',idx, typeof arg)
    console.log(arg)
    console.log('-')        
  } )
}



describe('test formatter',()=>{

  const execTest = ( params:TestParams, idx ) => {

    const testData = mockTest ( params )
    describe('TEST_FORMAT ' + idx + ` "${testData.format}"`,()=>{
      //logTestData(testData)
      const result = formatter.printf ( testData.format, ...testData.args )
      expect(result).toEqual(testData.expect)
      //console.log('result\n=====\n',result,'\n====\n')
    })
  }

  TEST_FORMAT.forEach(execTest)

})