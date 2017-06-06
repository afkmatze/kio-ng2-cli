import 'mocha'
import expect, { assert } from 'ceylon';

import { 
  FormatVariable, FormatVariableData, FormatVariableParseOptions, FormatVariableParam,
  isInstanceOf
} from './interfaces'
import { parse } from './parse'

type ValueTypeName = string|"string"|"number"|"boolean"|"object"

const allFlags = [ 's','d','f','o','O','b' ]

interface VariableMatchTest<T> {
  flag:string[1]
  param?:string
  value:T
  expect:string
  source:string
}

interface VariableTest<T extends any> {
  type:T
  tests: VariableMatchTest<T>[]
}

interface ValueTypeTestMap {
  [key:string]: VariableTest<any>
}

const createTypeMatchTest = <T>(flag:string[1], value:T, expect:string, param?:string ):VariableMatchTest<T> => {
  return {
    flag , 
    value ,
    expect ,
    param ,
    source: `%${param||''}${flag}`
  }
}

const createTypeTest = <T>( tests:VariableMatchTest<T>[] ):VariableTest<T> => {
  return <VariableTest<T>>{
    tests
  }
}

const TestTypeMap:ValueTypeTestMap = {
  string: createTypeTest<string>([
    createTypeMatchTest('s',"Hallo","Hallo")
  ]),  
  number: createTypeTest<number>([
    createTypeMatchTest('f',1.4233,"1.42","1.2")
  ]),
  object: createTypeTest<object>([
    createTypeMatchTest('o',{foo:"bar"},JSON.stringify({foo:"bar"}))
  ]),
  boolean: createTypeTest<boolean>([
    createTypeMatchTest('b',true,'true')
  ])
}

const testFormatType = <T>( typeName:ValueTypeName ) => {

  describe(`${typeName}`,()=>{
    const typeTest = TestTypeMap[typeName]
    const testType = typeTest.type
    const testData = typeTest.tests

    describe('parse',()=>{

      testData && testData.forEach ( <T>(testDataRow:VariableMatchTest<T>) => {

        const paramString:string = `%${testDataRow.param||''}${testDataRow.flag}`

        describe(`"${paramString}" to ${testDataRow.expect}`,()=>{
          const vars = parse(`%${testDataRow.param||''}${testDataRow.flag}`,{
            flags: allFlags
          })

          const firstVar = vars[0]

          it('parsed var',()=>{
            expect(vars).toExist()
            expect(vars.length).toEqual(1)
          })

          it(`parsed var contains flag: ${testDataRow.flag}`,()=>{
            expect(firstVar).toContainKey('flag')
            expect(firstVar.flag).toEqual(testDataRow.flag)
          })

          it(`parsed var contains source: ${testDataRow.source}`,()=>{
            expect(firstVar).toContainKey('source')
            expect(firstVar.source).toEqual(testDataRow.source)
          })

          it('parsed var contains "offset"',()=>{
            expect(firstVar).toContainKey('offset')
            expect(firstVar.offset).toEqual(0)
          })

          testDataRow.param && it('parsed var contains "param"',()=>{
            expect(firstVar).toContainKey('param')
            expect(isInstanceOf.FormatVariableParam(firstVar)).toBeTrue()
            if ( isInstanceOf.FormatVariableParam(firstVar) )
            {
              expect(firstVar.param).toEqual(testDataRow.param)
            }
          })
        })

      } )

    })
  })

}

describe('variables',function(){

  /*Object.keys(TestTypeMap).forEach ( key => {
    testFormatType(key)
  } )*/

  describe('string tests',()=>{

    describe('test 1 param',()=>{
      const test_format = 'Hello %s'
      const result = parse(test_format,{
        flags: allFlags
      })

      it('has 1 param',()=>{
        expect(result.length).toEqual(1)
      })

    })

    describe('test 2 param',()=>{
      const test_format = 'Hello %s foo %s bar'
      const result = parse(test_format,{
        flags: allFlags
      })

      it('has 2 param',()=>{
        expect(result.length).toEqual(2)
      })

    })

    describe('test 3 param',()=>{
      const test_format = 'Hello %s bla %s foo %s bla'
      const result = parse(test_format,{
        flags: allFlags
      })

      it('has 3 param',()=>{
        expect(result.length).toEqual(3)
      })

    })

    describe('test 4 param',()=>{
      const test_format = 'Hello %s foo %s foo %s foo %s dadada'
      const result = parse(test_format,{
        flags: allFlags
      })

      it('has 4 param',()=>{
        expect(result.length).toEqual(4)
      })

    })

  })

})