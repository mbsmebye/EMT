import { TaskComponent } from "./Tasks/task.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms"
import { AppComponent } from "./app.component";
import { SituationComponent } from "./Tasks/situation.component";
import { QuestionsComponent } from './Tasks/questions/questions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [AppComponent, TaskComponent, SituationComponent, QuestionsComponent],
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
