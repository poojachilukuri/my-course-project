import { componentFactoryName, viewClassName } from "@angular/compiler";


import { Component,ElementRef,EventEmitter ,ViewChild,Output } from '@angular/core';

@Component({
    selector:'app-header',
    templateUrl :'./header.component.html'

})


export class headerComponent{
    @Output() featureSelected = new EventEmitter<string>();
    onSelect(feature:string){
        this.featureSelected.emit(feature);
    }
}