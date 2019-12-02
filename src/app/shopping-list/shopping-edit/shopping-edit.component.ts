import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Ingredient } from '../../model/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
  // @ViewChild('amountInput', {static: false}) amountInput: ElementRef;
  @ViewChild('form', {static: false}) ingredientForm: NgForm;
  subcription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingService: ShoppingListService) { }
  /**
   * init component
   */
  ngOnInit() {
    /**
     * subcribe index ingredient take edit
     */
    this.subcription = this.shoppingService.indexEditIngredient.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.displayEditedItem(this.editedItemIndex);
      }
    );
  }
  /**
   * add new ingredient
   * @param form in shopping-edit html
   */
  onAddIngredient(form: NgForm) {
    // const name = this.nameInput.nativeElement.value;
    // const amount = this.amountInput.nativeElement.value;
    console.log(form);
    const value = form.value;
    const newIngredient =  new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingService.addIngredient(newIngredient);
    }
  }
  /**
   * display ingredient edit in form
   * @param index ingredient need edit
   */
  displayEditedItem(index: number) {
    this.editedItem = this.shoppingService.getIngredient(this.editedItemIndex);
    this.ingredientForm.form.patchValue({
      name: this.editedItem.name,
      amount: this.editedItem.amount
    });
  }
  /**
   * clear form after update/add
   */
  onClearForm() {
    // Reset form after add or update
    this.editMode = false;
    this.ingredientForm.reset();
  }
  /**
   * delete ingredient
   */
  onDeleteItem() {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClearForm();
  }
  /**
   * destroy component
   */
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
