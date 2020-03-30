import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  SimpleChange,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory
} from "@angular/core";
import { QuestionService } from "./questions/question.service";
import { Question } from "./questions/question";
import { BaseQuestionComponent } from "./questions/base-question.component";
import { QuestionDirective } from "./questions/question.directive";
import { MultipleChoiceQuestionComponent } from "./questions/question-types/multiple-choice-question/multiple-choice-question.component";
import { PriorityQuestionComponent } from "./questions/question-types/priority-question/priority-question.component";
import { IntroOneComponent } from "./questions/question-types/intro-one/intro-one.component";

@Component({
  selector: "task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
  providers: [QuestionService]
})
export class TaskComponent {
  constructor(
    private questionService: QuestionService,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    if (this.situation != -1) {
      this.loadQuestion();
    }
  }

  @ViewChild(QuestionDirective, { static: true })
  questionHost: QuestionDirective;
  @Output() taskComplete: EventEmitter<null> = new EventEmitter();
  @ViewChild("taskVideo", { static: true }) taskVideo: ElementRef;
  @Input() task: number;
  @Input() situation = 0;
  @Input() playVideo: false;
  questionData: Question;
  errorMessage: string;
  childQuestionComponent: ComponentRef<Component>;
  useTypewriter = false;

  videoEnded() {
    (<BaseQuestionComponent>this.childQuestionComponent.instance).videoEnded();
  }

  loadQuestion() {
    this.questionService.getQuestion(this.situation, this.task).subscribe({
      next: data => {
        this.questionData = new Question(data);
        const componentFactory = this.generateComponentFactoryBasedOnQuestionType(
          this.questionData
        );

        const viewContainerRef = this.questionHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        this.childQuestionComponent = componentRef;
        const questionInstance = <BaseQuestionComponent>componentRef.instance;

        questionInstance.data = {
          question: this.questionData,
          task: this.task,
          situation: this.situation,
          useTypewriter: this.useTypewriter
        };

        questionInstance.completeClicked.subscribe((event: any) => {
          this.onCompleteClicked();
        });
        questionInstance.replayClicked.subscribe((event: any) => {
          this.onReplayClicked();
        });
      },
      error: err => (this.errorMessage = err)
    });
  }

  generateComponentFactoryBasedOnQuestionType(question) {
    let componentFactory;

    switch (question.questionType) {
      case "multiple-choice-question":
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          MultipleChoiceQuestionComponent
        );
        break;
      case "multiple-choice-icons-question":
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          MultipleChoiceQuestionComponent
        );
        break;
      case "priority-question":
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          PriorityQuestionComponent
        );
        break;
      case "intro-one":
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          IntroOneComponent
        );
        break;
      default:
        throw new Error(
          `Invalid question type. Please check if task-${question.task}.json has a valid questionType set.`
        );
    }

    return componentFactory;
  }

  onCompleteClicked() {
    this.childQuestionComponent.destroy();
    this.taskComplete.emit();
  }

  onReplayClicked() {
    this.taskVideo.nativeElement.currentTime = 0;
    this.taskVideo.nativeElement.play();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);

      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
        if (propName === "playVideo" && to === "true") {
          console.log("initPlayVideo");
          this.taskVideo.nativeElement.play();
        }
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        if (propName === "playVideo" && from === "false" && to === "true") {
          console.log("playVideo");
          this.taskVideo.nativeElement.play();
        }
        if (propName === "task" && to !== "-1") {
          this.taskVideo.nativeElement.load();
          this.loadQuestion();
        }
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    console.log(log);
  }
}
