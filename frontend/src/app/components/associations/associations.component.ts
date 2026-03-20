import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { User, Entity, UserEntity } from "../../models/interfaces";
import Swal, { SweetAlertResult } from "sweetalert2";

@Component({
  selector: "app-associations",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./associations.component.html",
})
export class AssociationsComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  // Signals pour les données
  users = signal<User[]>([]);
  entities = signal<Entity[]>([]);
  associations = signal<UserEntity[]>([]);

  // Signals d'état
  loading = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  editingId = signal<number | null>(null);

  assocForm: FormGroup = this.fb.group({
    userId: ["", Validators.required],
    entityId: ["", Validators.required],
  });

  ngOnInit() {
    this.loadAllData();
  }

  loadAllData() {
    this.loading.set(true);
    this.api.getUsers().subscribe((data) => this.users.set(data));
    this.api.getEntities().subscribe((data) => this.entities.set(data));
    this.loadAssociations();
  }

  loadAssociations() {
    this.api.getUserEntities().subscribe({
      next: (data) => {
        this.associations.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onSubmit() {
    if (this.assocForm.invalid) return;
    this.loading.set(true);

    const { userId, entityId } = this.assocForm.value;

    if (this.isEditing() && this.editingId()) {
      this.api
        .updateUserEntity(this.editingId()!, +userId, +entityId)
        .subscribe({
          next: () => this.handleSuccess("Association mise à jour !"),
          error: () => this.handleError(),
        });
    } else {
      this.api.addEntityToUser(+userId, +entityId).subscribe({
        next: () => this.handleSuccess("Liaison réussie !"),
        error: () => this.handleError(),
      });
    }
  }

  editAssociation(assoc: UserEntity) {
    this.isEditing.set(true);
    this.editingId.set(assoc.id!);
    this.assocForm.patchValue({
      userId: assoc.userId,
      entityId: assoc.entityId,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  deleteAssociation(id: number) {
    Swal.fire({
      title: "Supprimer ?",
      text: "Cette association sera définitivement supprimée.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#334155",
      confirmButtonText: "Oui, supprimer",
      background: "#1e293b",
      color: "#f1f5f9",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.loading.set(true);
        this.api.removeEntityFromUser(id).subscribe({
          next: () => {
            this.associations.set(
              this.associations().filter((a) => a.id !== id)
            );
            this.loading.set(false);
            Swal.fire({
              icon: "success",
              title: "Supprimé !",
              background: "#1e293b",
              color: "#f1f5f9",
              timer: 1500,
              showConfirmButton: false,
            });
          },
          error: () => this.handleError(),
        });
      }
    });
  }

  private handleSuccess(message: string) {
    this.loading.set(false);
    this.cancelEdit();
    this.loadAssociations();
    Swal.fire({
      icon: "success",
      title: message,
      background: "#1e293b",
      color: "#f1f5f9",
      timer: 2000,
      showConfirmButton: false,
    });
  }

  private handleError() {
    this.loading.set(false);
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: "L'opération a échoué.",
      background: "#1e293b",
      color: "#f1f5f9",
    });
  }

  cancelEdit() {
    this.isEditing.set(false);
    this.editingId.set(null);
    this.assocForm.reset({ userId: "", entityId: "" });
  }

  // Remplace ces deux fonctions dans associations.component.ts

  getUserName(id: any) {
    if (!id) return "Utilisateur inconnu";

    const user = this.users().find((u) => String(u.id) === String(id));
    return user ? user.username : `User #${id}`;
  }

  getEntityName(id: any) {
    if (!id) return "Entité inconnue";

    const entity = this.entities().find((e) => String(e.id) === String(id));
    return entity ? entity.name : `Entity #${id}`;
  }
}
