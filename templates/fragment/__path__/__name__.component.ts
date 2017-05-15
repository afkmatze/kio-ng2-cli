import { Component, OnInit } from '@angular/core';
import { <%= classifiedParentComponentName %> } from 'kio-ng2-structure'

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherizedModuleName %>.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>.component.scss']
})
export class <%= classifiedModuleName %>Component extends <%= classifiedParentComponentName %> {

  onNodeUpdate(){
    super.onNodeUpdate()    
  }

}
