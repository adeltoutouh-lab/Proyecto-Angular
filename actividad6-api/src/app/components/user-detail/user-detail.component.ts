import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  user?: User;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.usersService.getUserById(id).subscribe({
      next: user => {
        this.user = user;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se ha podido recuperar el usuario.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  update(): void {
    if (this.user?.id) {
      this.router.navigate(['/updateuser', this.user.id]);
    }
  }

  delete(): void {
    if (!this.user?.id) return;

    const accepted = confirm(`¿Deseas borrar al usuario ${this.user.first_name} ${this.user.last_name}?`);
    if (!accepted) return;

    this.usersService.deleteUser(this.user.id).subscribe({
      next: () => {
        alert('Usuario eliminado correctamente (respuesta simulada por la API).');
        this.router.navigate(['/home']);
      },
      error: () => alert('No se ha podido eliminar el usuario.')
    });
  }
}
