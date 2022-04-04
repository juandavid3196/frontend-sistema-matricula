import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, UrlSegment, ActivatedRoute } from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
   
  ruta :string = '';

  constructor(private router: Router,
              private route : ActivatedRoute) { 
                this.router.events.subscribe(
                  (event: any) => {
                    if (event instanceof NavigationEnd) {
                       this.ruta = this.router.url;
                    }
                  }
                );

  }

  ngOnInit(): void {
    
  }


  cerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

 }

   

