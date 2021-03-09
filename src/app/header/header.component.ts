import { componentFactoryName, viewClassName } from "@angular/compiler";


import { Component,ElementRef,EventEmitter ,ViewChild,Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageServcie } from "../shared/data-storage.service";

@Component({
    selector:'app-header',
    templateUrl :'./header.component.html'

})


export class headerComponent implements OnInit,OnDestroy{
    isAuthenticated = false;
    private userSub:Subscription;
    
constructor(private dataStorageServcie:DataStorageServcie,
            private authService:AuthService){}

  ngOnInit(){
    this.userSub= this.authService.user.subscribe(user=>{
        this.isAuthenticated=!!user;
        console.log(!user);
        console.log(!!user);
    });
 
}
    saveData(){
       this.dataStorageServcie.storeRecipes();  
    }
    fetchData(){
        this.dataStorageServcie.fetchrecipe().subscribe();
    }
    onLogOut(){
        this.authService.logOut();
    }
     ngOnDestroy(){
         this.userSub.unsubscribe();
     }
}