import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title"><ng-content select="[card-header]"></ng-content></h5>

        <p  class="card-text"><ng-content select="[card-body]"></ng-content> </p>

        <div class="card-actions">
          <ng-content select="[card-actions]"></ng-content>
        </div>
      </div>
      
    </div>
  `,
})
export class CardComponent {


}
