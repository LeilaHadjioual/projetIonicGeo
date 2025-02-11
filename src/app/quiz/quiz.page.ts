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
    newImage: any;
    points = [
        {
            nbPoints: 1000,
            distance: 200
        },
        {
            nbPoints: 500,
            distance: 500
        },
        {
            nbPoints: 200,
            distance: 1000
        }, {
            nbPoints: 100,
            distance: 2000
        },
        {
            nbPoints: 80,
            distance: 4000
        },
        {
            nbPoints: 60,
            distance: 6000
        }, {
            nbPoints: 40,
            distance: 10000
        },
        {
            nbPoints: 20,
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
        this.alertConsignes().then(r => console.log('alerte then'));
        this.randomImage();
        if (this.marker !== undefined) {
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
        let random = Math.floor(Math.random() * this.quizData.length);
        this.selectedImg = this.quizData[random];
        this.httpGetAsync(`https://whc.unesco.org/en/list/${this.selectedImg.fields.id_number}/gallery`, (data) => {
                const el = document.createElement('html');
                el.innerHTML = data;
                const imgs = el.getElementsByClassName('icaption-img');
                console.log('imgs', imgs);
                // for (let k = 0; k < imgs.length; k++) {
                const rand = Math.floor(Math.random() * 10);
                this.newImage = imgs[rand].getAttribute('data-src');
                 // }
            });
        if (this.marker !== undefined) {
            this.clearMap();
        }
        console.log('image', this.selectedImg);
        if (this.round >= 6) {
            this.alertEndGame().then(r => console.log('alerte then'));
        }
        this.dist = null;
        this.played = false;
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
                    }
                    this.marker = marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
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

        // clear map
        if (this.markerResult !== undefined && this.polyline !== undefined) {
            this.map.removeLayer(this.markerResult);
            this.map.removeLayer(this.polyline);
        }
        // calcul distance
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
            this.calculPoints();
            this.round++;
        }
    }

    calculPoints() {
        for (let i = 0; i < this.points.length; i++) {
            if (this.dist < this.points[i].distance) {
                this.totalPoints = this.totalPoints + this.points[i].nbPoints;
                return;
            }
        }
    }

    async alertEndGame() {
        const alert = await this.alertController.create({
            header: 'Le jeu est terminé',
            subHeader: 'BRAVO',
            message: 'Vous avez cumulé un total de <strong>' + this.totalPoints + '</strong> points',
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
                '<br> cliquez sur afficher la carte et indiquez le lieu.  ' +
                '<br> Pour connaitre la réponse, cliquez sur réponse. ' +
                '<br> Vous pouvez passer à la prochaine photo en cliquant sur ' +
                '<ion-icon  name="reload-outline"></ion-icon>'
            ,
            buttons: ['OK']
        });
        await alert.present();
    }

    httpGetAsync(theUrl, callback) {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                callback(xmlHttp.responseText);
            }
        };
        xmlHttp.open('GET', theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }

}
