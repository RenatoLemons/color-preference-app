import { Component, Input } from '@angular/core';
import { colorByName } from '../data/color.domain';

@Component({
  selector: 'app-drop-icon',
  templateUrl: './drop-icon.component.html',
  styleUrls: ['./drop-icon.component.scss']
})
export class ColorIconComponent {
  colorByName = colorByName;
  @Input() colorName: string = '';
}
