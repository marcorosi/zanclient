import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/User';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort, MatSnackBar } from '@angular/material';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'azioni'];
  public dataSource: MatTableDataSource<User>;

  public loading: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //private users: User[];

  constructor(private service: UserService
    , private dialog: MatDialog
    , private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loading = false;
    this.load();
  }

  load() {
    this.loading = true;
    this.service.findAll().subscribe(list => {
      //this.users = list;
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(row) {
    this.service.get(row.id).subscribe(model => {
      this.openForm(model);
    });
  }

  add() {
    this.openForm(new User());
  }

  delete(row: User) {
    if (confirm(`Sei sicuro di voler cancellare l'utente ${row.firstName} ${row.lastName}`)) {
      this.service.delete(row.id).subscribe(() => {
        this.load();
      });
    }
  }

  private openForm(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '60%',
    });

    dialogRef.componentInstance.user = user;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Salvataggio riuscito', undefined, {
          duration: 3000,
        });
        this.load();
      }
    });
  }
}
