import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {Ingredient} from '../../model/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInput: ElementRef;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
  }
  onAddIngredient() {
    const name = this.nameInput.nativeElement.value;
    const amount = this.amountInput.nativeElement.value;
    const newIngredient =  new Ingredient(name, amount);
    this.shoppingService.addIngredient(newIngredient);
  }
}
