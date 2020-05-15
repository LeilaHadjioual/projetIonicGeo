import {Component, OnInit} from '@angular/core';
import {DataUnescoService} from '../data-unesco.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
    jsonData: any = [];

    constructor(private dataUnescoService: DataUnescoService) {
    }

    ngOnInit() {
        this.initializeJsonData();
    }

    initializeJsonData() {
        this.dataUnescoService.getAllData().subscribe(data => {
            this.jsonData = data.records;
            // console.log('data', this.jsonData);
            this.jsonData.sort(this.sortJsonData);
        });
    }

    filterJsonData(ev: any) {
        const val = ev.target.value;
        if (val && val.trim() !== '') {
            this.jsonData = this.jsonData.filter((item) => {
                return (item.fields.site.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        } else {
            this.initializeJsonData();
        }

    }

    sortJsonData(a: any, b: any) {
        const famA = a.fields.site;
        const famB = b.fields.site;
        let compare = 0;
        if (famA > famB) {
            compare = 1;
        } else if (famA < famB) {
            compare = -1;
        }
        return compare;
    }


}
