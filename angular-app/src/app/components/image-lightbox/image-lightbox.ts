import { Component, inject, signal, HostListener, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-image-lightbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (portfolioService.lightboxOpen()) {
      <div 
        class="fixed inset-0 z-100 transition-opacity duration-300" 
        [ngClass]="opacity() ? 'opacity-100' : 'opacity-0'"
        aria-modal="true" 
        role="dialog"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/95 backdrop-blur-md" (click)="close()"></div>

        <!-- Close Button -->
        <button (click)="close()" class="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Prev Button -->
        @if (gallery().length > 1) {
          <button (click)="prev($event)" class="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        }

        <!-- Next Button -->
        @if (gallery().length > 1) {
          <button (click)="next($event)" class="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        }

        <!-- Content Container -->
        <div (touchstart)="onTouchStart($event)" (touchend)="onTouchEnd($event)" class="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
          <div class="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center pointer-events-auto">
            <!-- Image -->
            <img 
              [src]="currentImage()" 
              alt="Project Preview" 
              class="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl transition-transform duration-300 transform" 
              [ngClass]="opacity() ? 'scale-100' : 'scale-95'"
              (load)="onLoad()"
            />
            
            <!-- Loading Indicator -->
            @if (loading()) {
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div class="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              </div>
            }

            <!-- Description Box -->
            <div class="mt-6 text-center max-w-2xl px-4">
              <h3 class="text-2xl font-bold text-white mb-2 tracking-tight">{{ project()?.title }}</h3>
              <p class="text-white/80 text-sm leading-relaxed font-light">{{ project()?.description }}</p>
              @if (gallery().length > 1) {
                <div class="text-white/40 text-xs mt-2">{{ currentIndex() + 1 }} / {{ gallery().length }}</div>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class ImageLightboxComponent {
  portfolioService = inject(PortfolioService);

  currentIndex = signal(0);
  loading = signal(false);
  opacity = signal(false);

  project = computed(() => this.portfolioService.currentProject());

  gallery = computed(() => {
    const p = this.project();
    if (!p) return [];
    return p.images && p.images.length > 0 ? p.images : [p.imageUrl];
  });

  currentImage = computed(() => this.gallery()[this.currentIndex()] || '');

  constructor() {
    // Show animation when opened
    effect(() => {
      const open = this.portfolioService.lightboxOpen();
      if (open) {
        this.currentIndex.set(0);
        this.loading.set(true);
        setTimeout(() => this.opacity.set(true), 10);
      } else {
        this.opacity.set(false);
      }
    });
  }

  onLoad() {
    this.loading.set(false);
  }

  next(event?: Event) {
    event?.stopPropagation();
    if (this.gallery().length <= 1) return;
    this.loading.set(true);
    this.currentIndex.update(i => (i + 1) % this.gallery().length);
  }

  prev(event?: Event) {
    event?.stopPropagation();
    if (this.gallery().length <= 1) return;
    this.loading.set(true);
    this.currentIndex.update(i => (i - 1 + this.gallery().length) % this.gallery().length);
  }

  close() {
    this.opacity.set(false);
    setTimeout(() => this.portfolioService.closeLightbox(), 300);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.portfolioService.lightboxOpen()) return;
    if (event.key === 'Escape') this.close();
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.prev();
  }

  private touchStartX = 0;
  private touchEndX = 0;

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    if (this.gallery().length <= 1) return;
    if (this.touchEndX < this.touchStartX - 50) this.next();
    if (this.touchEndX > this.touchStartX + 50) this.prev();
  }
}
