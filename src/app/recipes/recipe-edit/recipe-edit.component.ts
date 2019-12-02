import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../recipe.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  /**
   * init form
   */
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }
  onSubmit() {
   console.log(this.recipeForm);
  }
  /**
   * init form edit/add recipe (reactive form)
   */
  private initForm(): void {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
    });
  }
}
