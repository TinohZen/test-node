import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { User } from "../../models/interfaces";
import Swal from "sweetalert2";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./users.component.html",
})
export class UsersComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  users = signal<User[]>([]);
  loading = signal<boolean>(false);
  editingId = signal<number | null>(null);
  showPassword = signal<boolean>(false);

  userForm: FormGroup = this.fb.group({
    username: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });

  ngOnInit() {
    this.loadUsers();
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  loadUsers() {
    this.loading.set(true);

    this.api.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    this.loading.set(true);

    const userData = this.userForm.value;
    const id = this.editingId();

    if (id) {
      this.api.updateUser(id, userData).subscribe({
        next: () => {
          this.loadUsers();
          this.cancelEdit();

          Swal.fire({
            icon: "success",
            title: "Updated!",
            background: "#1a1a1a",
            color: "#fff",
          });
        },
        error: () => this.loading.set(false),
      });
    } else {
      this.api.createUser(userData).subscribe({
        next: () => {
          this.loadUsers();
          this.userForm.reset();

          Swal.fire({
            icon: "success",
            title: "Utilisateur enregistré !",
            showConfirmButton: false,
            timer: 1500,
            background: "#1e293b",
            color: "#f1f5f9",
          });
        },
        error: () => this.loading.set(false),
      });
    }
  }

  editUser(user: User) {
    this.editingId.set(user.id!);

    this.userForm.patchValue({
      username: user.username,
      email: user.email,
      password: "",
    });

    this.userForm.get("password")?.clearValidators();
    this.userForm.get("password")?.updateValueAndValidity();
  }

  cancelEdit() {
    this.editingId.set(null);

    this.userForm.reset();

    this.userForm.get("password")?.setValidators([Validators.required]);
    this.userForm.get("password")?.updateValueAndValidity();
  }

  deleteUser(id: number) {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Supprimer cet utilisateur ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#374151",
      confirmButtonText: "Oui, supprimer",
      background: "#1a1a1a",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading.set(true);

        this.api.deleteUser(id).subscribe({
          next: () => {
            this.loadUsers();

            Swal.fire({
              icon: "success",
              title: "Supprimé !",
              timer: 1500,
              showConfirmButton: false,
              background: "#1a1a1a",
              color: "#fff",
            });
          },
          error: () => this.loading.set(false),
        });
      }
    });
  }
}
