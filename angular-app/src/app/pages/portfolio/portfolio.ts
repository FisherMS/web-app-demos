import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter';
import { ProjectCardComponent } from '../../components/project-card/project-card';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, CategoryFilterComponent, ProjectCardComponent],
  template: `
    <header class="pt-8 pb-3 px-6 bg-white shrink-0">
      <h1 class="text-3xl font-black text-gray-900 mb-1.5 tracking-tight">作品集</h1>
      <p class="text-gray-400 text-xs font-bold uppercase tracking-widest opacity-80">精选作品与创意项目</p>
    </header>

    <app-category-filter />

    <main class="p-4 pb-24 min-h-screen">
      <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        @for (project of portfolioService.projects(); track project.id) {
          <app-project-card [project]="project" />
        }
      </div>
    </main>
  `
})
export class PortfolioComponent {
  portfolioService = inject(PortfolioService);
}
