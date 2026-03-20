import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Entity } from "../../models/interfaces";
import Swal from "sweetalert2";

@Component({
  selector: "app-entities",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./entities.component.html",
})
export class EntitiesComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  entities = signal<Entity[]>([]);
  loading = signal<boolean>(false);
  editingId = signal<number | null>(null);

  entityForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
  });

  ngOnInit() {
    this.loadEntities();
  }

  loadEntities() {
    this.loading.set(true);
    this.api.getEntities().subscribe({
      next: (data) => {
        this.entities.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error("Failed to load entities", err);
        this.loading.set(false);
      },
    });
  }

  onSubmit() {
    if (this.entityForm.invalid) return;

    this.loading.set(true);
    const entityData = this.entityForm.value;
    const id = this.editingId();

    if (id) {
      this.api.updateEntity(id, entityData).subscribe({
        next: () => {
          this.loadEntities();
          this.cancelEdit();
          Swal.fire({
            icon: "success",
            title: "Updated!",
            background: "#1a1a1a",
            color: "#fff",
            timer: 1500,
            showConfirmButton: false,
          });
        },
        error: (err) => {
          console.error("Failed to update entity", err);
          this.loading.set(false);
        },
      });
    } else {
      this.api.createEntity(entityData).subscribe({
        next: () => {
          this.loadEntities();
          this.entityForm.reset();
          Swal.fire({
            icon: "success",
            title: "Created!",
            background: "#1a1a1a",
            color: "#fff",
            timer: 1500,
            showConfirmButton: false,
          });
        },
        error: (err) => {
          console.error("Failed to create entity", err);
          this.loading.set(false);
        },
      });
    }
  }

  editEntity(entity: Entity) {
    this.editingId.set(entity.id!);
    this.entityForm.patchValue({
      name: entity.name,
    });
  }

  cancelEdit() {
    this.editingId.set(null);
    this.entityForm.reset();
  }

  deleteEntity(id: number) {
    Swal.fire({
      title: "Action Dangereuse",
      text: "Supprimer cette entité ?",
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
        this.api.deleteEntity(id).subscribe({
          next: () => {
            this.loadEntities();
            Swal.fire({
              icon: "success",
              title: "Supprimé !",
              timer: 1500,
              showConfirmButton: false,
              background: "#1a1a1a",
              color: "#fff",
            });
          },
          error: (err) => {
            console.error("Failed to delete entity", err);
            this.loading.set(false);
          },
        });
      }
    });
  }
}
