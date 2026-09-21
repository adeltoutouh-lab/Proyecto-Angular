import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  currentPage = 1;
  totalPages = 1;
  loading = false;
  errorMessage = '';

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 1): void {
    this.loading = true;
    this.errorMessage = '';

    this.usersService.getUsers(page).subscribe({
      next: response => {
        this.users = response.data;
        this.currentPage = response.page;
        this.totalPages = response.total_pages;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se ha podido cargar el listado de usuarios.';
        this.loading = false;
      }
    });
  }

  viewUser(id?: number): void {
    if (id) {
      this.router.navigate(['/user', id]);
    }
  }

  updateUser(id?: number): void {
    if (id) {
      this.router.navigate(['/updateuser', id]);
    }
  }

  deleteUser(user: User): void {
    if (!user.id) return;

    const accepted = confirm(`¿Deseas borrar al usuario ${user.first_name} ${user.last_name}?`);
    if (!accepted) return;

    this.usersService.deleteUser(user.id).subscribe({
      next: () => {
        alert('Usuario eliminado correctamente (respuesta de la API de pruebas).');
        this.users = this.users.filter(item => item.id !== user.id);
      },
      error: () => alert('No se ha podido eliminar el usuario.')
    });
  }
}
