import { Component, OnInit } from '@angular/core';
import { KioAbstractTxtComponent } from '<%= pathToStructureComponents %>'

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherizedModuleName %>.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>.component.scss']
})
export class <%= classifiedModuleName %>Component extends KioAbstractTxtComponent {

  onNodeUpdate(){
    super.onNodeUpdate()    
  }

}
