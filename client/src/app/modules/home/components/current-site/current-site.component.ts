import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-current-site',
  templateUrl: './current-site.component.html',
  styleUrls: ['./current-site.component.scss'],
})
export class CurrentSiteComponent implements OnInit {
  currentWebsiteId: any;
  websiteData: any;

  questionsArray = [
    {
      property: 'Адаптивність сайту',
      recomendation: {
        equal: 4,
        moreEqal:
          'Адаптивність сайту під розміри свйту наявна. Рекомендацї до редизайну відсутні.',
        less: 'Адаптувати сайт під розміри екрану. Створити/підправити мобільну версію сайту.',
      },
    },
    {
      property: 'Відповідність інформації до тематики',
      recomendation: {
        equal: 3,
        moreEqal: 'Сайт відповідає бізнесу. Рекомендацї до редизайну відсутні.',
        less: 'Перевірити наповнення сайту. Доповнити сайт інформацією яка відповідає бізнесу.',
      },
    },
    {
      property: 'Зручність користування',
      recomendation: {
        equal: 4,
        moreEqal:
          'Сайт зручний у користуванні для більшості користувачів. Рекомендацї до редизайну відсутні.',
        less: 'Провести детальний аналіз навігації сайту та створити зручну і зрозумілу навігацію.',
      },
    },
    {
      property: 'Розташування блоків',
      recomendation: {
        equal: 3,
        moreEqal:
          'Розташування усіх блоків якісне. Сайт має зручний функціонал. Рекомендацї до редизайну відсутні.',
        less: 'Провести аналіз UX частини дизайну сайту. Змінити розташування меню, розділів, блоків та кнопок на сайті.',
      },
    },
    {
      property: 'Читабельність тексту',
      recomendation: {
        equal: 3,
        moreEqal:
          'Читабельність тексту на високому рівні. Рекомендацї до редизайну відсутні.',
        less: 'Змінити розмір шрифту. Зробити текст чітким (змінити колір шрифту, змінити жирність шрифту). Виділити основні тези заголовками.',
      },
    },
    {
      property: 'Стиль шрифтів',
      recomendation: {
        equal: 3,
        moreEqal:
          'Шрифт відповідає правилам типографіки. Рекомендацї до редизайну відсутні.',
        less: 'Змінити шрифт тексту у відповідності до правил типографіки. Вибрати єдинний шрифт основного контенту.',
      },
    },
    {
      property: 'Наповнення сайту',
      recomendation: {
        equal: 4,
        moreEqal:
          'Наповнення сайту є якісним. Контент відповіда бізнесу сайту. Рекомендацї до редизайну відсутні.',
        less: 'Провести детальний аналіз контенту сайту. Змінити наповнення сайту. Додати необхідну інформацію та потрібні розділи.',
      },
    },
    {
      property: 'Кольорова гамма',
      recomendation: {
        equal: 3,
        moreEqal:
          'Кольорова гамма сайту відповідає правилам колористики. Рекомендацї до редизайну відсутні.',
        less: 'Провести аналіз кольорової гамми. Змінити кольорову гамму відповідно до правил колористики.',
      },
    },
    {
      property: 'Якість елементів дизайну',
      recomendation: {
        equal: 3,
        moreEqal:
          'Зображення та ілюстрації мають хорошу/відмінну якість. Рекомендацї до редизайну відсутні.',
        less: 'Змінити зображення та ілюстрації які наповнюють сайт на якісні, або підвищити їх якість за можливістю.',
      },
    },
    {
      property: 'Зрозумілість графічних зображень',
      recomendation: {
        equal: 3,
        moreEqal:
          'Графічні зображення є зрозумілими для користувачів. Рекомендацї до редизайну відсутні.',
        less: 'Змінити графічні зображення на ті, які відповідають інформації в описі.',
      },
    },
    {
      property: 'Враження про дизайн сайту',
      recomendation: {
        equal: 2,
        moreEqal:
          'Дизайн сайту відповідає останнім тенденціям та подобається більшості користувачів.Рекомендацї до редизайну відсутні.',
        less: 'Змінити стиль сайту з врахуванням останніх тенденцій дизайну.',
      },
    },
  ];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.route.paramMap.subscribe((paramsMap: any) => {
      this.currentWebsiteId = paramsMap.params.id;
    });
  }

  ngOnInit(): void {
    this.getWebsiteById(this.currentWebsiteId);
  }

  getWebsiteById(id: number) {
    this.apiService.getWebsitesQuestionsById(id).subscribe((websiteRes) => {
      if (websiteRes) {
        this.websiteData = websiteRes;

        this.websiteData.answers = this.websiteData.answers.map(
          (element: any, index: number) => {
            const average = element.average ? (+element.average).toFixed(1) : 0;
            return {
              ...element,
              average: average,
              propertyName: this.questionsArray[index].property,
              recomendation:
                this.questionsArray[index].recomendation.equal > average
                  ? this.questionsArray[index].recomendation.less
                  : this.questionsArray[index].recomendation.moreEqal,
            };
          }
        );

        console.log(this.websiteData);
      }
    });
  }
}
