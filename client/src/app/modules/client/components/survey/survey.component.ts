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
    { name: 'Адаптивність сайту', id: 1 },
    { name: 'Відповідність сайту бізнесу', id: 2 },
    { name: 'Зручність користування', id: 3 },
    { name: 'Розташування блоків', id: 4 },
    { name: 'Читабельність тексту', id: 5 },
    { name: 'Стиль шрифтів', id: 6 },
    { name: 'Наповнення сайту', id: 7 },
    { name: 'Кольорова гамма', id: 8 },
    { name: 'Якість елементів дизайну', id: 9 },
    { name: 'Зрозумілість графічних зображень', id: 10 },
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
