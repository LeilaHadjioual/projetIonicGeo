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
    myImage: any ;


    constructor(private dataUnescoService: DataUnescoService) {
    }

    ngOnInit() {
        this.initializeJsonData();
    }

    initializeJsonData() {
        this.dataUnescoService.getAllData().subscribe(data => {
            this.jsonData = data.records;
            console.log('data', this.jsonData);
            this.jsonData.sort(this.sortJsonData);
            this.httpGetAsync('https://whc.unesco.org/en/list/230/gallery/&maxrows=10', function(res) {
                let el = document.createElement( 'html' );
                el.innerHTML = res;
                let imgs = el.getElementsByClassName('icaption-img');
                for (let k = 0; k < imgs.length; k++) {
                    console.log(imgs[k].getAttribute('data-src'));
                    console.log('imagesss', this.myImage);
                }

            });
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

    httpGetAsync(theUrl, callback) {
        let xmlHttp = new XMLHttpRequest();
        // tslint:disable-next-line:only-arrow-functions
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                callback(xmlHttp.responseText);
            }
        };
        xmlHttp.open('GET', theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }


}
