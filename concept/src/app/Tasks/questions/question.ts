export class Question {
  questionHeader: string;
  typewriterQuestionHeader?: string
  alternatives: IAlternative[];
  alternativesToBeSelected: number;
  taskType: string;


  // constructor(questionHeader: string, alternatives: IAlternative[], alternativesToBeSelected: number) {
  //   this.questionHeader = questionHeader
  //   this.alternatives = alternatives;
  //   this.alternativesToBeSelected = alternativesToBeSelected;
  // }

  constructor(data) {
    Object.assign(this, data);
  }

  setUpTypewriting() : void {
    this.typewriterQuestionHeader = "";
    this.alternatives.forEach(alt => {
      alt.typewriterText = "";
    });
  }

  get(id: number) : IAlternative {
    return this.alternatives.find(x => x.alternativeId === id)
  }

  getText(id: number) : string {
    return this.alternatives.find(x => x.alternativeId === id).alternativeText
  }

}

export interface IAlternative {
  alternativeId: number;
  alternativeText: string;
  typewriterText?: string;
}
