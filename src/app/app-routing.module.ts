import {  NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes :Routes =[
  {path:'',redirectTo:'/recipes',pathMatch:'full'},
  {path: 'recipes' ,
  //loadChildren:'./recipes/recipe.module#RecipeModule'
    loadChildren:()=>import('./recipes/recipe.module').then(m=> m.RecipeModule)
  },
  {path: 'shopping-list',
   //loadChildren:'./shopping-list/shopping-list.module#ShoppingListModule'
   loadChildren:()=>import('./shopping-list/shopping-list.module').then(m=> m.ShoppingListModule)},
  {path:'auth',
    //loadChildren:'./auth/auth.module#AuthModule'
    loadChildren:()=>import('./auth/auth.module').then(m=> m.AuthModule)
  }
];
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{

}