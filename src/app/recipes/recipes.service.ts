import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Recipe} from './recipes.model';

@Injectable()
export class RecipesService{
  recipeChanged= new Subject<Recipe[]>();

 //private  recipes: Recipe[]=[
   //     new Recipe('Egg Sherva',
     //   ' This is simple EGG recipe','https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',
       // [
         //   new Ingredients('Egg',4),
         //   new Ingredients('onion',2)
        //]),
      //  new Recipe('Chicken Aspargaus',
        //' This is simple test recipe','https://www.eatwell101.com/wp-content/uploads/2019/04/chicken-and-asparagus-skillet-recipe-2.jpg',
        //[
          //  new Ingredients('Aspargus',15),
          //  new Ingredients('meat', 2)
        //]),
        
      //];
      private recipes:Recipe[]=[];
      constructor(private shoppingListService:ShoppingListService){}
      getRecipes(){
         return  this.recipes.slice();
      }
      getRecipe(index:number){
        return this.recipes[index];
      }
      addIngredientsToShoppingList(ingredients:Ingredients[]){
        this.shoppingListService.addIngredients(ingredients);
      }
      addRecipe(recipe:Recipe){
          this.recipes.push(recipe);
          this.recipeChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number, newRecipe:Recipe){
          this.recipes[index]=newRecipe;
          this.recipeChanged.next(this.recipes.slice());
      }
      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
      }

      setRecipe(recipes: Recipe[]){
        this.recipes=recipes;
        this.recipeChanged.next(this.recipes.slice());
      }
}