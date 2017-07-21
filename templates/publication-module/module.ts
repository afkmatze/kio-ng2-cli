import { NgModule } from '@angular/core'

<% for( let i=0; i<indexItems.length; i++) { %>
import { <% if ( indexItems[i].importAlias ) { %> <%= indexItems[i].importAlias %> as <%}%><%= indexItems[i].importName %> } from '<%= indexItems[i].importPath %>'<% } %>


import { FormatTimePipe } from './pipes/format-time.pipe'
import { KioNg2MarkdownModule, KioNg2MarkdownService } from 'kio-ng2-markdown'
import { kioFootnotes } from 'kio-ng2-markdown-footnotes'

import { KioNg2UIUXModule } from '../uiux/module'

export const <%= exportName %> = [ <%= indexItems.map((indexItem)=>indexItem.importName).join(', ') %> ]
@NgModule({
  imports: [
    KioNg2UIUXModule,
    /*KioNg2MarkdownModule.forRoot({
        converter: {
            extensions: [ <any>kioFootnotes ]
        }
    })*/
  ],
  providers: [
    FormatTimePipe
  ],
  declarations: [
    FormatTimePipe,
    ...<%= exportName %>
  ],
  entryComponents: [
    ...<%= exportName %>
  ],
  exports: [
    KioNg2UIUXModule,
    ...<%= exportName %>
  ]
})
export class KioNg2PublicationComponents {

}
