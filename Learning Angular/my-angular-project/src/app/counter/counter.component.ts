import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  counterValue = 0;

  increment() {
    this.counterValue++;
  }

  decrement() {
    if (this.counterValue > 0) {
      this.counterValue--;
    }
  }
}
