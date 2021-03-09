import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-resolve.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesDetailsComponent } from "./recipes-details/recipes-details.component";
import { RecipesComponent } from "./recipes.component";

const routes:Routes=[
    {path:'', 
  component:RecipesComponent,
  canActivate:[AuthGuard],
 children:[
   {path:'',component:RecipeStartComponent},
   {path:'new', component:RecipeEditComponent},
   {path:':id', component:RecipesDetailsComponent,resolve:[RecipeResolverService]},
   {path:':id/edit', component:RecipeEditComponent,resolve:[RecipeResolverService]}
 ]},
];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[ RouterModule]
})
export class RecipeRoutingModule{

}