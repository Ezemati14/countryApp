import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl:string = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStore= {
        byCapital: { term: '' , countries: [] },
        byRegion: { region: '' , countries: [] },
        byCountries: { term: '' , countries: [] }
    }

    constructor(private http: HttpClient) { }

    private getCountriesRequest(url: string): Observable<Country[]> {
           return this.http.get<Country[]>(url)
                    .pipe(
                        catchError( () => of( [] ) )
        );
    }

    searchCountryByAlphaCode(term: string): Observable<Country | null> {
        const url = `${this.apiUrl}/alpha/${term}`;

        return this.http.get<Country[]>( url )
        .pipe(
            map(countries => countries.length > 0 ? countries[0]: null),
            catchError( () => of( null ) ),
            delay(2000),
        );
    }

    searchByCapital(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/capital/${term}`;

        return this.getCountriesRequest(url)
        .pipe(
            tap( countries => this.cacheStore.byCapital = { term , countries } )
        )
    }

    serachCountry(term: string): Observable<Country[]> {

        const url = `${this.apiUrl}/name/${term}`;

        return this.getCountriesRequest(url)
        .pipe(
            tap( countries => this.cacheStore.byCountries = { term , countries } )
        )
    } 

    serachRegion(region: Region): Observable<Country[]> {

        const url = `${this.apiUrl}/region/${region}`;

        return this.getCountriesRequest(url).pipe(
            tap( countries => this.cacheStore.byRegion = { region , countries } )
        )
    } 
    
} 