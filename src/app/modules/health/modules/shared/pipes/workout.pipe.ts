import {Pipe, PipeTransform} from '@angular/core';
import {IWorkout} from '../services/workouts.service';

@Pipe({
  name: 'workout'
})
export class WorkoutPipe implements PipeTransform {

  transform(value: IWorkout, ...args: any[]): any {
    if (value.type === 'endurance') {
      return `Distance: ${value.endurance.distance}km, Duration: ${value.endurance.duration}mins`;
    }
    return `Sets: ${value.strength.sets}, Reps: ${value.strength.reps}, Weight: ${value.strength.weight}kg`;
  }

}
