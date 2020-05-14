import {Component, OnInit} from '@angular/core';
import {Map, tileLayer, marker} from 'leaflet';
import {DataUnescoService} from '../data-unesco.service';


@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
    // map: Map;
  quizData: any = [];


    constructor(private dataUnescoService: DataUnescoService) {
    }

    ngOnInit() {
        // this.loadMap();
      this.getData();
    }

    getData() {
      this.dataUnescoService.getAllData().subscribe(data => {
        this.quizData = data.records;
        console.log(this.quizData)

      });
    }

    randomImg() {

    }

    ionViewDidEnter() {
        // this.loadMap();
    }

    // loadMap() {
    //     this.map = new Map('quizMap').setView([45.2333, 5.7833], 2);
    //     tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(this.map);
    // }
}
