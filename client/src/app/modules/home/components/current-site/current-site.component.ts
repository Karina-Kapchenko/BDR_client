import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-current-site',
  templateUrl: './current-site.component.html',
  styleUrls: ['./current-site.component.scss']
})
export class CurrentSiteComponent implements OnInit {

  currentWebsiteId: any;
  websiteData: any;

  questionsArray = [
    'Адаптивність сайту',
    'Відповідність сайту бізнесу',
    'Зручність користування',
    'Розташування блоків',
    'Читабельність тексту',
    'Стиль шрифтів',
    'Наповнення сайту',
    'Кольорова гамма',
    'Якість елементів дизайну',
    'Зрозумілість графічних зображень',
  ]

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.route.paramMap.subscribe((paramsMap: any) => {
      this.currentWebsiteId = paramsMap.params.id
    })
  }

  ngOnInit(): void {
    this.getWebsiteById(this.currentWebsiteId);
  }

  getWebsiteById(id: number) {
    this.apiService.getWebsitesQuestionsById(id).subscribe((websiteRes) => {
        if(websiteRes) {
          this.websiteData = websiteRes

          this.websiteData.answers = this.websiteData.answers.map((element: any, index: number) => {
            return {
              ...element,
              average: element.average ? (+element.average).toFixed(1) : 0,
              propertyName: this.questionsArray[index]
            }
          });

          console.log(this.websiteData)
        }
    })
  }

}
