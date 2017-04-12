import { Component, OnInit } from '@angular/core';
import { <%= classifiedParentComponentName %> } from '<%= pathToStructureComponents %>/<%= dasherizedParentComponentPath %>/<%= dasherizedParentComponentPath %>.component'

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
