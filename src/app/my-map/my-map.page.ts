import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Map, tileLayer, marker} from 'leaflet';
import {DataUnescoService} from '../data-unesco.service';

@Component({
    selector: 'app-my-map',
    templateUrl: './my-map.page.html',
    styleUrls: ['./my-map.page.scss'],
})
export class MyMapPage implements OnInit {
    public myMap: string;
    map: Map;
    // marker: any;
    latlong = [];
    siteCoordinatesList = [];

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataUnescoService: DataUnescoService) {
    }

    ngOnInit() {
        this.myMap = this.activatedRoute.snapshot.paramMap.get('id');
        // this.getPosition();
        this.getAllPosition();
    }

    getAllPosition() {
        this.dataUnescoService.getAllData().subscribe(data => {
            this.siteCoordinatesList = data;
            console.log('propertylist', this.siteCoordinatesList);
        });
    }

    //
    // loadMap() {
    //     this.map = new Map('myMap').setView([45.2333, 5.7833], 10);
    //     tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(this.map);
    // }

    // ionViewDidEnter() {
    //     this.loadMap();
    // }

    ionViewDidEnter() {
        this.map = new Map('myMap').setView([45.2333, 5.7833], 2);
        tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(this.map);
        fetch('https://data.opendatasoft.com/api/records/1.0/search/?dataset=world-heritage-list%40public-us&lang=FR&rows=30').then(res => res.json())
            .then(data => {
                this.siteCoordinatesList = data.records;
                this.leafletMap();
            });
    }

    leafletMap() {
        console.log('marker', this.siteCoordinatesList);
        for (const site of this.siteCoordinatesList) {
            marker([site.fields.coordinates[0], site.fields.coordinates[1]]).addTo(this.map)
                .bindPopup('<a href="/site-details/' + site.recordid + '"> ' + site.fields.site + '</a>');
        }
    }

    // ionViewWillLeave() {
    //     this.map.remove();
    // }

    // getPosition() {
    //     this.geolocation.getCurrentPosition({
    //         enableHighAccuracy: true
    //     }).then((res) => {
    //         return this.latlong = [
    //             res.coords.latitude,
    //             res.coords.longitude
    //         ];
    //     }).then((latlng) => {
    //         this.showMarker(latlng);
    //     });
    //
    // }

    // showMarker(latlong) {
    //     this.marker = marker(latlong);
    //     this.marker.addTo(this.map).bindPopup('coucou');
    //
    // }


    // loadmap() {
    //     this.map = leaflet.map('map').fitWorld();
    //     leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //         // tslint:disable-next-line:max-line-length
    //         attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //         maxZoom: 18
    //     }).addTo(this.map);
    //     this.map.locate({
    //         setView: true,
    //         maxZoom: 10
    //     }).on('locationfound', (e) => {
    //         const markerGroup = leaflet.featureGroup();
    //         const marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
    //             alert('Marker clicked');
    //         });
    //         markerGroup.addLayer(marker);
    //         this.map.addLayer(markerGroup);
    //     }).on('locationerror', (err) => {
    //         alert(err.message);
    //     });
    //
    // }

    // loadmap() {
    //     this.map = leaflet.map("map").fitWorld();
    //     leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //         attributions: 'www.tphangout.com',
    //         maxZoom: 18
    //     }).addTo(this.map);
    // }

}
