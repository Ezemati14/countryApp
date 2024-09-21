import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit {
  
    private debouncer: Subject<string> = new Subject<string>();

    @Input()
    public placeholder: string = '';

    @Input()
    public initialValue: string = '';

    @Output()
    public onValue = new EventEmitter<string>();

    ngOnInit(): void {
      this.debouncer
      .pipe(
        debounceTime(1000)
      )
      .subscribe( value => {

      })
    }


    emitValue(value:string):void{
      this.onValue.emit(value);
    }

    onKeyPress(search: string) {
        this.debouncer.next(search);
    }
}
