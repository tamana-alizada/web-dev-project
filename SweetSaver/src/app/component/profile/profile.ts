import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile, Order } from '../../core/models';
import { Auth, BackendProfile } from '../../services/auth';
import { CartService } from '../../services/cart.service';
import { Toast } from '../../shared/toast/toast';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, Toast],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  private auth = inject(Auth);
  private cartService = inject(CartService);
  private router = inject(Router);

  profile = signal<Profile | null>(null);
  orders = signal<Order[]>([]);

  loading = signal(true);
  error = signal('');

  isEditing = signal(false);
  saving = signal(false);

  editFullName = signal('');
  editPhone = signal('');
  editCity = signal('');
  editBio = signal('');

  selectedImageFile: File | null = null;

  toastMessage = signal('');
  toastType = signal<'success' | 'error' | 'info'>('info');

  ngOnInit(): void {
    this.loadProfile();
    this.loadOrders();
  }

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);

    setTimeout(() => {
      this.toastMessage.set('');
    }, 2500);
  }

  loadProfile(): void {
    this.loading.set(true);

    this.auth.getProfile().subscribe({
      next: (user: BackendProfile) => {
        this.profile.set({
          username: user.username,
          email: user.email,
          full_name: user.full_name || user.username,
          phone: user.phone || 'Not provided',
          city: user.city || user.address || 'Not provided',
          bio: user.bio || 'Welcome to your SweetSaver profile.',
          avatar_url:
            user.profile_image ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTre4TseOqU7NynnfZPa9QM2YuHLO9KdVPwrA&s'
        });

        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.error.set('Failed to load profile.');
        this.loading.set(false);
      }
    });
  }

  loadOrders(): void {
    this.cartService.getOrders().subscribe({
      next: (data) => {
        const normalizedOrders = data.map((order) => ({
          ...order,
          total: Number(order.total),
          items: order.items.map((item) => ({
            ...item,
            price: Number(item.price),
            subtotal: Number(item.subtotal)
          }))
        }));

        this.orders.set(normalizedOrders);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  startEditing(): void {
    const userProfile = this.profile();
    if (!userProfile) return;

    this.editFullName.set(userProfile.full_name);
    this.editPhone.set(userProfile.phone === 'Not provided' ? '' : userProfile.phone);
    this.editCity.set(userProfile.city === 'Not provided' ? '' : userProfile.city);
    this.editBio.set(userProfile.bio);

    this.isEditing.set(true);
  }

  cancelEditing(): void {
    this.selectedImageFile = null;
    this.isEditing.set(false);
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.selectedImageFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      const currentProfile = this.profile();
      if (!currentProfile) return;

      this.profile.set({
        ...currentProfile,
        avatar_url: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  }

  saveProfile(): void {
    this.saving.set(true);

    const formData = new FormData();
    formData.append('full_name', this.editFullName().trim());
    formData.append('phone', this.editPhone().trim());
    formData.append('city', this.editCity().trim());
    formData.append('address', this.editCity().trim());
    formData.append('bio', this.editBio().trim());

    if (this.selectedImageFile) {
      formData.append('profile_image', this.selectedImageFile);
    }

    this.auth.updateProfileWithImage(formData).subscribe({
      next: (updatedUser: BackendProfile) => {
        this.profile.set({
          username: updatedUser.username,
          email: updatedUser.email,
          full_name: updatedUser.full_name || updatedUser.username,
          phone: updatedUser.phone || 'Not provided',
          city: updatedUser.city || updatedUser.address || 'Not provided',
          bio: updatedUser.bio || 'Welcome to your SweetSaver profile.',
          avatar_url:
            updatedUser.profile_image ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTre4TseOqU7NynnfZPa9QM2YuHLO9KdVPwrA&s'
        });

        this.selectedImageFile = null;
        this.isEditing.set(false);
        this.saving.set(false);
        this.showToast('Profile updated successfully!', 'success');
      },
      error: (err) => {
        console.log(err);
        this.saving.set(false);
        this.showToast('Failed to update profile.', 'error');
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/sign-in']);
  }
}