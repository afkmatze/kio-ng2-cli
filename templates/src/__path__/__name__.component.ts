import { Component } from '@angular/core';
import { KioAbstractSrcComponent } from '<%= pathToStructureComponents %>'

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherizedModuleName %>.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>.component.scss']
})
export class <%= classifiedModuleName %>Component extends KioAbstractSrcComponent {

  onNodeUpdate(){
    super.onNodeUpdate()    
  }

}
