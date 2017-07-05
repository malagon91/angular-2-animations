import {Component, trigger, state, style, transition, animate, keyframes} from '@angular/core';

@Component({
  selector: 'my-app',
  animations:[
    trigger('signal', [
      state('void', style({
        'transform':'translateY(-100%)'
      })),
      state('go', style({
        'background-color':'green',
        'height':'100px'
      })),
      state('stop', style({
        'background-color':'red',
        'height':'50px'
      })),
      transition('void => *', animate(8000, keyframes([ //void => * va del estado void a cualquier estado
        style({'transform':'scale(0)'}),  // go => void va de go a void
        style({'transform':'scale(.1)'}), // void <=> * es bidireccional da void a cualquiera y de cualquiera a void
        style({'transform':'scale(.9)'}),
        style({'transform':'scale(1)'}) // efecto de animacion en el elemento
      ]))),
      transition('* => *', animate('2s 1s cubic-bezier(0.455, 0.03, 0.515, 0.955)')) //cubic-- efecto de transform
    ]) // un segundo de delay .5s de transformacion
  ],
  styles:[`
.traffic-light{
    width: 100px;
    height: 100px;
    background-color: black;
}
`],
  template: `<div
    [@signal]="signal"
    class="traffic-light"
    *ngIf="isHere">
    
</div>
<button (click)="onGoClick()">Go</button>
<button (click)="onStopClick()">Stop</button>
<hr>
<button (click)="onToggleClick()">Toggle</button>`,
})
export class AppComponent  {
  signal:string;
  isHere = true;
  onGoClick(){
    this.signal = 'go';
  }
  onStopClick(){
    this.signal = 'stop';
  }
  onToggleClick(){
    this.isHere = !this.isHere;
  }
}