import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as pizzaActions from '../actions';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {

  constructor(private actions$: Actions, private pizzaSrv: fromServices.PizzasService) {}

  @Effect()
  LoadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
      switchMap(() => {
        return this.pizzaSrv.getPizzas().pipe(
          map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
          catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
        );
      })
    );
}