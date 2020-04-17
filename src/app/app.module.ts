import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NotFoundComponent } from "./not-found/not-found.component";
import { HomeComponent } from "./home/home.component";

import { UiAngularModule } from "../../projects/ui-angular/src/dcd/ui-angular.module";

@NgModule({
  declarations: [AppComponent, NotFoundComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UiAngularModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      { path: "404", component: NotFoundComponent },
      { path: "**", redirectTo: "404" },
    ]),
    UiAngularModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
