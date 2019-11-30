import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Ingredient
} from '../model/ingredient.model';
import {
  ShoppingListService
} from './shopping-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  subscription: Subscription;
  constructor(private shoppingService: ShoppingListService) {}
  /**
   * init component
   */
  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscription = this.shoppingService.ingredientChanged.subscribe(
      (newIngredients: Ingredient[]) => (this.ingredients = newIngredients)
    );
  }
  /**
   * pass index ingredient need edit
   * @param index ingredient in array
   */
  onEditIngredient(index: number) {
    this.shoppingService.indexEditIngredient.next(index);
  }
  /**
   * destroy ingredient
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
