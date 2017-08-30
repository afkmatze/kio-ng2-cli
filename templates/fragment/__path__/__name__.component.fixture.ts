import { mock } from 'kio-ng2-component-routing'
<% mods = JSON.parse(modifiers) %>
<% childs = JSON.parse(childTypes) %>
export const Fixture = mock.mockType ('<%= contentType %><% for(var i=0; i<mods.length; i++) {%>.<%= mods[i] %><% } %>',[<% for(var i=0; i<childs.length; i++) {%><%= i > 0 ? "," : "" %>'<%= childs[i] %>'<% } %>])
