import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {Map, tileLayer, marker} from 'leaflet';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.page.html',
    styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
    map: Map;
    latitude = null;
    longitude = null;
    name = null;

    constructor(private navParams: NavParams, private modalController: ModalController) {
    }

    ngOnInit() {
        this.latitude = this.navParams.get('latitude');
        this.longitude = this.navParams.get('longitude');
        this.name = this.navParams.get('name');
    }


    ionViewDidEnter() {
        this.map = new Map('modalMap').setView([this.latitude, this.longitude], 4);
        tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(this.map);
        marker([this.latitude, this.longitude]).addTo(this.map)
            .bindPopup(this.name)
            .openPopup();

    }

    closeModal() {
        this.modalController.dismiss();
    }

}
