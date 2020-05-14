import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DataUnescoService} from '../data-unesco.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-natural-sites',
    templateUrl: './natural-sites.page.html',
    styleUrls: ['./natural-sites.page.scss'],
})
export class NaturalSitesPage implements OnInit {
    results: any = [];

    constructor(private dataUnescoService: DataUnescoService, private router: Router) {
    }

    ngOnInit() {
        this.displayNaturalSites();

    }

    displayNaturalSites() {
        this.dataUnescoService.getDataNatural().subscribe(data => {
            this.results = data.records;
            console.log('affiche site culturel', this.results);
        });
    }

    goToDetails(id: string) {
        this.router.navigate(['/site-details', id]);

    }

    searchByRegion(ev: any) {
        const val = ev.target.value;
        if (val && val.trim() !== '') {
            this.results = this.results.filter((item) => {
              console.log('this result', this.results)
                return (item.fields.region.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        } else if (this.results === '') {
            console.log('aucun');
        } else {
            this.displayNaturalSites();
        }
    }



}
