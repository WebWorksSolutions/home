import { NgForm } from '@angular/forms';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
} from '@angular/core';

declare var data: any;
declare var particlesJS: any;

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
	public contactData = data['Contact'];
	formVisible: boolean = true;

	constructor(private changeDetectorRef: ChangeDetectorRef) {
		changeDetectorRef.detach();
	}

	ngOnInit(): void {
		particlesJS.load('particles-js2');
		this.changeDetectorRef.detectChanges();
	}

	submitData = async (form: NgForm): Promise<void> => {
		if (form.invalid) {
			return;
		} else {
			const { name, phone } = form.value;
			const method = 'POST';

			const options = {
				method,
				headers: {
					'X-Parse-Application-Id':
						'uHorTCNKAbLSrFHjm2G5vkLidWP1UsNnPKVj27va',
					'X-Parse-JavaScript-Key':
						'BD4Dsb9NkJdfsXQQVQhmSXrzgTkmz6VkGOA6ZSLZ',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, phone }),
			};

			try {
				const response = await fetch(
					'https://parseapi.back4app.com/classes/data',
					options
				);

				if (response.status === 204 || response.status === 201) {
					this.formVisible = false;
					// form.reset();
					this.changeDetectorRef.detectChanges();
					console.log('Data saved successfully');
				} else {
					console.error('Failed to save data:', response.statusText);
				}
			} catch (error) {
				console.error('Error:', error);
			}
		}
	};
}
