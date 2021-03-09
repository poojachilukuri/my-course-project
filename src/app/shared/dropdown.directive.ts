import { Directive, ElementRef, HostBinding, HostListener, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class dropdownDirective{
    @HostBinding('class.open') isOpen =false;


@HostListener('document:click',['$event']) toggleOpen(event:Event){
    this.isOpen=this.elref.nativeElement.contains(event.target)? !this.isOpen : false;

}


constructor( private elref: ElementRef){

    }
}