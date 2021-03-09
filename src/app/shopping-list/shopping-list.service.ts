import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredients } from "../shared/ingredients.model";

export class ShoppingListService{
    ingredientsChanged =new Subject<Ingredients[]>();
    ingredientAdded= new Subject<Ingredients>();
    startedEiting= new Subject<number>();
  private  ingredients: Ingredients[]=[
        new Ingredients('Apples', 5),
        new Ingredients('oranges', 10),
      ];


getIngredients(){
    return this.ingredients.slice();
}
getIngredient(index:number){
  return this.ingredients[index];
}
onIngredientsAdded(ingredient:  Ingredients){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients:Ingredients[]){
    //for (let ingredient of Ingredients){
   // this.ingredientAdded(ingredient);
   // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());

  }
  updateIngredient(index: number, newIngredinet:Ingredients){
    this.ingredients[index]= newIngredinet;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
} 