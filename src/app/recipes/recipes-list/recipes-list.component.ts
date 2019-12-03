import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  recipes: Recipe[];

  /**
   * constructor component
   * @param recipeService recipe service
   * @param router router component
   * @param route activated router component
   */
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }

  /**
   * Handle when click New Recipe button
   */
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  /**
   * destroy component
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
