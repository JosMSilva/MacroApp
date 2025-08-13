import { Component, computed, signal} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';


type Macro = { label: string; color: string; consumed: number; target: number };

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard {

  /********************************* Temporary Data *********************************/
  targetCalories = signal(2781);
  consumedCalories = signal(1200);
  macros = signal<Macro[]>([
  { label: 'Protein', color: '#ff7b6e', consumed: 95, target: 140 },
  { label: 'Fat',     color: '#f1c40f', consumed:  65, target:  92 },
  { label: 'Carbs',   color: '#2ecc71', consumed: 200, target: 346 },
  //{ label: 'Saturated Fat',   color: '#f18f0fff', consumed: 20, target: 46 },
  //{ label: 'Sugar',   color: '#2eccbfff', consumed: 28, target: 36 },
  ]);
  expenditure7d = signal<number[]>([2440, 2460, 2540, 2430, 2420, 2440, 2440]);
  weight7d      = signal<number[]>([62.4, 62.4, 62.4, 62.4, 62.4, 62.4, 62.4]);

  energyBalance7d(): number[] {
    const goal = this.targetCalories();
    return this.expenditure7d().map(dayValue => goal - dayValue);
  }


  /********************************* Signals *********************************/
  today = new Date();
  mode = signal<'remaining' | 'consumed'>('remaining');


  /********************************* Computed Values for Calories *********************************/

  // Total calories remaining
  remainingCalories = computed(() =>
    Math.max(this.targetCalories() - this.consumedCalories(), 0)
  );

  // Ring progress as fraction for consumed or remaining mode
  ringProgress = computed(() => {
    const total = this.targetCalories();
    const value = this.mode() === 'consumed' ? this.consumedCalories() : this.remainingCalories();
    return total > 0 ? value / total : 0;
  });

  // Percentage of calories consumed or remaining
  get progressPercent(): string {
    return `${Math.round(this.ringProgress() * 100)}%`;
  }

  // Calories remaining or consumed based on mode
  caloriesLeftOrUsed(): number {
    return this.mode() === 'consumed' ? this.consumedCalories() : this.remainingCalories();
  }

  /********************************* Computed Values for Macros *********************************/

  macroRemaining(m: Macro): number {
    return Math.max(m.target - m.consumed, 0);
  }

  macroProgress(m: Macro): number {
    const value = this.mode() === 'consumed' ? m.consumed : this.macroRemaining(m);
    return m.target > 0 ? value / m.target : 0;
  }


  /********************************* Create SVG with Week Data *********************************/

  /******** Define The Scale of The Graphs ********/
  getSparkScales(values: number[], width = 260, height = 64, pad = 8) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = Math.max(max - min, 1e-6);
    const stepX = (width - pad * 2) / Math.max(values.length - 1, 1);
    const scaleY = (v: number) => height - pad - ((v - min) / span) * (height - pad * 2);

    return { min, max, span, stepX, scaleY };
  }

  /******** Graph ********/
  spark(values: number[], width = 260, height = 64, pad = 8): string {
    if (!values.length) return '';
    const { stepX, scaleY } = this.getSparkScales(values, width, height, pad);

    return values.map((v, i) => `${i ? 'L' : 'M'} ${pad + i * stepX},${scaleY(v)}`).join(' ');
  }

  /******** Graph Dots ********/
  sparkDots(values: number[], width = 260, height = 64, pad = 8) {
    if (!values.length) return [];
    const { stepX, scaleY } = this.getSparkScales(values, width, height, pad);

    return values.map((v, i) => ({cx: pad + i * stepX,cy: scaleY(v)}));
  }

  /******** Graph Average Line ********/
  sparkAvgLine(values: number[], width = 260, height = 64, pad = 8) {
    if (!values.length) return null;
    const { stepX, scaleY } = this.getSparkScales(values, width, height, pad);

    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const avgY = scaleY(avg);

    return { y: avgY, x1: pad, x2: width - pad };
  }

  /******** Calculate Average ********/
  getAverage(values: number[]): number {
    if (!values.length) return 0;
    return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
  }

hours = [
  { time: '09:00', event: 'Oat Meal' },
  { time: '10:00', event: 'Protein Shake' },
  { time: '11:00', event: '' },
  { time: '12:00', event: 'Spaghetti Carbonara' },
  { time: '13:00', event: '' },
  { time: '14:00', event: 'Protein Bar' }
];

isCurrentHour(hour: string) {
  const now = new Date();
  const current = now.getHours().toString().padStart(2, '0') + ':00';
  return current === hour;
}

}
