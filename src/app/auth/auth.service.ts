import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface authResponse{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean;
    
}

@Injectable({providedIn:'root'})
export class AuthService{
    user =new BehaviorSubject<User>(null);
    private tokenExpirationTimer:any;

constructor(private http:HttpClient,
            private route:Router){}

signUp(email:string,password:string)
{
     return this.http.post<authResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClrkNvgzIuAPpQ35QQ3oXrgCkiWruEvuU',
        {
            email:email,
            password:password,
            returnSecureToken:true,
        }).pipe(catchError(this.handleError),
        tap(resData=>{
                this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                );
        }));
 }
 autoLogin(){
     const userData:{
         email:string;
         id:string;
         _token:string;
         _tokenExpirationDate: Date;
     }=JSON.parse(localStorage.getItem('userData'));
     if(!userData){
         return;
     }
     const loadeduser = new User(userData.email,userData.id,userData._token,
        new Date(userData._tokenExpirationDate));
        if(loadeduser.token){
            const exppirationDuration= new Date(userData._tokenExpirationDate).
            getTime();
            this.autoLogOut(exppirationDuration);
            this.user.next(loadeduser);
        }
 }

autoLogOut(expirationDuration:number){
    console.log(expirationDuration);
    this.tokenExpirationTimer=setTimeout(()=>{
        this.logOut();
    },expirationDuration
    );
}
 private handleAuthentication(
     email:string,
     userId:string,
     token:string,
     expiresIn:number){
        const expirationDate=new Date(new Date().getTime() + expiresIn * 1000);
        const user=new User(email,userId,token,expirationDate);
        this.user.next(user);
        localStorage.setItem('userData',JSON.stringify(user));
 }
 login(email:string,password:string){
        return this.http.post<authResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClrkNvgzIuAPpQ35QQ3oXrgCkiWruEvuU',
        
            {
                email:email,
                password:password,
                returnSecureToken:true,
            }).pipe(catchError(this.handleError),
            tap(resData=>{
                    this.handleAuthentication(
                            resData.email,
                            resData.localId,
                            resData.idToken,
                            +resData.expiresIn
                    );
            }));
     }
     logOut(){
         this.user.next(null);
         this.route.navigate(['/auth']);
         localStorage.removeItem('userData');
         if(this.tokenExpirationTimer){
             clearTimeout(this.tokenExpirationTimer);
         }
         this.tokenExpirationTimer=null;
     }
 private handleError(errorRes:HttpErrorResponse)
  {
    let errorMessage ='An unknowm error occured!';
    if(!errorRes.error || !errorRes.error.error)
    {
        return throwError(errorMessage);
    }switch(errorRes.error.error.message)
    {
     case 'EMAIL_EXISTS':
        errorMessage='this email exits already';
        break;
     case 'EMAIl_NOT_FOUND':
         errorMessage='this email does not exits';
         break;
     case 'INVALID_PASSWORD' :
         errorMessage='this password is not correct';
         break;   
    }
    return throwError(errorMessage);    
   
   }
 }
