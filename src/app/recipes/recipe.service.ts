import {
  Injectable
} from '@angular/core';

import {
  Recipe
} from './recipe.model';
import {
  Ingredient
} from '../model/ingredient.model';
import {
  ShoppingListService
} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      1,
      'Dough Cook',
      'Italia Food',
      'https://cdn.pixabay.com/photo/2015/09/16/20/10/dough-943245_960_720.jpg',
      [new Ingredient('Potato', 5), new Ingredient('Beef', 10)]
    ),
    new Recipe(
      2,
      'Bread Cook',
      'Bread Food',
      'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg',
      [new Ingredient('Bread', 1), new Ingredient('Egg', 20)]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.find((value) => value.id === id);
  }

  addRecipeToShoppingList(newIngredients: Ingredient[]) {
    this.slService.addIngredientFromRecipe(newIngredients);
  }
}
