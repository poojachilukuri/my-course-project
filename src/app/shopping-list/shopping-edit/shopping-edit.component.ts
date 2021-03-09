import { Component, OnInit,  ElementRef,ViewChild ,EventEmitter,Output, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredients } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredients;

  constructor( private shoppingListService: ShoppingListService ) { }

  ngOnInit(){
    this.subscription= this.shoppingListService.startedEiting.subscribe(
      (index:number)=>{
        this.editedItemIndex=index;
        this.editMode=true;
        this.editedItem=this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
            name:this.editedItem.name,
            amount:this.editedItem.amount
        })
      }
    )
  }

onSubmit(form: NgForm)
{
const value= form.value;
const newIngedient = new Ingredients(value.name,value.amount);
if(this.editMode){
  this.shoppingListService.updateIngredient(this.editedItemIndex,newIngedient)
}else{
  this.shoppingListService.onIngredientsAdded(newIngedient);
}
this.editMode= false;
form.reset();

}
onClear(){
  this.slForm.reset();
  this.editMode=false;
}
onDelete(){
  this.shoppingListService.deleteIngredient(this.editedItemIndex);
  this.onClear();
}
ngOnDestroy(){
  this.subscription.unsubscribe;
}
}



