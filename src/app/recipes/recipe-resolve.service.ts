import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageServcie } from "../shared/data-storage.service";
import { RecipesComponent } from "./recipes.component";
import { Recipe } from "./recipes.model";
import { RecipesService } from "./recipes.service";

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
  
    constructor(private dataStorageServcie:DataStorageServcie,
                private reccipeService:RecipesService){}

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        const recipes=this.reccipeService.getRecipes();
        if(Recipe.length === 0)
        {
            return this.dataStorageServcie.fetchrecipe();
        } else{
            return recipes;
        }
    }
}