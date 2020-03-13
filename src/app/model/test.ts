class Topic {
  id: string;
  name: string;
}

class Answer {
  id: number;
  text: string;
  active: boolean;
  task;
}

class Question {
  id: string;
  index: number;
  question: string;
  answer: Answer[];
  myAns: any;
}

export class Test {
  id: number;
  question: Question[];
  listQuestion: Question[];
  answer: any[];

}
