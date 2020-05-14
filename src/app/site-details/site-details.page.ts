import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataUnescoService} from '../data-unesco.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-site-details',
    templateUrl: './site-details.page.html',
    styleUrls: ['./site-details.page.scss'],
})
export class SiteDetailsPage implements OnInit {
    public siteDetails: string;
    information = null;

    constructor(private activatedRoute: ActivatedRoute, private dataUnescoService: DataUnescoService) {
    }

    ngOnInit() {
        let id = this.siteDetails = this.activatedRoute.snapshot.paramMap.get('id');
        this.dataUnescoService.getDetailsSite(id).subscribe(data => {
            this.information = data;
        });
    }

}
