import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  // @Input() recipeDetail: Recipe;
  recipeDetail: Recipe;
  id: number;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // let id = parseInt(this.route.snapshot.params.id, 10);
    // this.recipeDetail = this.recipeService.getRecipe(id);
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     id = parseInt(params.id, 10);
    //     this.recipeDetail = this.recipeService.getRecipe(id);
    //   }
    // );
    // console.log(id);
    // console.log(this.recipeDetail);
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.recipeDetail = this.recipeService.getRecipe(this.id);
    });
  }

  onToShoppingList() {
    const recipeSelected = this.recipeDetail;
    this.recipeService.addRecipeToShoppingList(recipeSelected.ingredients);
    this.router.navigate(['/', 'shopping-list']);
    console.log(recipeSelected);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../new'], {relativeTo: this.route});
  }
}
