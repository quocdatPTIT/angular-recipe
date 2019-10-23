import {
  Component,
  OnInit
} from "@angular/core";
import {
  Ingredient
} from "../model/ingredient.model";
import {
  ShoppingListService
} from "./shopping-list.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
  //providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.ingredientChanged.subscribe(
      (newIngredients: Ingredient[]) => (this.ingredients = newIngredients)
    );
  }
}
