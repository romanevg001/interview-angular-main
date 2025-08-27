import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {  Subject, MonoTypeOperatorFunction, ObservableInput, Observable, BehaviorSubject } from 'rxjs';
import {  switchMap, takeUntil } from 'rxjs/operators';


@Component({
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class BaseComponent implements OnDestroy {
  private killSwitch = new Subject();

  unsubscribeOnDestroy<T>(): MonoTypeOperatorFunction<T>  {
    return takeUntil(this.killSwitch);
  }

  ngOnDestroy(): void {
    this.killSwitch.next(null);
    this.killSwitch.complete();
  }


}
