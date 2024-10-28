import {Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {interval, map, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  clickCount = signal(0);
  private destroyRef = inject(DestroyRef)

  customInterval$ = new Observable((subscriber) => {
    let timeExecuted = 0;
    const interval = setInterval(() => {
      if(timeExecuted > 5) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
        subscriber.complete
        console.log('Emitting value');
        subscriber.next({message: 'Hello World!'});
        timeExecuted++;
    }, 2000)
  });

  ngOnInit(): void{
    // tworzenie subskrypcji
    // const timerSubscription = interval(1000).pipe(
    //   map(value => value * 2)
    // ).subscribe({
    //   next: (value) => console.log(value),
    //   complete: () => console.log('Complete')
    // });
    //
    // // usuwannie subskrypcji
    // this.destroyRef.onDestroy(() => {
    //   timerSubscription.unsubscribe();
    // });

    const customSub = this.customInterval$.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Complete)'),
      error: (err) => console.log(err),
    });

    this.destroyRef.onDestroy(() => {
      customSub.unsubscribe();
    });
  }

  constructor() {
    effect(() => {
      console.log(`Click count: ${this.clickCount()} times.`);
    });
  }

  onClickButton(){
  this.clickCount.update(value => value + 1);
  }

}
