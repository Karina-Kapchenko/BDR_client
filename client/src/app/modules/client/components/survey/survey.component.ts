import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/modules/core/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {
  current_stage = 'start';
  activeSiteId: any;

  answersArray: any = [];

  questionsArray = [
    { name: 'Оцініть адаптивність сайту під розміри екрану', id: 1 },
    { name: 'На скільки інформація на сайті відповідає предметній області?', id: 2 },
    { name: 'Оцініть зручність користування сайтом', id: 3 },
    { name: 'Оцініть зручність розташування меню, розділів, блоків та кнопок на сайті', id: 4 },
    { name: 'Оцініть читабельність тексту на сайті', id: 5 },
    { name: 'На скільки вам подобається підібраний шрифт тексту?', id: 6 },
    { name: 'Наскільки інформація на сайті відповідає шуканій?', id: 7 },
    { name: 'На скільки вам подобаться кольорова гамма сайту?', id: 8 },
    { name: 'На скільки якісні зображення на сайті?', id: 9 },
    { name: 'На скільки вам зрозумілі графічні зображення?', id: 10 },
    { name: 'Оцініть дизайн сайту', id: 11 },
  ];

  acitveQuestion: any;
  currentSite: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: any) => {
      this.activeSiteId = params.id;
    });
  }

  ngOnInit(): void {
    this.getSiteQuestionsById(this.activeSiteId);
  }

  getSiteQuestionsById(id: number) {
    this.apiService
      .getWebsitesQuestionsById(id)
      .subscribe((siteQuestions: any) => {
        this.currentSite = siteQuestions;
      });
  }

  createAnswer(event: any) {
    if (
      event.srcElement.id === 'score' ||
      event.srcElement.parentNode.id === 'score'
    ) {
      const answerObj = {
        questionNumber: this.acitveQuestion,
        mark:
          event.srcElement.dataset.value ||
          event.srcElement.parentNode.dataset.value,
        siteId: this.activeSiteId,
      };
      this.answersArray.push(answerObj);
      if (
        this.acitveQuestion ===
        this.questionsArray[this.questionsArray.length - 1].id
      ) {
        this.postAnswers();
        return;
      }
      this.acitveQuestion += 1;
    }
  }

  startSurvey() {
    this.acitveQuestion = this.questionsArray[0].id;
    this.current_stage = 'active';
  }

  postAnswers() {
    const answersBlock = {
      siteId: this.activeSiteId,
      answers: this.answersArray
    }

    this.apiService.createAnswer(answersBlock).subscribe((answers: any) => {
      console.log(answers);
      this.current_stage = 'end';
    })
  }

  openLink() {
    window.open(this.currentSite.link)
  }
}
