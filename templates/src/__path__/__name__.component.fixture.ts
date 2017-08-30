import { mock } from 'kio-ng2-component-routing'
<% mods = JSON.parse(modifiers) %>

export const Fixture = mock.mockType ('<%= contentType %><% for(var i=0; i<mods.length; i++) {%>.<%= mods[i] %><% } %>')