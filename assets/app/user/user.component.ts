import {Component, Input} from "@angular/core";

import {User} from "./user.model";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {IdentifierService} from "../identifier/identifier.service";
import {Identifier} from "../identifier/identifier.model";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styles:[`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})

export class UserComponent{
    @Input() user: User;
    @Input() identifiers: Identifier;

    constructor(private userService: UserService,
                private router: Router,
                private identfierService:IdentifierService){}


    onEdit(){
        this.userService.editUser(this.user);
    }
    onDelete(){

        var myConfirm = confirm('Wilt u "' + this.user.firstName + ' ' + this.user.lastName + '" echt verwijderen?');
        if (myConfirm === false) return;
        this.userService.deleteUser(this.user)
            .subscribe(
                result => alert(result.title)
            );
    }
    onAddIdentifier(user: User){
        this.userService.editIdentifier(true);
        this.router.navigate(['/users', user.userId]);
    }
}