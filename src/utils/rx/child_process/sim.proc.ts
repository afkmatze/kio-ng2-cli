import { Observable } from 'rxjs'

export interface SimCommand {
  name:string;
  args?:any[]
}

const options = {
  exitCode: 0,
  duration: 1000 * 3,
  errorAfter: 0
}

if ( process && process.argv.length > 2 )
{
  for (var i = 2; i < process.argv.length; i++) {
     const arg = process.argv[i]
     if ( arg.startsWith('--') )
     {
       const opt = arg.slice(2)
       options[opt] = process.argv[++i]
     }
  }
}

setTimeout(()=>{
  process.exit(options.exitCode)
},options.duration)

const randomInt = (max=100,min=0)=>{
  return Math.floor(Math.random()*(max-min))+min
}

const chr_a = "a".charCodeAt(0)
const chr_z = "z".charCodeAt(0)

const randomChr = () => String.fromCharCode(randomInt(chr_z,chr_a))
const randomWord = (length=randomInt(23,2)) => {
  const out = []
  while(out.length < length)
  {
    out.push(randomChr())
  }
  return out.join('')
}

const spawnError = ( ) => {
  throw Error("This is a random Error")  
}


const text = ( words=randomInt(1000,300) ) => {
  let cnt = 0

  let currentRow = []
  const rows = [currentRow]
  
  while(cnt++ < words)
  {
    currentRow.push(randomWord())
    if ( cnt % 23 === 0 )
    {
      currentRow = []
      rows.push(currentRow)
    }
  }
  return rows
    .map ( row => row.join(' ') ).join('\n')
}

  
export const sim = ( simOpts?:any ) => {
  const {
    stdout=process.stdout, 
    stderr=process.stderr, 
    stdin=process.stdin,
    exit=process.exit
  } = simOpts || {}

  const MAX_GAP = 300
  const startTs = Date.now()

  const send = ( data:string ) => {
    stdout.write(data)
  }
  
  const sendError = ( data:string ) => {
    stderr.write(data+'\n')
  }

  let errorSent = false

  const next = () => {
    const now = Date.now()
    const d = now-startTs
    const t = Math.min(d,MAX_GAP)
    const tNext = randomInt(t,Math.min(t,100))

    if ( d >= options.duration )
    {
      return exit(options.exitCode)
    }

    if ( d > options.errorAfter && randomInt(1000) > 9990 )
    {
      errorSent = true
      sendError("This is an error")
      spawnError()
    }
    else {
      send(text())
    }

    setTimeout(next,tNext)
  }


  next()
}

sim()