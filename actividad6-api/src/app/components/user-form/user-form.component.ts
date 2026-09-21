import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  editMode = false;
  userId?: number;
  loadingUser = false;
  sending = false;
  apiMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      password: ['']
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editMode = true;
      this.userId = Number(idParam);
      this.loadUser(this.userId);
    } else {
      this.userForm.get('password')?.addValidators([Validators.required, Validators.minLength(4)]);
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  loadUser(id: number): void {
    this.loadingUser = true;

    this.usersService.getUserById(id).subscribe({
      next: user => {
        this.userForm.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          image: user.image
        });
        this.loadingUser = false;
      },
      error: () => {
        this.errorMessage = 'No se han podido cargar los datos del usuario.';
        this.loadingUser = false;
      }
    });
  }

  save(): void {
    this.apiMessage = '';
    this.errorMessage = '';

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.sending = true;
    const data: User = this.userForm.value;

    if (this.editMode && this.userId) {
      delete data.password;
      this.usersService.updateUser(this.userId, data).subscribe({
        next: () => {
          this.sending = false;
          this.apiMessage = 'Usuario actualizado correctamente. La API devuelve una respuesta simulada.';
        },
        error: () => {
          this.sending = false;
          this.errorMessage = 'No se ha podido actualizar el usuario.';
        }
      });
    } else {
      this.usersService.createUser(data).subscribe({
        next: user => {
          this.sending = false;
          this.apiMessage = `Usuario creado correctamente con id ${user.id}. La API es de pruebas y no lo añade realmente al listado.`;
          this.userForm.reset();
        },
        error: () => {
          this.sending = false;
          this.errorMessage = 'No se ha podido crear el usuario.';
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }

  isInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }
}
