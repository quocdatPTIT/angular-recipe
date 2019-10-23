import {Component, OnInit, Input} from '@angular/core';
import {Recipe} from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css'],
})
export class RecipesDetailComponent implements OnInit {
  @Input() recipeDetail: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    
  }

  onToShoppingList() {
    const recipeSelected = this.recipeDetail;
    this.recipeService.addRecipeToShoppingList(recipeSelected.ingredients);
    console.log(recipeSelected);
  }
}
