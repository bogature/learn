class Topic {
  id: string;
  name: string;
}

class Answer {
  id: number;
  text: string;
  active: boolean;
}

class Question {
  id: string;
  index: number;
  question: string;
  answer: Answer[];
}

export class Test {
  id: number;
  question: Question[];
  listQuestion: Question[];

}
