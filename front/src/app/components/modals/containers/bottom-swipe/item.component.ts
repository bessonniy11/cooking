import {AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {animate, state, style, transition, trigger,} from '@angular/animations';
import {ModalContainerComponent} from "../../modal-container.component";

export const TRANSITION_DELAY = 250;

const animateOptions = {
  timing: `${TRANSITION_DELAY}ms cubic-bezier(0, 0, 0.2, 1)`,
  backdrop: {
    open: style({background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)'}),
    closed: style({background: 'rgba(255, 255, 255, 0)', backdropFilter: 'blur(0px)'})
  },
  container: {
    open: style({transform: 'translateY(0px)'}),
    closed: style({transform: 'translateY(100%)'})
  }
};

@Component({
  selector: 'app-modal-bottom-swipe-container',
  templateUrl: './item.html',
  styleUrls: ['./item.scss'],
  animations: [
    trigger('backdrop', [
      state('open', animateOptions.backdrop.open),
      state('closed', animateOptions.backdrop.closed),
      transition('void => open', [
        animateOptions.backdrop.closed,
        animate(animateOptions.timing)
      ]),
      transition('* => open', [
        animate(animateOptions.timing)
      ]),
      transition('* => closed', [
        animate(animateOptions.timing)
      ]),
    ]),
    trigger('container', [
      state('open', animateOptions.container.open),
      state('closed', animateOptions.container.closed),
      transition('void => open', [
        animateOptions.container.closed,
        animate(animateOptions.timing)
      ]),
      transition('* => open', [
        animate(animateOptions.timing)
      ]),
      transition('* => closed', [
        animate(animateOptions.timing)
      ]),
    ]),
  ],
})

export class ModalBottomSwipeContainerComponent extends ModalContainerComponent implements AfterViewInit {
  // Используется в modalService для определения контейнера под дочерний компонент
  @ViewChild('vc', {read: ViewContainerRef, static: true}) vc!: ViewContainerRef;
  @ViewChild('container') containerEl!: ElementRef;
  @ViewChild('backdrop') backdropEl!: ElementRef;
  public viewRef!: ViewContainerRef;

  // расстояние сдвига после startSwipe
  private deltaY = 0;
  private screenY = 0;
  private scrollDistance = 0;
  private scroll = 0;
  // Последние 10 событий TouchMove. А именно расстояние сдвига (y) и время (timeStamp)
  private velocity: { timestamp: number; y: number }[] = [];
  private timer: any = null;

  constructor() {
    super();
  }

  ngAfterViewInit() {
  }


  onTouchStart(e: TouchEvent) {
    this.scroll = this.scrollDistance;
    // устанавливаем, что контейнер находится в промежуточном состоянии анимации (!open && !closed)
    this.containerActive = null;
    this.screenY = e.touches[0].screenY;
    this.deltaY = 0;
    this.velocity.length = 0;
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  onTouchMove(e: TouchEvent) {
    // подсчитываем максимально возможный скролл

    // scroll === maxDelta - карточка полностью сдвинута вниз
    const maxDelta = this.containerEl.nativeElement.offsetHeight;
    // scroll === minDelta - карточка полностью выдвинута вверх и скролл достиг низа страницы
    const minDelta = this.containerEl.nativeElement.offsetHeight - this.containerEl.nativeElement.scrollHeight;

    // Записываем последние 10 событий TouchMove. А именно расстояние сдвига (y) и время (timeStamp)
    if (this.velocity.length > 9) {
      this.velocity.splice(0, 1);
    }
    this.velocity.push({timestamp: e.timeStamp, y: (e.touches[0].screenY - this.screenY) - this.deltaY});

    // рассчитываем расстояние сдвига после startSwipe
    this.deltaY = e.touches[0].screenY - this.screenY;
    // рассчитываем позицию свайпа карточки
    let scroll = this.scrollDistance + this.deltaY;
    // ограничиваем позицию свайпа по границам свайпа
    scroll = scroll > maxDelta ? maxDelta : scroll;
    scroll = scroll < minDelta ? minDelta : scroll;

    // Устанавливаем стили контейнеру в зависимости от позиции свайпа
    this.updateStyles(scroll);
  }

  onTouchEnd(e: TouchEvent) {
    this.scrollDistance = this.scroll;
    let delta = (this.velocity.reduce((a, b) => a + b.y, 0) / this.velocity.length) * 10 || 0;
    let time = e.timeStamp - (this.velocity[this.velocity.length - 1]?.timestamp || e.timeStamp);
    time = time > 50 ? 0 : time;
    delta = delta * time * 0.015;

    const maxDelta = this.containerEl.nativeElement.offsetHeight;
    const minDelta = this.containerEl.nativeElement.offsetHeight - this.containerEl.nativeElement.scrollHeight;
    let bounce = 1.1;
    this.timer = setInterval(() => {
      delta = delta / bounce;
      let scroll = this.scrollDistance + delta;
      scroll = scroll > maxDelta ? maxDelta : scroll;
      scroll = scroll < minDelta ? minDelta : scroll;
      this.scrollDistance = scroll;
      bounce = scroll < 0 ? 1.01 : 1.1;
      this.updateStyles(scroll);
      if (Math.abs(delta) < 0.5) {
        clearInterval(this.timer);
        this.scrollDistance = this.scroll;
        this.deltaY = 0;
        if (this.scrollDistance > this.containerEl.nativeElement.offsetHeight / 2) {
          this.close();
        } else {
          if (this.scrollDistance > 0) {
            this.scrollDistance = 0;
          }
          this.containerActive = 'open';
        }
      }
    }, 1);
  }

  private updateStyles(scroll: number) {
    this.scroll = scroll;
    const containerHeight = this.containerEl.nativeElement.offsetHeight;
    const percent = 1 - Number((scroll / containerHeight).toFixed(4));
    const rgb = Math.round((1 - percent) * 255);
    if (scroll < 0) {
      const el = this.containerEl.nativeElement.querySelector('.modal-container');
      if (el) {
        el.style.transform = `translateY(${scroll}px)`;
      }
    } else {
      this.containerEl.nativeElement.style.transform = `translateY(${scroll}px)`;
      this.backdropEl.nativeElement.style.background = `rgba(${rgb}, ${rgb}, ${rgb}, ${percent * 0.6})`;
      this.backdropEl.nativeElement.style.backdropFilter = `blur(${percent * 4}px)`;
    }
  }
}
