import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import servicesData from '../../data/services.json';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="pt-8 pb-3 px-6 bg-white shrink-0">
      <h1 class="text-3xl font-black text-gray-900 mb-1.5 tracking-tight">服务范围</h1>
      <p class="text-gray-400 text-xs font-bold uppercase tracking-widest opacity-80">为您提供的专业服务</p>
    </header>

    <main class="p-4 pb-24 max-w-2xl mx-auto">
      <div class="space-y-4">
        @for (service of services; track service.id) {
          <div class="bg-white p-5 rounded-4xl shadow-sm border border-gray-100 flex items-center gap-5 transition-all duration-300 hover:shadow-md group">
            <div class="text-3xl bg-gray-50 p-3 rounded-2xl h-16 w-16 flex items-center justify-center shrink-0 group-hover:bg-gray-100 transition-colors duration-300">{{service.icon}}</div>
            <div>
              <h3 class="font-bold text-lg text-gray-900 mb-0.5">{{service.title}}</h3>
              <p class="text-gray-500 text-[13px] leading-relaxed font-medium">{{service.description}}</p>
            </div>
          </div>
        }
      </div>
    </main>
  `
})
export class ServicesComponent {
  services = servicesData.filter(s => s.visible !== false);
}
