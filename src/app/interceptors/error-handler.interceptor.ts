import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((responseError: HttpErrorResponse) => {
        let errors: any[] = responseError.error.Errors
        if(errors){
        errors.forEach(element => {
          this.toastr.error(element.ErrorMessage, "Hata")
        });
        return throwError(() => errors)
      }else{
          this.toastr.error((responseError.error.Message as string).replace(/(.{50})..+/, "..."), "Hata")
          return throwError(() => responseError.error.Message)
        }
      })
  )}
}
