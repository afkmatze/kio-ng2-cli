import 'mocha'
import expect, { assert } from 'ceylon';
import assertFs from '../../../assert/fs';

import { 
  ValueTypeSimple, ValueType, 
  ValueFormatter, ValueMatcher, 
  TypeMatcher, ValueTypeFormatter, ValueTypeMatcher,
  TypeFormat,
  formatter,
  isInstanceOf
} from '../'

import { stringType, objectType, numberType, booleanType, FormatValueType } from './'

import * as variables from '../variables'

type ValueTypeName = string|"string"|"number"|"boolean"|"object"

interface ValueTypeMatch<T extends ValueTypeSimple> {
  format:string
  value:T
  expect:string
}

interface ValueTypeTest<T extends ValueTypeSimple> {
  type:T
  valueType:FormatValueType<T>
  matches?:ValueTypeMatch<T>[]
}

interface ValueTypeTestMap {
  [key:string]: ValueTypeTest<ValueTypeSimple>
}

const ValueTypeMap = {
  string: {
    type: "string",
    valueType: stringType,
    matches: [
      {
        format: 'Text: "%s"',
        value: 'Hallo Welt',
        expect: 'Text: "Hallo Welt"'
      }
    ]
  },
  number: {
    type: "number",
    valueType:numberType,
    matches: [
      {
        format: 'Value: %1.4f',
        value: 1.423432,
        expect: 'Value: 1.4234'
      }
    ]
  },
  /*date: {
    type: "Date",
    valueType:defaultTypes.date
  },*/
  boolean: {
    type: "boolean",
    valueType:booleanType
  },
  object: {
    type: "object",
    valueType:objectType
  }/*,
  buffer: {
    type: defaultTypes.Buffer
  }*/
}

const testFormatType = <T extends ValueTypeSimple>( typeName:ValueTypeName ) => {

  describe(`${typeName}`,()=>{
    const typeTest = ValueTypeMap[typeName]
    const testType = typeTest.type
    const testValueType = typeTest.valueType
    const testData = typeTest.matches

    describe('formatter',()=>{

      testData && testData.forEach ( (testDataRow:ValueTypeMatch<T>) => {
        it(`formats ${testDataRow.format} to ${testDataRow.expect}`,()=>{
          const formatted = formatter.printf(testDataRow.format,testDataRow.value)
          expect(formatted).toEqual(testDataRow.expect)
        })

        it('parses',()=>{

          const result = formatter.parse(testDataRow.format,testDataRow.value)
          expect(result).toContainKey('chunks')
          expect(result.chunks).toExist()
          expect(result.chunks.length).toEqual(3)
          const valueParam = result.chunks[1]
          //console.log('\n-----------\nvalueParam\n',valueParam,'\n-----\n')
          expect(isInstanceOf.Param(valueParam)).toBeTrue('param is not a Param')
          expect(variables.isInstanceOfFormatVariable(valueParam)).toBeTrue('param is not a FormatVariable')
          expect(isInstanceOf.FormatParam(valueParam)).toBeTrue('param is not a FormatParam')
          //console.log('result',result)

        })
      } )

    })
    
    describe('matcher',()=>{
      
      it('formats',()=>{
        //expect(testValueType.formatte).toExist()
      })

    })
  })

}

interface TestArgParams<T> {
  type:T
  numArgs:number
}

const testArgs = {
  "string": [ "Hello", "World", "Foo", "Bar" ],
  "number": [ 0, 1, 13, 42, 23.429, 0xFF ],
  "boolean": [ 0, 1, true, false ],
  "object": [ {foo: "bar"}, new Date() ]
}

