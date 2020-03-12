import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '../services/courses.service';
import {Test} from '../model/test';
import {log} from 'util';
import {of} from 'rxjs';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  upper = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

  categories = [];
  tests = [];
  activeTopic = {id: '', name: ''};
  activeTest;
  test = null;
  otvet = false;
  examAnswer = [];


  listTests: Test[] = [];
  listQuestion = [];
  listQuestion2 = [];
  listAnswer = [];
  listAnswer2 = [];
  activeMyTest = null;
  activeMyTask = null;
  listMyAnswer = [];


  constructor(private api: CoursesService, private router: ActivatedRoute) {}

  ngOnInit() {
    this.getListTest(this.router.snapshot.paramMap.get('id'), '1');
  }

  shuffle(arr) {
    // tslint:disable-next-line:one-variable-per-declaration
    let i,
      j,
      temp;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
  //
  // // getListTest = (id, page) => {
  // //   this.tests = [];
  // //   this.api.getListTest(id, page).subscribe(
  // //     data => {
  // //       console.log(data);
  // //       this.activeTopic.id = id;
  // //       this.tests = data.results;
  // //
  // //       this.setActiveTest(1);
  // //
  // //       for (const item of data.results) {
  // //         const listQuestion = [];
  // //         for (const tast of item.task) {
  // //           listQuestion.push({
  // //             id: tast.id,
  // //             question: tast.question,
  // //             othersAnswer: tast.others_answer,
  // //             correctAnswer: tast.correct_answer,
  // //             myAnswer: [],
  // //             myCorrectAnswer: [],
  // //             myOthersAnswer: [],
  // //             valid: null,
  // //           });
  // //         }
  // //
  // //         this.listTests.push({topic: item.topic, question: listQuestion, end: null});
  // //       }
  // //
  // //       console.log('LIST TESTS');
  // //       console.log(this.listTests);
  // //
  // //     },
  // //     error => {
  // //       console.log(error);
  // //     }
  // //   );
  // // }
  //
  // // getListTest = (id, page) => {
  // //   this.tests = [];
  // //   this.api.getListTest(id, page).subscribe(
  // //     data => {
  // //       console.log(data);
  // //
  // //       for (const element of data.results) {
  // //
  // //         this.listQuestion = [];
  // //         this.listAnswer = [];
  // //         // for (const task of element.task) {
  // //         for (let i = 0; i < element.task.length; i++) {
  // //
  // //           for (const item of element.task[i].correct_answer) {
  // //             this.listAnswer.push({id: item.id, question: i, text: item.text, my: null});
  // //           }
  // //           for (const item of element.task[i].others_answer) {
  // //             this.listAnswer.push({id: item.id, question: i, text: item.text, my: null});
  // //
  // //           }
  // //           this.listQuestion.push({id: element.task[i].id, question: element.task[i].question, myAns: []});
  // //         }
  // //
  // //         this.listTests.push({id: 0, question: this.listQuestion});
  // //       }
  // //
  // //
  // //       // for (const item of data.results.entries()) {
  // //       //   console.log();
  // //       //   const taskList = [];
  // //       //   const answer = [];
  // //       //
  // //       //   for (const [index, task] of item.task) {
  // //       //
  // //       //     for (const ans of task.correct_answer) {
  // //       //       answer.push({id: ans.id, task: index, idAnswer: ans.id, answer: ans.text, correct: ans.id, myAnswer: null, valid: null });
  // //       //     }
  // //       //     for (const ans of task.others_answer) {
  // //       //       answer.push({id: ans.id, task: index, idAnswer: ans.id, answer: ans.text, correct: null, myAnswer: null, valid: null });
  // //       //     }
  // //       //
  // //       //   }
  // //       //
  // //       //   for (const task of item.task) {
  // //       //     taskList.push({task: task.question, answer});
  // //       //   }
  // //       //
  // //       //   this.listTests.push({task: taskList});
  // //       // }
  // //
  // //       // for (const item of data.results) {
  // //       //   console.log(item);
  // //       //   const taskList = [];
  // //       //   const answer = [];
  // //       //
  // //       //   for (const task of item.task) {
  // //       //
  // //       //     for (const ans of task.correct_answer) {
  // //       //       answer.push({id: ans.id, task: 0, idAnswer: ans.id, answer: ans.text, correct: ans.id, myAnswer: null, valid: null });
  // //       //     }
  // //       //     for (const ans of task.others_answer) {
  // //       //       answer.push({id: ans.id, task: 0, idAnswer: ans.id, answer: ans.text, correct: null, myAnswer: null, valid: null });
  // //       //     }
  // //       //
  // //       //   }
  // //       //
  // //       //   for (const task of item.task) {
  // //       //     taskList.push({task: task.question, answer});
  // //       //   }
  // //       //
  // //       //   this.listTests.push({task: taskList});
  // //       //
  // //       // }
  // //
  // //       console.log(this.listTests);
  // //
  // //       // this.setActiveTest(1);
  // //
  // //       // for (const item of data.results) {
  // //       //   const listQuestion = [];
  // //       //   for (const tast of item.task) {
  // //       //     listQuestion.push({
  // //       //       id: tast.id,
  // //       //       question: tast.question,
  // //       //       othersAnswer: tast.others_answer,
  // //       //       correctAnswer: tast.correct_answer,
  // //       //       myAnswer: [],
  // //       //       myCorrectAnswer: [],
  // //       //       myOthersAnswer: [],
  // //       //       valid: null,
  // //       //     });
  // //       //   }
  // //       //
  // //       //   this.listTests.push({topic: item.topic, question: listQuestion, end: null});
  // //       // }
  // //
  // //       // console.log('LIST TESTS');
  // //       // console.log(this.listTests);
  // //
  // //     },
  // //     error => {
  // //       console.log(error);
  // //     }
  // //   );
  // // }
  //
  // setActiveTest(index: any) {
  //   console.log('Active' + index);
  //   this.activeTest = index;
  //   this.test = {
  //     id: this.tests[index - 1].id,
  //     task: this.tests[index - 1].task,
  //     my_answer: [],
  //   };
  //   this.examTest(index - 1);
  // }
  //
  //
  // examTest(id) {
  //   this.examAnswer = [];
  //   this.otvet = false;
  //   for (const el of this.tests[id].task) {
  //     for (const answer of el.others_answer) {
  //       this.examAnswer.push({id: answer.id, correct: false, task: null, text: answer.text, myAnswer: null, valid: null});
  //     }
  //     for (const answer of el.correct_answer) {
  //       this.examAnswer.push({id: answer.id, correct: true, task: el.id, text: answer.text, myAnswer: null, valid: null});
  //     }
  //   }
  //
  //   console.log('Rez: ');
  //   this.examAnswer = this.shuffle(this.examAnswer);
  //   console.log(this.examAnswer);
  // }
  //
  // setAnswer(i, task) {
  //
  //   if (!this.otvet) {
  //
  //     if (this.examAnswer[i].myAnswer == null) {
  //       this.examAnswer[i].myAnswer = task.id;
  //       if (this.examAnswer[i].task === this.examAnswer[i].myAnswer) {
  //         this.examAnswer[i].valid = true;
  //       } else {
  //         this.examAnswer[i].valid = false;
  //       }
  //
  //     } else {
  //       this.examAnswer[i].myAnswer = null;
  //       this.examAnswer[i].valid = null;
  //     }
  //
  //     console.log('Rezult');
  //     console.log(this.examAnswer);
  //
  //     for (const exam of this.examAnswer) {
  //       console.log(exam);
  //     }
  //
  //   }
  // }
  // //
  // // Otvet() {
  // //   this.otvet = true;
  // //   this.getListTest(this.router.snapshot.paramMap.get('id'), '1');
  // // }
  //
  //
  //
  // // Новий алгоритм
  // // openTest(id) {
  // //
  // //   this.activeMyTest = id - 1;
  // //
  // //   this.otvet = false;
  // //
  // //   this.listMyAnswer = [];
  // //
  // //   this.listQuestion = [];
  // //   this.listAnswer = [];
  // //
  // //   console.log(this.listTests[id - 1]);
  // //   this.listQuestion = this.listTests[id - 1].question;
  // //
  // //   for (const question of this.listQuestion) {
  // //     for (const item of question.othersAnswer) {
  // //       this.listAnswer.push({id: item.id, text: item.text, myCorrectQuestion: null, question: null, correct: null, valid: null});
  // //     }
  // //     for (const item of question.correctAnswer) {
  // //       this.listAnswer.push({id: item.id, text: item.text, myCorrectQuestion: question.id, question: null, correct: item.id, valid: null});
  // //     }
  // //   }
  // //
  // //   this.listAnswer = this.shuffle(this.listAnswer);
  // //
  // // }
  //
  //
  // // setMyAnswer(answer, question) {
  // //   console.log(answer);
  // //   console.log(question);
  // //
  // //   this.listMyAnswer.push({anser: answer.id, question: question.id});
  // //   console.log('MY ANSER');
  // //   console.log(this.listMyAnswer);
  // //
  // //   this.listTests[this.activeMyTest].question[question].myAnswer.push(answer.id);
  // //   console.log(this.listTests[this.activeMyTest].question[question]);
  // //
  // //   if (answer.correct === answer.id) {
  // //     console.log('yes');
  // //     this.listTests[this.activeMyTest].question[question].valid = true;
  // //   } else {
  // //     this.listTests[this.activeMyTest].question[question].valid = false;
  // //   }
  // //
  // //   console.log(this.listTests);
  // //
  // // }
  // //
  // //
  // // setMyNewAnswer(question: any, IndexQ, answer: any, IndexA) {
  // //   console.log('Питання');
  // //   console.log(question);
  // //   console.log('Відповідь');
  // //   console.log(answer);
  // //
  // //   if (this.listAnswer[IndexA].question == null) {
  // //     this.listAnswer[IndexA].question = question.id;
  // //   } else {
  // //     this.listAnswer[IndexA].question = null;
  // //   }
  // //
  // //   const indexCorrect = question.correctAnswer.findIndex(x => x.id === answer.id);
  // //   console.log(indexCorrect);
  // //
  // //   if (indexCorrect !== -1) {
  // //     console.log('yes');
  // //     this.listAnswer[IndexA].valid = true;
  // //
  // //   } else {
  // //     console.log('no');
  // //     console.log(this.listAnswer[IndexA]);
  // //
  // //     if (this.listAnswer[IndexA].valid != null) {
  // //       this.listAnswer[IndexA].valid = null;
  // //     } else {
  // //       this.listAnswer[IndexA].valid = false;
  // //     }
  // //   }
  // //
  // //
  // //   console.log('List ansver');
  // //   console.log(this.listAnswer);
  // //
  // // }
  //
  // // Otvet() {
  // //
  // //   this.otvet = true;
  // //
  // //
  // //   this.listTests[this.activeMyTest].end = true;
  // //
  // //
  // //   console.log(this.listTests);
  // //   console.log(this.listAnswer);
  // //
  // //   for (const ans of this.listAnswer) {
  // //     for (const que of this.listQuestion) {
  // //       if (ans.question === que.id) {
  // //         if (ans.question != null) {
  // //
  // //           // Пошук Іd
  // //           const index = this.listQuestion.findIndex(x => x.id === ans.question);
  // //
  // //           const indexCorrect = this.listTests[this.activeMyTest].question[index].correctAnswer.findIndex(x => x.id === ans.id);
  // //
  // //           if (indexCorrect !== -1) {
  // //             this.listTests[this.activeMyTest].question[index].myCorrectAnswer.push(ans.id);
  // //           } else {
  // //             this.listTests[this.activeMyTest].question[index].myOthersAnswer.push(ans.id);
  // //           }
  // //
  // //           break;
  // //         }
  // //       }
  // //     }
  // //   }
  // //   console.log('rezzzz');
  // //   console.log(this.listTests);
  // // }
  //
  // myActiveTest(id: number) {
  //   console.log(this.listTests[id]);
  // }
  //
  //
  //












  getListTest = (id, page) => {
    this.tests = [];
    this.api.getListTest(id, page).subscribe(
      data => {
        console.log(data.results);
        const listTest = [];

        for (const test of data.results) {
          const questions = [];
          const answer = [];
          for (const task of test.task) {
            questions.push(task.question);
            for (const item of task.others_answer) {
              answer.push({id: item.id, text: item.text, active: null});
            }
            for (const item of task.correct_answer) {
              answer.push({id: item.id, text: item.text, active: null});
            }
          }
          const listQuestion = [];

          for (let i = 0; i < questions.length; i++) {
            listQuestion.push({question: questions[i], index: i, answer});
          }
          console.log(listQuestion);
          listTest.push({test: test.id, topic: test.topic, listQuestion});
        }
        console.log(listTest);

        this.listTests = listTest;
      },
      error => {
        console.log(error);
      }
    );
  }

  openTest(id: number) {
    this.activeMyTest = id;
    this.test = this.listTests[id];
  }

  setOtvet(question: any, indexQ: number, answer: any, indexA: number) {
    console.log('Обєкт питання');
    log(question);
    console.log('Обєкт відповіді');
    log(answer);

    console.log('Індекс питання');
    log(indexQ);
    console.log('Індекс відповіді');
    log(indexA);

    this.listTests[this.activeMyTest].listQuestion[indexQ].answer[indexA].active = false;

    console.log('Rez');
    console.log(this.listTests);

  }



}
