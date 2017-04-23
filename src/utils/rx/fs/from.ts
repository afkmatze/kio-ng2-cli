import { Observable, Observer, Subscription, Scheduler } from 'rxjs'
import { Readable } from 'stream'


export const fromReadable = function(readable:Readable) {
    return Observable.create(function(observer:Observer<Buffer>) {
        function nop() {};


        let buffer = ''

        const emit = ( rows:string[] ) => {
          Observable.from(rows).subscribe(
            nextFn,
            throwFn
          )
        }

        const onData = ( data:string ) => {
          const chunks = data.split('\n')
          const first = buffer + chunks[0]
          buffer = chunks.pop()
          const payload = [first,...chunks.slice(1)]          
          emit(payload)
        }

        var nextFn = observer.next ? observer.next.bind(observer) : nop;
        var returnFnCallback = observer.complete ? observer.complete.bind(observer) : nop;
        const returnFn = () => {
          if ( buffer )
          {
            emit([buffer])
          }
          returnFnCallback()
        }
        var throwFn = observer.error ? observer.error.bind(observer) : nop;
        
        readable.on('data', (data)=>{
          if ( 'string' === typeof data )
          {
            onData(data)
          }
          else 
          {
            onData(data.toString('utf8'))
          }
          //const rows = data.toString().split('\n')
/*          console.log('data length %s', data.length)
          console.log('---')
          console.log('%s',data)
          console.log('---')
*/        })
        readable.on('close',returnFn)
        readable.on('end', returnFn);
        readable.on('error', throwFn);

        return new Subscription(function() {
            readable.removeListener('data', nextFn);
            readable.removeListener('end', returnFn);
            readable.removeListener('close', returnFn);
            readable.removeListener('error', throwFn);
        });
    }, Scheduler.asap)
}