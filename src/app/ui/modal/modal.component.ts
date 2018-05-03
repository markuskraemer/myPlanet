import { DialogService } from './../dialog.service';
import { Component, OnInit, ElementRef } from '@angular/core';

import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/dialog.js';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
      private elementRef:ElementRef,
      private dialogService:DialogService
  ) { }

  ngOnInit() {
      console.log("INIT $ ", $);
      $('#dialog').dialog ({
        close:() => this.dialogService.closeStorageList ()
      });
  }

}
