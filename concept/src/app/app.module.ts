import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { TaskComponent } from "./situations/task/task.component";
import { BaseQuestionComponent } from "./situations/task/questions/base-question.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SituationControllerComponent } from "./situations/situation-controller/situation-controller.component";
import { QuestionDirective } from "./situations/task/questions/question.directive";
import { MultipleChoiceQuestionComponent } from "./situations/task/questions/question-types/multiple-choice-question/multiple-choice-question.component";
import { PriorityQuestionComponent } from "./situations/task/questions/question-types/priority-question/priority-question.component";
import { IntroOneComponent } from "./situations/task/questions/question-types/intro-one/intro-one.component";
import { IntroTwoComponent } from './situations/task/questions/question-types/intro-two/intro-two.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    BaseQuestionComponent,
    SituationControllerComponent,
    QuestionDirective,
    MultipleChoiceQuestionComponent,
    PriorityQuestionComponent,
    IntroOneComponent,
    IntroTwoComponent
  ],
  entryComponents: [
    BaseQuestionComponent,
    MultipleChoiceQuestionComponent,
    PriorityQuestionComponent,
    IntroOneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
