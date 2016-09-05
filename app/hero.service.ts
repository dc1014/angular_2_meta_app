import { Injectable } from '@angular/core';
import {Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()

export class HeroService {
  constructor(private http: Http) { }

  private heroesUrl = 'app/heroes'; // URL to web api

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error); // for demo only
    return Promise.reject(error.message || error);
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError)
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    let url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // the public signature did not change, and we still return a promise

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl) // returns RXJS observable
      .toPromise() // makes observable into a promise
      .then(response => response.json().data as Hero[]) // response json has single property, data, holds array of heroes
      .catch(this.handleError);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 2000)) // delay 2 seconds
      .then(() => this.getHeroes());
  } // stub for simulating latency

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }


}
