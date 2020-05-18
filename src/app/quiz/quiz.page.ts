import {Component, OnInit} from '@angular/core';
import {Map, tileLayer, marker, polyline, icon} from 'leaflet';
import {AlertController} from '@ionic/angular';
import {DataUnescoService} from '../data-unesco.service';


@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
    map: Map;
    quizData: any = [];
    selectedImg = null;
    marker: any;
    dist: any;
    markerResult: any;
    polyline: any;
    played = false;
    totalPoints = 0;
    round = 1;
    points = [
        {
            nbPoints: 100,
            distance: 500
        },
        {
            nbPoints: 80,
            distance: 1000
        }, {
            nbPoints: 60,
            distance: 2000
        },
        {
            nbPoints: 40,
            distance: 4000
        },
        {
            nbPoints: 20,
            distance: 6000
        }, {
            nbPoints: 10,
            distance: 10000
        },
        {
            nbPoints: 1,
            distance: 20000
        },
    ];

    constructor(private dataUnescoService: DataUnescoService, public alertController: AlertController) {
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.dataUnescoService.getAllData().subscribe(data => {
            this.quizData = data.records;
            console.log('data quiz', this.quizData);
        });
    }

    playGame() {
        this.alertConsignes();
        this.randomImage();
        if (this.marker !== undefined) {
            // this.map.removeLayer(this.marker);
            // this.marker = undefined;
            // if (this.markerResult !== undefined && this.polyline !== undefined) {
            //     this.map.removeLayer(this.markerResult);
            //     this.map.removeLayer(this.polyline);
            // }
            this.clearMap();
        }
        this.dist = null;
        this.played = false;
        this.round = 1;
    }

    clearMap() {
        this.map.removeLayer(this.marker);
        this.marker = undefined;
        if (this.markerResult !== undefined && this.polyline !== undefined) {
            this.map.removeLayer(this.markerResult);
            this.map.removeLayer(this.polyline);
        }
    }

    randomImage() {
        this.selectedImg = this.quizData[Math.floor(Math.random() * this.quizData.length)];
        if (this.marker !== undefined) {
            this.clearMap();
            // this.map.removeLayer(this.marker);
            // this.marker = undefined;
            // if (this.markerResult !== undefined && this.polyline !== undefined) {
            //     this.map.removeLayer(this.markerResult);
            //     this.map.removeLayer(this.polyline);
            // }
        }
        console.log('image', this.selectedImg);
        this.dist = null;
        this.played = false;
    }

    ionViewDidEnter() {
        // this.loadMap();
    }

    loadMap() {
        this.map = new Map('quizMap').setView([45.2333, 5.7833], 2);
        tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(this.map);
        this.map.on('click', (e => {
                    console.log('dist', this.dist);
                    if (this.played === true) {
                        return;
                    }
                    if (this.marker !== undefined) {
                        this.clearMap();
                        // this.map.removeLayer(this.marker);
                        // if (this.markerResult !== undefined && this.polyline !== undefined) {
                        //     this.map.removeLayer(this.markerResult);
                        //     this.map.removeLayer(this.polyline);
                        // }
                    }
                    this.marker = marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
                    console.log('event après', e);
                    this.dist = null;
                }
            )
        );
        document.getElementById('btnMap').style.display = 'none';
    }

    calculDistance() {
        let myIcon = icon({
            iconUrl: '../../assets/icon/map-marker-monument.png',
            iconSize: [40, 50],
            iconAnchor: [20, 45],
            popupAnchor: [-3, -76],
            // shadowUrl: 'my-icon-shadow.png',
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });
        let lat1 = this.selectedImg.fields.coordinates[0];
        let lon1 = this.selectedImg.fields.coordinates[1];
        let lat2 = this.marker._latlng.lat;
        let lon2 = this.marker._latlng.lng;
        let latlngs = [[lat1, lon1],
            [lat2, lon2]];
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        } else {
            let radlat1 = Math.PI * lat1 / 180;
            let radlat2 = Math.PI * lat2 / 180;
            let theta = lon1 - lon2;
            let radtheta = Math.PI * theta / 180;
            this.dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (this.dist > 1) {
                this.dist = 1;
            }
            this.dist = Math.acos(this.dist);
            this.dist = this.dist * 180 / Math.PI;
            this.dist = this.dist * 60 * 1.1515;
            this.dist = this.dist * 1.609344;
            this.dist = Math.round(this.dist);
            this.markerResult = marker([lat1, lon1], {icon: myIcon}).addTo(this.map);
            this.polyline = polyline(latlngs, {color: 'black', weight: 1}).addTo(this.map);
            this.played = true;
            // return this.dist;
            this.calculPoints();
            this.round++;
            if (this.round === 6) {
                console.log('fin');
                this.presentAlert();
            }
            console.log('round', this.round);

        }

    }

    calculPoints() {
        for (let i = 0; i < this.points.length; i++) {
            if (this.dist < this.points[i].distance) {
                console.log('hello', this.points[i].nbPoints);
                this.totalPoints = this.totalPoints + this.points[i].nbPoints;
                return;
            }
        }
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Le jeu est terminé',
            subHeader: 'BRAVO',
            message: 'vous avez cumulé un total de ' + this.totalPoints + ' points',
            buttons: ['OK']
        });
        this.totalPoints = 0;
        this.round = 1;
        await alert.present();
    }


    async alertConsignes() {
        const alert = await this.alertController.create({
            header: 'Comment jouer',
            message: 'Regardez la photo, lorsque vous pensez savoir où se situe le site, ' +
                'cliquez sur "afficher la carte" et indiquer le lieu, ' +
                'pour connaitre la réponse, cliquez sur réponse. ' +
                'Vous pouvez passer à la prochaine photo en cliquant sur'
            ,
            buttons: ['OK']
        });
        // this.totalPoints = 0;
        // this.round = 1;
        await alert.present();
    }

}
