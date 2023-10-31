import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
import { Injectable } from "@angular/core";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private login: LoginService){

    }
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
            

            // Add the Jwt Token Which is stored in localStorage
        let authReq = req;
        const token = this.login.getToken();
        if(token!=null){
            authReq= authReq.clone({
                setHeaders:{Authorization : `Bearer ${token}`},
        });
        }
            return next.handle(authReq);

        }
}

export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi:true,
    },
]