import {
  Ingredient
} from "../model/ingredient.model";
import {
  EventEmitter
} from "@angular/core";

export class ShoppingListService {
  ingredientChanged = new EventEmitter < Ingredient[] > ();
  ingredients: Ingredient[] = [
    new Ingredient("Apple", 6),
    new Ingredient("Banana", 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.getIngredients());
  }

  addIngredientFromRecipe(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);
    this.ingredientChanged.emit(this.getIngredients());
  }
}
