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

    constructor(private dataUnescoService: DataUnescoService, private router: Router) {
    }

    ngOnInit() {
    }

    goToCulturalSites() {
        this.router.navigate(['/cultural-sites']);
    }

    goToNaturalSites() {
        this.router.navigate(['/natural-sites']);
    }

}
