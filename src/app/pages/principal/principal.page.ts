import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html'
})
export class PrincipalPage implements OnInit {
  public principal: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.principal = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
