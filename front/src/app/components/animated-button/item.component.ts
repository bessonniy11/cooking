import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from "@angular/core";
import {trigger} from "@angular/animations";
import {
  bigButtonDefinition,
  brownButtonDefinition,
  whiteButtonDefinition
} from "../../core/animations/button-animation";
import {AppService} from "../../services/app.service";




@Component({
  selector: 'button-animate',
  templateUrl: 'item.component.html',
  styleUrls: ['item.component.scss'],
  animations: [
    trigger('browntouch', brownButtonDefinition),
    trigger('whitetouch', whiteButtonDefinition),
    trigger('bigtouch', bigButtonDefinition),
  ],
})


export class AnimatedButtonComponent implements OnInit{
  @Output() onClick : EventEmitter<any> = new EventEmitter<any>();
  @Input() animatedType = '';
  @Input() defaultClass = '';
  @Input() type = '';
  @Input() name = '';
  @Input() disabled = false;
  state:string='untapped'
  animate:boolean = false;
  constructor( public appService: AppService) {  }
  ngOnInit(): void {
    this.state=this.animatedType;

  }


  click(){
    this.onClick.emit()
  }

  onTouchStart(){
    if(!this.disabled) {
      this.state = "tapped"
    }
  }
  onTouchEnd(){
    if(!this.disabled) {
      this.state = "untapped"
    }
  }



}
