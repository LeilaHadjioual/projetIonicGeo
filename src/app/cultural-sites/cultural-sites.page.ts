import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DataUnescoService} from '../data-unesco.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-cultural-sites',
    templateUrl: './cultural-sites.page.html',
    styleUrls: ['./cultural-sites.page.scss'],
})
export class CulturalSitesPage implements OnInit {
    results: any = [];

    constructor(private dataUnescoService: DataUnescoService, private router: Router) {
    }

    ngOnInit() {
        this.displayCulturalSites();
    }

    displayCulturalSites() {
        this.dataUnescoService.getDataCultural().subscribe(data => {
            this.results = data.records;
            this.results.sort(this.sortData);
        });
    }

    goToDetails(id: string) {
        this.router.navigate(['/site-details', id]);

    }

    searchByRegion(ev: any) {
        const val = ev.target.value;
        if (val && val.trim() !== '') {
            this.results = this.results.filter((item) => {
                return (item.fields.region.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        } else {
            this.displayCulturalSites();
        }

    }

    sortData(a: any, b: any) {
        const famA = a.fields.site;
        const famB = b.fields.site;
        let compare = 0;
        if (famA > famB) {
            compare = 1;
        } else if (famA < famB) {
            compare = -1;
        }
        return compare;
    }
}
