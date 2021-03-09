import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{
  ingredients: Ingredients[];
  private isChangeSub:Subscription;

  constructor(private shoppingListService:ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients=this.shoppingListService.getIngredients();
    this.isChangeSub=this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients : Ingredients[])=>{
        this.ingredients=ingredients;
      }
    );
  }
  onEditItem(index:number){
    this.shoppingListService.startedEiting.next(index);
  }
  ngOnDestroy(){
    this.isChangeSub.unsubscribe();
  }
  
}
