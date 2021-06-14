import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'zeros'
})
export class ZerosPipe implements PipeTransform {

	readonly ZERO = "0";

	transform(value: number, casas: number): string {
		var s = String(value);
		while (s.length < casas || s.length < 2) { s = this.ZERO + s; }
		return s;
	}

}
