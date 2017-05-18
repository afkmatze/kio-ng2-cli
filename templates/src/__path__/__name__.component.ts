import { Component } from '@angular/core';
import { SrcComponent } from '<%= pathToStructureComponents %>'

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
