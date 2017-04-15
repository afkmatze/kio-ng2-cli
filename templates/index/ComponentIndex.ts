<% for( let i=0; i<indexItems.length; i++) { %>
import { <% if ( indexItems[i].importAlias ) { %> <%= indexItems[i].importAlias %> as <%}%><%= indexItems[i].importName %> } from '<%= indexItems[i].importPath %>'<% } %>

export { <%= indexItems.map((indexItem)=>indexItem.importName).join(', ') %> }
export const <%= exportName %> = [ <%= indexItems.map((indexItem)=>indexItem.importName).join(', ') %> ]