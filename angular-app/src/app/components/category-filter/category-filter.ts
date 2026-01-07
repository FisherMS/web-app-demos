import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100/50 py-4 overflow-x-auto no-scrollbar">
      <div class="flex px-4 space-x-3 min-w-max">
        @for (cat of portfolioService.categories(); track cat.id) {
          <button
            (click)="portfolioService.setCategory(cat.name)"
            class="px-5 py-2 rounded-full text-[11px] font-bold transition-all duration-300 transform active:scale-95 whitespace-nowrap tracking-wide shadow-sm"
            [ngClass]="portfolioService.selectedCategory() === cat.name ? 'bg-black text-white shadow-black/10' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
          >
            {{cat.name}}
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `]
})
export class CategoryFilterComponent {
  portfolioService = inject(PortfolioService);
}
