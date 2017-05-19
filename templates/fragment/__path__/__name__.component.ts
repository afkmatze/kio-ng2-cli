import { Component, OnInit } from '@angular/core';
import { KioAbstractFragmentComponent } from '<%= pathToStructureComponents %>'

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherizedModuleName %>.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>.component.scss']
})
export class <%= classifiedModuleName %>Component extends KioAbstractFragmentComponent {

  onNodeUpdate(){
    super.onNodeUpdate()    
  }

}
