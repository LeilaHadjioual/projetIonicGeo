import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Map, tileLayer, marker, icon} from 'leaflet';
import {DataUnescoService} from '../data-unesco.service';

@Component({
    selector: 'app-my-map',
    templateUrl: './my-map.page.html',
    styleUrls: ['./my-map.page.scss'],
})
export class MyMapPage implements OnInit {
    public myMap: string;
    map: Map;
    myMarker: any;
    latlong = [];
    siteCoordinatesList = [];
    sitesAround: any ;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataUnescoService: DataUnescoService, private geolocation: Geolocation) {
    }

    ngOnInit() {
        this.myMap = this.activatedRoute.snapshot.paramMap.get('id');
        this.getAllPosition();
    }

    getAllPosition() {
        this.dataUnescoService.getAllData().subscribe(data => {
            this.siteCoordinatesList = data;
        });
    }

    ionViewDidEnter() {
        this.map = new Map('myMap').setView([45.2333, 5.7833], 2);
        tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(this.map);
        fetch('https://data.opendatasoft.com/api/records/1.0/search/?dataset=world-heritage-list%40public-us&lang=fr&rows=30').then(res => res.json())
            .then(data => {
                this.siteCoordinatesList = data.records;
                this.addAllMarkersOnMap();
            });
    }

    addAllMarkersOnMap() {
        // console.log('marker', this.siteCoordinatesList);
        for (const site of this.siteCoordinatesList) {
            marker([site.fields.coordinates[0], site.fields.coordinates[1]]).addTo(this.map)
                .bindPopup('<a href="/site-details/' + site.recordid + '"> ' + site.fields.site + '</a>');
        }
    }

    // ionViewWillLeave() {
    //     this.map.remove();
    // }

    getMyPosition() {
        this.geolocation.getCurrentPosition({
            enableHighAccuracy: true
        }).then((res) => {
            return this.latlong = [
                res.coords.latitude,
                res.coords.longitude
            ];
        }).then((latlng) => {
            this.addMarkerPosition(latlng);
        });
    }

    addMarkerPosition(latlong) {
        const myIcon = icon({
            iconUrl: '../../assets/icon/green.png',
            iconSize: [40, 40],
            iconAnchor: [20, 45],
            popupAnchor: [0, -45],
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });
        this.myMarker = marker(latlong, {icon: myIcon});
        this.myMarker.addTo(this.map).bindPopup('Vous êtes ici !').openPopup();
        this.showSitesAroundMyPosition([latlong], 100000);
    }

    showSitesAroundMyPosition(coord, dist) {
        const myIcon = icon({
            iconUrl: '../../assets/icon/Mapicon.png',
            iconSize: [40, 40],
            iconAnchor: [20, 45],
            popupAnchor: [-5, -45],
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });
        this.dataUnescoService.getSitesAroundPosition(coord, dist).subscribe(data => {
            this.sitesAround = data;
            for (const s of this.sitesAround.records) {
                marker([s.fields.coordinates[0], s.fields.coordinates[1]], {icon: myIcon}).addTo(this.map)
                   .bindPopup('<a href="/site-details/' + s.recordid + '"> ' + s.fields.site + '</a>');
            }
        });
    }
}
