import { registerIndex } from 'kio-ng2-component-routing'
<% for( let i=0; i<indexItems.length; i++) { %>
import { <% if ( indexItems[i].importAlias ) { %> <%= indexItems[i].importAlias %> as <%}%><%= indexItems[i].importName %> } from '<%= indexItems[i].importPath %>'<% } %>

export { <%= indexItems.map((indexItem)=>indexItem.importName).join(', ') %> }

registerIndex ( 
  '<%= exportName %>',
  [<% for ( let j=0; j<indexItems.length; j++ ) { %>
      {
        componentName: '<%= indexItems[j].importName %>',
        symbol: <%= indexItems[j].importName %>
      }<% if(j<indexItems.length-1) {%>, <%}%><% } %>
  ]
)

export const <%= exportName %> = [ <%= indexItems.map((indexItem)=>indexItem.importName).join(', ') %> ]