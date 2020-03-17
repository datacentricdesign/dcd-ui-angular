import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  ViewChild,
  ElementRef,
  AfterContentInit,
  Inject,
  PLATFORM_ID
} from "@angular/core";
import { Gallery, GalleryRef } from "@ngx-gallery/core";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";

@Component({
  selector: "dcd-property-images",
  templateUrl: "./property-images.component.html",
  styleUrls: ["./property-images.component.css"]
})
export class PropertyImagesComponent implements OnInit, AfterContentInit {
  @Input() property_values: any[];
  @Input() checked: boolean;
  @Input() property_dimensions: any[];

  @ViewChild("labelInput", { static: false }) labelInput: ElementRef;

  galleryId = "imageGallery";
  galleryRef: GalleryRef = this.gallery.ref(this.galleryId);

  data: any[];
  newLabel: String[] = [];
  src: any[];
  thumb: any[];
  markers: {} = { markers: [], fitBounds: true };

  showData: boolean = false;
  ref: boolean = true;
  sliderSize: number = 0;
  index_slider: number = 0;
  step_count: number = 1;
  date: Date;

  constructor(
    public gallery: Gallery,
    @Inject(PLATFORM_ID) private platformId: Object //<-- if browser
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.property_values || this.galleryRef.indexChanged) {
      this.refresh();
      const values: any[] = changes.property_values.currentValue;
      if (this.checked) {
        this.show_realtime(values);
      } else {
        this.show_manual(values);
      }
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      //<-- if browser
      this.data = this.property_values;

      this.data.map(item =>
        this.galleryRef.addImage({
          src: item[1],
          thumb: item[1],
          title: item[2]
        })
      );

      const gIndexObservable = this.galleryRef.indexChanged;
      gIndexObservable.subscribe(data => {
        this.index_slider = data.currIndex;
      });
    }
    if (isPlatformServer(this.platformId)) {
    }
  }

  ngAfterContentInit() {
    this.index_slider = 0;
    this.date = new Date(this.property_values[this.index_slider][0]);
  }

  refresh() {
    this.ref = !this.ref;
  }

  onInputEnter(value: string) {
    this.newLabel.push(value.toString());
    this.labelInput.nativeElement.value = null;
    console.log(this.newLabel);
  }

  handleChange(e) {
    this.index_slider = e.value;
    this.galleryRef.set(e.value);
    this.newLabel = [];
    this.date = new Date(this.property_values[this.index_slider][0]);
  }

  show_realtime(values: any[]) {
    if (values.length > 0) {
      this.showData = true;
      this.index_slider = values.length - 1;
      this.date = new Date(values[this.index_slider][0]);
    } else {
      this.showData = false;
    }
  }

  show_manual(values: any[]) {
    this.sliderSize = values.length - 1;

    if (values.length > 0) {
      this.showData = true;
      this.index_slider = values.length - 1;
      this.date = new Date(values[this.index_slider][0]);
    } else {
      this.showData = false;
    }
  }

  onSubmit() {
    this.data.map(item => item[2].push(this.newLabel.toString()));
  }
}
