import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  orderForm: FormGroup;
  panels: FormArray;
  data = [
    {
      questionnaireHazardGroupHazard: {
        questionnaireHazardGroup: {
          questionnaireVersion: {
            id: 'f16cf7fd-a902-4f5d-b960-6a848e93eb9e',
            number: 1,
          },
          hazardGroups: {
            id: '9988b87-7bde-4657-9ba0-298867c1774d',
            name: 'Hazards due to organizational factors (at plant level, not homework)',
            imageUrl: null,
            enabled: true,
          },
          orderNumber: 1,
        },
      },
      hazardsList: [
        {
          id: '1firstcheck',
          name: 'Instructions',
          localLegislativeRelated: false,
          enabled: true,
          questionnaireHazardGroupHazardId:
            'b51e4bbe-b448-4f59-afe2-22e255538f34',
          orderNumber: 1,
        },
        {
          id: '1secondcheck',
          name: 'some special hazard',
          localLegislativeRelated: false,
          enabled: true,
          questionnaireHazardGroupHazardId:
            'ea125288-2a28-4bb1-9382-87b5fec887c8',
          orderNumber: 1,
        },
      ],
    },
    {
      questionnaireHazardGroupHazard: {
        questionnaireHazardGroup: {
          questionnaireVersion: {
            id: 'f16cf7fd-a902-4f5d-b960-6a848e93eb9e',
            number: 2,
          },
          hazardGroups: {
            id: '9988b87-7bde-4657-9ba0-298867c1774d',
            name: 'Hazards due to organizational factors (at plant level, not homework)',
            imageUrl: null,
            enabled: true,
          },
          orderNumber: 2,
        },
      },
      hazardsList: [
        {
          id: '2firstcheck',
          name: 'Instructions',
          localLegislativeRelated: false,
          enabled: true,
          questionnaireHazardGroupHazardId:
            'b51e4bbe-b448-4f59-afe2-22e255538f34',
          orderNumber: 2,
        },
        {
          id: '2secondcheck',
          name: 'some special hazard',
          localLegislativeRelated: false,
          enabled: true,
          questionnaireHazardGroupHazardId:
            'ea125288-2a28-4bb1-9382-87b5fec887c8',
          orderNumber: 2,
        },
      ],
    },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.orderForm = new FormGroup({
      panels: new FormArray([]),
    });
    this.addPanels(this.data);
  }

  createPanel(data): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(''),
      imageUrl: new FormControl(''),
      orderNumber: new FormControl(''),
      hazardsList: new FormArray([]),
    });
  }

  addHazard(hazard): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
    });
  }

  addPanels(data): void {
    this.panels = this.orderForm.get('panels') as FormArray;
    data.forEach((panel, index) => {
      this.panels.push(this.createPanel(panel));
      let paneldata = this.panels.at(index).get('hazardsList') as FormArray;
      panel.hazardsList.forEach((hazard) => {
        paneldata.push(this.addHazard(panel));
      });
    });
    console.log(this.panels);
  }
}
