import { mock } from 'kio-ng2-component-routing'

export const Fixture = mock.mockType ('<%= contentType %><% modifiers.forEach(function(modifier){ %>
    .<%= modifier %>
  <% })%>', [<%= joinedChildTypes %>])
