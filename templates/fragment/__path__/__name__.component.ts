import { Component, OnInit } from '@angular/core';
import { RoutableComponent, FragmentDataComponent } from '../../../component-routing/module'
import { Criteria } from './<%= dasherizedModuleName %>.component.criteria'

import { KioContentModel, KioFragmentModel } from 'kio-ng2-data'

@RoutableComponent({
  queryable: Criteria,
  selector: '<%= selector %>',
  templateUrl: './<%= dasherizedModuleName %>.component.html',
  styleUrls: ['./<%= dasherizedModuleName %>.component.scss']
})
export class <%= classifiedModuleName %>Component extends FragmentDataComponent {

  onNodeUpdate(){
    super.onNodeUpdate()    
  }

}
