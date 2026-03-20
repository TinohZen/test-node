import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <nav
        class="bg-gray-950 border-b border-gray-800 shadow-xl sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <span
                  class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-yellow-500">
                  App test
                </span>
              </div>
            </div>

            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a
                  routerLink="/users"
                  routerLinkActive="bg-gray-800 text-white border-blue-500"
                  class="border-b-2 border-transparent text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-t-md text-sm font-medium transition-all">
                  Utilisateurs
                </a>
                <a
                  routerLink="/entities"
                  routerLinkActive="bg-gray-800 text-white border-blue-500"
                  class="border-b-2 border-transparent text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-t-md text-sm font-medium transition-all">
                  Entités
                </a>
                <a
                  routerLink="/associations"
                  routerLinkActive="bg-gray-800 text-white border-yellow-500"
                  class="border-b-2 border-transparent text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-t-md text-sm font-medium transition-all">
                  Associations
                </a>
              </div>
            </div>

            <div class="md:hidden flex items-center">
              <button
                (click)="toggleMenu()"
                class="text-gray-400 hover:text-white focus:outline-none p-2">
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  @if (!isMenuOpen()) {
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                  } @else {
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        @if (isMenuOpen()) {
        <div
          class="md:hidden bg-gray-950 border-t border-gray-800 animate-fade-in">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              routerLink="/users"
              (click)="isMenuOpen.set(false)"
              routerLinkActive="bg-blue-600 text-white"
              class="block text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-3 rounded-md text-base font-medium">
              <i class="fa-solid fa-users mr-3"></i>Utilisateurs
            </a>
            <a
              routerLink="/entities"
              (click)="isMenuOpen.set(false)"
              routerLinkActive="bg-blue-600 text-white"
              class="block text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-3 rounded-md text-base font-medium">
              <i class="fa-solid fa-building mr-3"></i>Entités
            </a>
            <a
              routerLink="/associations"
              (click)="isMenuOpen.set(false)"
              routerLinkActive="bg-yellow-600 text-white"
              class="block text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-3 rounded-md text-base font-medium">
              <i class="fa-solid fa-link mr-3"></i>Associations
            </a>
          </div>
        </div>
        }
      </nav>

      <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .animate-fade-in {
        animation: fadeIn 0.2s ease-out;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class App {
  // Signal pour gérer l'ouverture du menu mobile
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}
