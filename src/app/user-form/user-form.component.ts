import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/User';
import { MatDialogRef } from '@angular/material';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user: User;

  //l'oggetto bindato nel form
  model: User;

  constructor(private dialogRef: MatDialogRef<UserFormComponent>, private service: UserService) { }

  ngOnInit() {
    this.model = Object.assign({},this.user); //per non sporcare l'oggetto iniziale
  }

  save(){
    if(!this.model.id) {
      this.service.add(this.model).subscribe(u=>{
        this.dialogRef.close(u);
      });
    } else {
      this.service.update(this.model).subscribe(u=>{
        this.dialogRef.close(u);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
