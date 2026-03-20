import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, Entity, UserEntity } from "../models/interfaces";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private http = inject(HttpClient);

  // Utilise l'URL définie dans les fichiers src/environments/
  private apiUrl = environment.apiUrl;

  /** * SECTION : USERS
   * Routes correspondantes : /api/users
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  /** * SECTION : ENTITIES
   * Routes correspondantes : /api/entities
   */
  getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(`${this.apiUrl}/entities`);
  }

  getEntity(id: number): Observable<Entity> {
    return this.http.get<Entity>(`${this.apiUrl}/entities/${id}`);
  }

  createEntity(entity: Partial<Entity>): Observable<Entity> {
    return this.http.post<Entity>(`${this.apiUrl}/entities`, entity);
  }

  updateEntity(id: number, entity: Partial<Entity>): Observable<Entity> {
    return this.http.put<Entity>(`${this.apiUrl}/entities/${id}`, entity);
  }

  deleteEntity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/entities/${id}`);
  }

  /** * SECTION : ASSOCIATIONS (UserEntity)
   * Routes correspondantes : /api/user-entities
   */
  getUserEntities(): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>(`${this.apiUrl}/user-entities`);
  }

  // Cette méthode crée une nouvelle ligne dans la table de jointure
  addEntityToUser(userId: number, entityId: number): Observable<UserEntity> {
    return this.http.post<UserEntity>(`${this.apiUrl}/user-entities`, {
      userId,
      entityId,
    });
  }

  // Cette méthode met à jour une association existante via son ID
  updateUserEntity(
    id: number,
    userId: number,
    entityId: number
  ): Observable<UserEntity> {
    return this.http.put<UserEntity>(`${this.apiUrl}/user-entities/${id}`, {
      userId,
      entityId,
    });
  }

  // Cette méthode supprime l'association (la ligne dans la table de jointure)
  removeEntityFromUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user-entities/${id}`);
  }
}
