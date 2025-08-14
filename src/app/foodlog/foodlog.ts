import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface FoodEntry {
  name: string;
  details: string;
  icon?: string; // class name for icon styling
}

@Component({
  selector: 'app-foodlog',
  imports: [CommonModule],
  templateUrl: './foodlog.html',
  styleUrl: './foodlog.css'
})

export class Foodlog {

  today = new Date();
  // Example data — in a real app, you’d fetch this from an API
  foodLog: { [hour: string]: FoodEntry[] } = {
    '08:00': [
      { name: 'Avocado, Raw', details: '240 g • 389 cal • 1 cup, cubes', icon: 'avocado' },
      { name: 'Orange Tomato, Raw', details: '130 g • 27 cal • 1 medium', icon: 'tomato' },
      { name: 'Orange Tomato, Raw', details: '130 g • 27 cal • 1 medium', icon: 'tomato' },
      { name: 'Orange Tomato, Raw', details: '130 g • 27 cal • 1 medium', icon: 'tomato' },
      { name: 'Orange Tomato, Raw', details: '130 g • 27 cal • 1 medium', icon: 'tomato' },
      { name: 'Orange Tomato, Raw', details: '130 g • 27 cal • 1 medium', icon: 'tomato' },
      { name: 'Orange Tomato, Raw', details: '130 g • 27 cal • 1 medium', icon: 'tomato' },
      { name: 'Sourdough Bread', details: '112 g • 292 cal • 1 large slice', icon: 'bread' }
    ],
    '10:00': [
      { name: 'Blueberries, Fresh', details: '85 g • 48 cal • 1 cup', icon: 'blueberries' },
      { name: 'Strawberries, Fresh', details: '152 g • 49 cal • 1.5 cups', icon: 'strawberries' },
      { name: 'Iced Tea Black Unsweetened', details: '240 g • 1 cal • 1 cup', icon: 'tea' }
    ]
  };

  hours: string[] = [];

  constructor() {
    // Generate 1h intervals for the day
    for (let h = 0; h < 24; h++) {
      const hour = h.toString().padStart(2, '0') + ':00';
      this.hours.push(hour);
      if (!this.foodLog[hour]) {
        this.foodLog[hour] = [];
      }
    }
  }

  dates = [
  { day: 'S', date: 11 },
  { day: 'M', date: 12 },
  { day: 'T', date: 13 },
  { day: 'W', date: 14 },
  { day: 'T', date: 15 },
  { day: 'F', date: 16 },
  { day: 'S', date: 17 }
];

selectedDate = 14;
}
