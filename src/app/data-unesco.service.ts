import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DataUnescoService {
    private url: String = 'https://data.opendatasoft.com/api/records/1.0/search/?dataset=world-heritage-list%40public-us&lang=fr&rows=30';
    private category: Array<any> = ['Cultural', 'Natural'];

    constructor(private readonly http: HttpClient) {
    }

    getAllData(): Observable<any> {
        return this.http.get(`${this.url}`);
    }

    getDataCultural(): Observable<any> {
        return this.http.get(`${this.url}&refine.category=${this.category[0]}`);
    }

    getDataNatural(): Observable<any> {
        return this.http.get(`${this.url}&refine.category=${this.category[1]}`);
    }

    getDetailsSite(id: string) {
        return this.http.get(`${this.url}&refine.recordid=${id}`);
    }

    getSitesAroundPosition(coord: string, dist: string) {
        return this.http.get(`${this.url}&geofilter.distance=${[coord, dist]}`);
    }
}
