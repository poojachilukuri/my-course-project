import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',

templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
 
  recipes: Recipe[];
  
  constructor(private recipesService:RecipesService,
    private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.recipesService.recipeChanged.subscribe(
      (recipes:Recipe[])=>{
          this.recipes=recipes;
      });
      this.recipes=this.recipesService.getRecipes();  
  }
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route});

  }
}
