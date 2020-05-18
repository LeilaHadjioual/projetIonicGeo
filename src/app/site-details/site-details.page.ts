import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataUnescoService} from '../data-unesco.service';
import {Observable} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {ModalPage} from '../modal/modal.page';

@Component({
    selector: 'app-site-details',
    templateUrl: './site-details.page.html',
    styleUrls: ['./site-details.page.scss'],
})
export class SiteDetailsPage implements OnInit {
    public siteDetails: string;
    information = null;

    constructor(private activatedRoute: ActivatedRoute, private dataUnescoService: DataUnescoService, private modalController: ModalController) {
    }

    ngOnInit() {
        let id = this.siteDetails = this.activatedRoute.snapshot.paramMap.get('id');
        this.dataUnescoService.getDetailsSite(id).subscribe(data => {
            this.information = data;
            console.log(this.information)
        });
    }

    async openModal() {
        const modal = await this.modalController.create({
                component: ModalPage,
                componentProps: {
                    latitude: this.information.records[0].fields.coordinates[0],
                    longitude: this.information.records[0].fields.coordinates[1],
                    name: this.information.records[0].fields.site
                }
            });
        await modal.present();
    }

}
