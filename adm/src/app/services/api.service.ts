import { Observable } from "rxjs/Observable";
import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { HttpEvent } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import "rxjs/add/observable/fromPromise";
import { environment } from "src/environments/environment";
import { TokenStorage } from "./token.storage";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
@Injectable()
export class ApiService implements HttpInterceptor {
  URL = environment.url;
  URL_ASSETS = environment.assets;
  headers = new HttpHeaders().set("Content-Type", "application/json");
  // token = new TokenStorage();
  usuarioData: {
    name: string;
    email: string;
    empresa: string;
    code: string;
    master: boolean;
  };
  constructor(private http: HttpClient, private token: TokenStorage) {
    // this.token = localStorage.getItem("firebase");
    this.headers.append('Authorization', token.getToken());
  }
  public $userSource = new Subject<any>();

  login(email: string, password: string): Observable<any> {
    return Observable.create(observer => {
      this.http
        .post("/api/auth/login", {
          email,
          password
        })
        .subscribe((data: any) => {
          observer.next({ user: data.user });
          this.setUser(data.user);
          this.token.saveToken(data.token);
          observer.complete();
        });
    });
  }

  register(
    fullname: string,
    email: string,
    password: string,
    repeatPassword: string
  ): Observable<any> {
    return Observable.create(observer => {
      this.http
        .post("/api/auth/register", {
          fullname,
          email,
          password,
          repeatPassword
        })
        .subscribe((data: any) => {
          observer.next({ user: data.user });
          this.setUser(data.user);
          this.token.saveToken(data.token);
          observer.complete();
        });
    });
  }

  setUser(user): void {
    if (user) {
      user.isAdmin = user.roles.indexOf("admin") > -1;
    }
    this.$userSource.next(user);
    (<any>window).user = user;
  }

  getUser(): Observable<any> {
    return this.$userSource.asObservable();
  }

  me(): Observable<any> {
    return Observable.create(observer => {
      const tokenVal = this.token.getToken();
      if (!tokenVal) {
        return observer.complete();
      }
      this.http.get("/api/auth/me").subscribe((data: any) => {
        observer.next({ user: data.user });
        this.setUser(data.user);
        observer.complete();
      });
    });
  }

  signOut(): void {
    this.token.signOut();
    this.setUser(null);
    delete (<any>window).user;
  }
  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   // Clone the request to add the new header
  //   const token = new TokenStorage();
  //   const tokenVal = token.getToken();
  //   const cabecacho = [
  //     { Authorization: tokenVal },
  //     { "Content-Type": "application/json" }
  //   ];

  //   const clonedRequest = req.clone({
  //     responseType: "json",
  //     headers: req.headers.set("Content-Type", "application/json")
  //     // headers: req.headers.append(
  //     //   'Authorization',
  //     //   tokenVal ? `Bearer ${tokenVal}` : '', 'Content-Type','application/json'
  //     // )
  //   });
  //   // clonedRequest.('Content-Type', 'application/json');
  //   // ['Authorization': tokenVal],
  //   //     ['Content-Type' 'application/json']
  //   // Pass the cloned request instead of the original request to the next handle
  //   clonedRequest.headers.append(
  //     "Authorization",
  //     tokenVal ? `Bearer ${tokenVal}` : ""
  //   );
  //   return next.handle(clonedRequest);
  // }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = new TokenStorage();
    const tokenVal = token.getToken();
    request = request.clone({
      responseType: "json"
    });

    return next.handle(request).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          // do stuff with response error if you want
        }
      }
    );
  }
  doRequest(tipo: "post" | "put" | "delete" | "get"): Observable<any> {
    return Observable.create(observer => {
      const tokenVal = this.token.getToken();
      if (!tokenVal) {
        return observer.complete();
      }
      if (tipo === "get") {
        this.http.get("URL").subscribe((data: any) => {
          observer.next({ user: data.user });
          this.setUser(data.user);
          observer.complete();
        });
      }
    });
  }
  postPublicacao(obj): Observable<any> {
    return Observable.create(resposta => {
      this.http
        .post(this.URL + "publicacao", obj, { headers: this.headers })
        .subscribe((data: any) => {
          resposta.next();
          console.log(data);
          resposta.complete();
        });
    });
  }
}
