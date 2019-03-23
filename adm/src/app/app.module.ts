import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxEditorModule } from "ngx-editor";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MAT_DATE_LOCALE } from "@angular/material";

import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireStorageModule } from 'angularfire2/storage';
import * as moment from "moment";
// import { CarouselModule } from 'angular4-carousel';

import { AuthService } from "./services/auth.service";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MenuComponent } from "./components/menu/menu.component";
import { DefaultComponent } from "./components/default/default.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CdkTableModule } from "@angular/cdk/table";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatSidenavModule,
  MatCardModule,
  MatDividerModule,
  MatGridListModule,
  MatListModule,
  MatStepperModule,
  MatIconModule,
  MatProgressBarModule,
  MatDialogModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTabsModule,
  MatTooltipModule,
  MatTreeModule,
  MatRippleModule
} from "@angular/material";
import { CreateUserComponent } from "./pages/create-user/create-user.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DashboardLoginComponent } from "./pages/dashboard-login/dashboard-login.component";
import { FullscreenService } from "./services/fullscreen.service";
import { CatchErrorInterceptor } from "./services/erro.service";
import { ApiService } from "./services/api.service";
import { TokenStorage } from "./services/token.storage";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { ImageCropperModule } from "ngx-image-cropper";
import { NgxMaskModule } from "ngx-mask";
import { PrimeiroAcessoComponent } from "./pages/primeiro-acesso/primeiro-acesso.component";
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule, LoadingBarService } from '@ngx-loading-bar/core';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    DefaultComponent,
    CreateUserComponent,
    DashboardComponent,
    DashboardLoginComponent,
    PrimeiroAcessoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(
      environment.firebase,
      "angular-auth-firebase"
    ),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    FontAwesomeModule,
    AngularFontAwesomeModule,
    NgxEditorModule,
    SlickCarouselModule,
    ImageCropperModule,
    NgxMaskModule.forRoot(),
    LoadingBarModule,
    LoadingBarHttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.maps,  libraries: ["places"]
    }),
    AngularFireStorageModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },

    AuthService,
    FullscreenService,
    TokenStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true
    }
  ],
  // providers: [AuthService, FullscreenService],
  bootstrap: [AppComponent]
})
export class AppModule {}
