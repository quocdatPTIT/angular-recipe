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

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscription = this.shoppingService.ingredientChanged.subscribe(
      (newIngredients: Ingredient[]) => (this.ingredients = newIngredients)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
