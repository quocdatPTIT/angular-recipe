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
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
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

  /**
   * constructor recipe service
   * @param slService recipe service
   */
  constructor(private slService: ShoppingListService) {}

  /**
   * get all recipe
   */
  getRecipes() {
    return this.recipes.slice();
  }

  /**
   * get recipe by id
   * @param id recipe
   */
  getRecipe(id: number) {
    return this.recipes.find((value) => value.id === id);
  }

  /**
   * add recipe to shopping list
   * @param newIngredients new ingredient to shopping list
   */
  addRecipeToShoppingList(newIngredients: Ingredient[]) {
    this.slService.addIngredientFromRecipe(newIngredients);
  }

  /**
   * add new recipe to array
   * @param newRecipe new recipe add array
   */
  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.getRecipes());
  }

  /**
   * update recipe
   * @param id recipe
   * @param newRecipe new recipe replace old recipe at index
   */
  updateRecipe(id: number, newRecipe: Recipe) {
    const index = this.recipes.findIndex(value => value.id === id);
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.getRecipes());
  }

  /**
   * delete recipe at index
   * @param id recipe
   */
  deleteRecipe(id: number) {
    const index = this.recipes.findIndex(value => value.id === id);
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.getRecipes());
  }
}
