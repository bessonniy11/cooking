import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {NavigationService} from "../../services/navigation.service";
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {AppService} from "../../services/app.service";


@Component({
  selector: 'home',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})
export class HomePage implements OnInit {
  currentPage = 1;
  appService: AppService;
  userService: UserService;
  navigationService: NavigationService;

  swiperGalleryConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    pagination: true,
    mousewheel: true,
    keyboard: true,
    setWrapperSize: true,
  };

  dishes = [
    {
      id:1,
      title:'Банановые блинчики из рисовой муки',
      gallery: [
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
      ],
      desc:
        'Вкусный, полезный, лёгкий завтрак для всей семьи! ' +
        'Приготовим румяные банановые блинчики из рисовой муки, ' +
        'на молоке. Блинчики понравятся тем, кто придерживается правильного питания.'
    },
    {
      id:2,
      title:'Гренки с тыквой (в духовке)',
      gallery: [
        'https://img1.russianfood.com/dycontent/images_upl/628/sm_627282.jpg',
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
      ],
      desc:
        'Хрустящий багет и сочная ароматная ' +
        'начинка — гренки с тыквой получаются ' +
        'яркими и очень вкусными. Эти бутерброды отлично подойдут к завтраку.'
    },
    {
      id:3,
      title:'Суп с цветной капустой, грибами, рисом и сливками',
      gallery: [
        'https://img1.russianfood.com/dycontent/images_upl/628/sm_627506.jpg',
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
      ],
      desc:
        'Рецепт очень вкусного овощного супа с цветной ' +
        'капустой и шампиньонами. Несмотря на отсутствие мяса, суп получается достаточно сытным. ' +
        'Рис делает суп густым и питательным, сливки придают нежность и приятный вкус, а пряности обеспечивают яркий аромат.'
    },
    {
      id:4,
      title:'Рассольник с курицей и перловой крупой',
      gallery: [
        'https://img1.russianfood.com/dycontent/images_upl/628/sm_627155.jpg',
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
      ],
      desc:
        'Рассольник с перловой крупой и курицей - простое, вкусное и сытное первое блюдо. ' +
        'Этот рецепт хорош тем, что курица варится гораздо быстрее, чем, например, говядина или свинина.'
    },
    {
      id: 5,
      title:'Жаркое из свинины с картошкой и капустой',
      gallery: [
        'https://img1.russianfood.com/dycontent/images_upl/625/sm_624280.jpg',
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
      ],
      desc:
        'Очень ароматное и аппетитное жаркое из свинины с картошкой и капустой. ' +
        'Свинину и овощи перед тушением по отдельности обжариваем – это несколько ' +
        'хлопотно, но результат оправдывает. Мясо получается очень нежным и мягким, а овощи – сочными.'
    },
    {
      id:6,
      title:'Сырники с яблоками (без муки)',
      gallery: [
        'https://img1.russianfood.com/dycontent/images_upl/628/sm_627334.jpg',
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
      ],
      desc:
        'Вкусный и полезный завтрак из самых простых продуктов — нежные ' +
        'румяные сырники с яблоками и манкой. Сырники получаются очень ' +
        'мягкими внутри, в меру сладкими, с румяной корочкой.'
    },
    {
      id:7,
      title:'Тефтели в томатно-тыквенном соусе',
      gallery: [
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
        'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
      ],
      desc:
        'Мясные тефтели в томатно-тыквенном соусе – это сытное второе блюдо. ' +
        'Соус из томатов в собственном соку, дополненный кусочками тыквы, луком и чесноком, ' +
        'готовится на овощном бульоне и получается достаточно густым и насыщенным. ' +
        'Тефтели обжариваются на сковороде, а затем соединяются с ароматным томатно-тыквенным соусом. ' +
        'Очень интересная вкусовая нотка – цедра лимона, которая добавляется в фарш для тефтелей.'
    },
  ];

  openText: any = null;

  constructor(
    userService: UserService,
    navigationService: NavigationService,
    appService: AppService,
  ) {
    this.appService = appService;
    this.userService = userService;
    this.navigationService = navigationService;
  }

  ngOnInit(): void {
  }

  loadMore(event: any) {
    this.currentPage++;
    // this.loadDishes(event);
  }


  goToThisItem(id: any, dish: any) {
    this.navigationService.goToUrl('dish/' + id, {}, {store: dish});
  }

  toggleText(index: any) {
    this.openText = this.openText === index ? null : index;
  }
}