describe('format types',function(){

  describe('string tests',()=>{

    describe('test 1 param',()=>{
      const numArgs = 1
      const test_format = 'Hello %s'
      const args = testArgs.string.slice(0,numArgs)
      //console.log('%s args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        //console.log('result.chunks',result.chunks)
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 2 param',()=>{
      const numArgs = 2
      const test_format = 'Hello %s foo %s bar'
      const args = testArgs.string.slice(0,numArgs)
      //console.log('%s args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 3 param',()=>{
      const numArgs = 3
      const test_format = 'Hello %s bla %s foo %s bla'
      const args = testArgs.string.slice(0,numArgs)
      //console.log('%s args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 4 param',()=>{
      const numArgs = 4
      const test_format = 'Hello %s foo %s foo %s foo %s'
      const args = testArgs.string.slice(0,numArgs)
      //console.log('%s args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

  })

  describe('floating number tests',()=>{

    describe('test 1 param',()=>{
      const numArgs = 1
      const test_format = 'Hello %1.2f'
      const args = testArgs.number.slice(0,numArgs)
      //console.log('%s args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        //console.log('result.chunks',result.chunks)
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 2 param',()=>{
      const numArgs = 2
      const test_format = 'Hello %1.2f foo %1.2f bar'
      const args = testArgs.number.slice(0,numArgs)
      //console.log('%1.2f args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 3 param',()=>{
      const numArgs = 3
      const test_format = 'Hello %1.2f bla %1.2f foo %1.2f bla'
      const args = testArgs.number.slice(0,numArgs)
      //console.log('%1.2f args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 4 param',()=>{
      const numArgs = 4
      const test_format = 'Hello %1.2f foo %1.2f foo %1.2f foo %1.2f'
      const args = testArgs.number.slice(0,numArgs)
      //console.log('%s args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

  })


  describe('number tests',()=>{

    describe('test 1 param',()=>{
      const numArgs = 1
      const test_format = 'Hello %d'
      const args = testArgs.number.slice(0,numArgs)
      //console.log('%s args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        //console.log('result.chunks',result.chunks)
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 2 param',()=>{
      const numArgs = 2
      const test_format = 'Hello %d foo %d bar'
      const args = testArgs.number.slice(0,numArgs)
      //console.log('%d args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 3 param',()=>{
      const numArgs = 3
      const test_format = 'Hello %d bla %d foo %d bla'
      const args = testArgs.number.slice(0,numArgs)
      //console.log('%d args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 4 param',()=>{
      const numArgs = 4
      const test_format = 'Hello %d foo %d foo %d foo %d'
      const args = testArgs.number.slice(0,numArgs)
      //console.log('%s args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

  })

  describe('boolean tests',()=>{

    describe('test 1 param',()=>{
      const numArgs = 1
      const test_format = 'Hello %b'
      const args = testArgs.boolean.slice(0,numArgs)
      //console.log('%s args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 2 param',()=>{
      const numArgs = 2
      const test_format = 'Hello %b foo %b bar'
      const args = testArgs.boolean.slice(0,numArgs)
      //console.log('%b args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 3 param',()=>{
      const numArgs = 3
      const test_format = 'Hello %b bla %b foo %b bla'
      const args = testArgs.boolean.slice(0,numArgs)
      //console.log('%b args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 4 param',()=>{
      const numArgs = 4
      const test_format = 'Hello %b foo %b foo %b foo %b'
      const args = testArgs.boolean.slice(0,numArgs)
      //console.log('%s args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

  })

  describe('object tests',()=>{

    describe('test 1 param',()=>{
      const numArgs = 1
      const test_format = 'Hello %o'
      const args = testArgs.object.slice(0,numArgs)
      //console.log('%s args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 2 param',()=>{
      const numArgs = 2
      const test_format = 'Hello %o foo %o bar'
      const args = testArgs.object.slice(0,numArgs)
      //console.log('%o args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 3 param',()=>{
      const numArgs = 3
      const test_format = 'Hello %o bla %o foo %o bla'
      const args = testArgs.object.slice(0,numArgs)
      //console.log('%o args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

    describe('test 4 param',()=>{
      const numArgs = 4
      const test_format = 'Hello %o foo %o foo %o foo %o'
      const args = testArgs.object.slice(0,numArgs)
      //console.log('%s args',numArgs, args)
      const result = formatter.parse(test_format,...args)

      it('has '+numArgs+' param',()=>{
        expect(result.chunks.length).toEqual((numArgs*2)+1)
      })

    })

  })

  Object.keys(ValueTypeMap).forEach ( key => {
    testFormatType(key)
  } )

})