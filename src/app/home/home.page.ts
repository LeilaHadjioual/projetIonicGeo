import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DataUnescoService} from '../data-unesco.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    // results: Observable<any>;

    constructor(private dataUnescoService: DataUnescoService, private router: Router) {
    }

    ngOnInit() {
    }

    goToCulturalSites() {
        // this.results = this.dataUnescoService.getData();
        // console.log('***results', this.results);
        this.router.navigate(['/cultural-sites']);
    }

    goToNaturalSites() {
        // this.results = this.dataUnescoService.getData();
        // console.log('***results', this.results);
        this.router.navigate(['/natural-sites']);
        // this.dataUnescoService.getDataNatural().subscribe(data => {
        //     console.log(data);
        //     this.results = data;
        //     this.router.navigate(['/natural-sites', this.results]);
        //
        // });
    }

}
