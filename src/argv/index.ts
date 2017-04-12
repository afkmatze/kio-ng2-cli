
export const parseArgs = ( argv:any[] ) => {
  const options:any = {}
  const args:string[] = []
  for(let i=0; i<args.length; i++) {
    const arg = args[i]
    if ( /^\-\-/.test ( arg ) )
    {
      options[arg.replace('--','')] = args[i+1]
      i++
    }
    else 
    {
      args.push(arg)
    }
  }
  return {
    options ,
    args
  }
}