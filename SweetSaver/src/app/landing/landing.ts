import { DecimalPipe } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { fromEvent } from 'rxjs';


const AUTH_STORAGE_KEY = 'sweetSaverLoggedIn';

export interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);


  readonly affixAfterPx = 140;

  readonly headerWrap = viewChild<ElementRef<HTMLElement>>('headerWrap');

  readonly scrollY = signal(0);
  readonly barHeight = signal(0);

  readonly headerPinned = computed(() => this.scrollY() > this.affixAfterPx);

  readonly featuredProducts: FeaturedProduct[] = [
    {
      id: 'f1',
      name: 'Chocolate Chip Cookies',
      price: 5.99,
      image:
        'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80&auto=format&fit=crop',
    },
    {
      id: 'f2',
      name: 'Berry Danish',
      price: 3.5,
      image:
        'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80&auto=format&fit=crop',
    },
    {
      id: 'f3',
      name: 'Red Velvet Slice',
      price: 6.0,
      image:
        'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e4e?w=600&q=80&auto=format&fit=crop',
    },
  ];

  constructor() {
    afterNextRender(() => {
      const measureBar = () => {
        const el = this.headerWrap()?.nativeElement;
        if (el) {
          this.barHeight.set(el.offsetHeight);
        }
      };

      const applyScroll = () => {
        const y =
          window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const wasPinned = this.scrollY() > this.affixAfterPx;
        this.scrollY.set(y);
        const nowPinned = y > this.affixAfterPx;
        if (wasPinned !== nowPinned) {
          requestAnimationFrame(() => measureBar());
        }
      };

      applyScroll();
      requestAnimationFrame(() => measureBar());

      fromEvent(window, 'scroll', { passive: true })
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(applyScroll);

      fromEvent(window, 'resize', { passive: true })
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(() => {
          applyScroll();
          requestAnimationFrame(() => measureBar());
        });
    });
  }

  onBuy(_productId: string): void {
    if (this.isLoggedIn()) {
      void this.#router.navigate(['/discover']);
      return;
    }
    void this.#router.navigate(['/sign-in']);
  }

  private isLoggedIn(): boolean {
    return typeof localStorage !== 'undefined' && localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  }
}
