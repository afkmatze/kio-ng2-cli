import { Component, OnInit } from '@angular/core';
import { RoutableComponent, FragmentDataComponent } from '../../../component-routing/module'
import { KioContentModel, KioFragmentModel } from 'kio-ng2-data'

@RoutableComponent({
  queryable: {
    type: '<%= contentType %>' ,
    modifiers: [<% for(var i=0; i<modifiers.length; i++) {%><%= i > 0 ? "," : "" %>'<%= modifiers[i] %>'<% } %> ] <% if(childTypes!==undefined) {%>,
    childTypes: [<% for(var i=0; i<childTypes.length; i++) {%><%= i > 0 ? "," : "" %>'<%= childTypes[i] %>'<% } %> ]  <% } %>
  },
  selector: '<%= selector %>',
  templateUrl: './<%= dasherizedModuleName %>.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>.component.scss']
})
export class <%= classifiedModuleName %>Component extends FragmentDataComponent {

  onNodeUpdate(){
    super.onNodeUpdate()    
  }

}
