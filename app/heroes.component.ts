import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';

// removed full hero detail and added mini detail

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
})

export class HeroesComponent implements OnInit {

  heroes: Hero[]; // can no longer infer type
  selectedHero: Hero; // replaces static hero

  constructor(
    private router: Router,
    private heroService: HeroService
  ) { } // but still needs injector

  // this.heroes = this.heroService.getHeroes(); - instead, make a method

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }


  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(hero: Hero): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
