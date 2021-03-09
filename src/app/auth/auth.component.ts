import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { authResponse, AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})

export class AuthComponent implements OnDestroy{
    isLoginMode= true;
    isLoading= false;
    error:string=null;
    @ViewChild(PlaceHolderDirective, { static : false }) alertHost:PlaceHolderDirective;
    private closeSub:Subscription;
    constructor(private authServcie:AuthService,
                private router:Router,
                private componentFactoryResolver:ComponentFactoryResolver){}
    

    switchMode(){
        this.isLoginMode=!this.isLoginMode;
    }
    onSubmit(form:NgForm){
        if (!form.valid){
            return;
        }
        const email=form.value.email;
        const password=form.value.password;
        let authObs:Observable<authResponse>;
        this.isLoading=true;
        if(this.isLoginMode){
           authObs=this.authServcie.login(email,password);
        }else{
            authObs=this.authServcie.signUp(email,password)
        }
            authObs.subscribe(resData=>{
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessage=>{
                console.log(errorMessage);
                this.error=errorMessage;
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            });
        
        form.reset();
    }
    onHandleErrors(){
        this.error=null;
    }
    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
    private showErrorAlert(message:string){
        //const alertCmp= new  AlertComponent;
        const alertcmpFactory=
        this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef= this.alertHost.ViewContainerRef;
        hostViewContainerRef.clear();
        const componentRef=hostViewContainerRef.createComponent(alertcmpFactory);
        componentRef.instance.Message=message;
        this.closeSub=componentRef.instance.close.subscribe(()=>{
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        })
       
    }
}