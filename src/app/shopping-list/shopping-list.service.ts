import {
  Ingredient
} from '../model/ingredient.model';

import { Subject, Observer, Observable } from 'rxjs';

export class ShoppingListService {
  ingredientChanged = new Subject < Ingredient[] > ();
  indexEditIngredient = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 6),
    new Ingredient('Banana', 10)
  ];
  /**
   * return all ingredient
   */
  getIngredients() {
    return this.ingredients.slice();
  }
  /**
   * return ingredient follow index in array
   * @param index ingredient in array
   */
  getIngredient(index: number): {'name': string, 'amount': number} {
    return this.ingredients[index];
  }
  /**
   * add new ingredient into array
   * @param ingredient new ingredient
   */
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.getIngredients());
  }
  /**
   * add ingredient from recipe into array
   * @param newIngredients array ingredient's recipe
   */
  addIngredientFromRecipe(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);
    this.ingredientChanged.next(this.getIngredients());
  }
  /**
   * update ingredient in array
   * @param index ingredient need update
   * @param newIngredient ingredient replace old ingredient
   */
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.getIngredients());
  }
}
