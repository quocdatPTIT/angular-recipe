import {
  Ingredient
} from '../model/ingredient.model';

import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientChanged = new Subject < Ingredient[] > ();
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 6),
    new Ingredient('Banana', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.getIngredients());
  }

  addIngredientFromRecipe(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);
    this.ingredientChanged.next(this.getIngredients());
  }
}
