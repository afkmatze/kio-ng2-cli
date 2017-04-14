<% for( let i=0; i<components.length; i++) { %>
import { <% if ( components[i].importAlias ) { %> <%= components[i].importAlias %> as <%}%><%= components[i].importName %> } from '<%= components[i].importPath %>'<% } %>

export const <%= exportName %> = [ <%= components.map((component)=>component.importName).join(', ') %> ]