import {Component, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from './shared/user.service';
import {AuthenticationService} from '../shared/services/authentication.service';
import {User} from './shared/user';
import {Customer} from './shared/customer';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    userForm = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.minLength(0)]),
    lname: new FormControl('', [Validators.required, Validators.minLength(0)]),
    email: new FormControl('', [Validators.required]),
    pNumber: new FormControl('', []),
    streetName: new FormControl('', [Validators.required, Validators.minLength(0)]),
    postalCode: new FormControl('', [Validators.required, Validators.min(0), Validators.max(9999)]),
    cityName: new FormControl('', [Validators.required]),
  });

  updateForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, {validators: [this.passwordConfirming]});

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordConfirm').value) {
      return {invalid: true};
    }}


  loading: boolean = true;
  formLoading: boolean = false;
  foundUserInfo: boolean = false;
  error: string = '';

  user: User = null;
  modalRef: BsModalRef;
  passwordUpdateLoading: boolean = false;
  passwordError: string = '';


  constructor(private userService: UserService, private authService: AuthenticationService,
              private router: Router, private route: ActivatedRoute,
              private location: Location, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void{
    const userID = this.authService.getID();
    this.userService.getUserById(userID).subscribe((user) => {this.user = user}, (error) => {this.error = error.error; this.loading = false;},
      () => {
        if (this.user.customer === null){this.foundUserInfo = false; this.loading = false; }
        else{
          this.initialText();
        }});
  }

  initialText(): void{

      this.userForm.patchValue({
        fname: this.user.customer.firstName,
        lname: this.user.customer.lastName,
        email: this.user.customer.email,
        pNumber: this.user.customer.phoneNumber,
        streetName: this.user.customer.streetName,
        postalCode: this.user.customer.postalCode,
        cityName: this.user.customer.cityName
      });
      this.foundUserInfo = true;
      this.loading = false;
    }

  createCustomerInfo(): void
  {
    this.formLoading = true;

    const userData = this.userForm.value;
    const costumer: Customer = {
      id: 0,
      firstName: userData.fname,
      lastName: userData.lname,
      email: userData.email,
      phoneNumber: userData.pNumber,
      streetName: userData.streetName,
      postalCode: userData.postalCode,
      cityName: userData.cityName,
      user: this.user
    }

    this.userService.createUserCustomer(costumer).subscribe(() => {},
      (error) => {this.error = error.error; this.formLoading = false;
        if(error.status === 401){this.router.navigate(['/login']);}},
      () => {this.router.navigate(['/home']);});
  }

  updateCustomerInfo(): void
  {
    this.formLoading = true;
    const userData = this.userForm.value;

    this.user.customer.firstName = userData.fname;
    this.user.customer.lastName = userData.lname;
    this.user.customer.email = userData.email;
    this.user.customer.phoneNumber = userData.pNumber;
    this.user.customer.streetName = userData.streetName;
    this.user.customer.postalCode = userData.postalCode;
    this.user.customer.cityName = userData.cityName;

    const userID = this.authService.getID();

    this.userService.updateUserCustomer(this.user.customer, userID).subscribe(() => {},
      (error) => {this.error = error.error; this.formLoading = false;
        if(error.status === 401){this.router.navigate(['/login']);}},
      () => {this.router.navigate(['/home']);});
  }

  updatePassword(): void{

    this.passwordUpdateLoading = true;
    const passwordData = this.updateForm.value;

    const passwordModel:any = {
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.password
    }

    const userID = this.authService.getID();

    this.userService.updateUserPassword(userID, passwordModel).subscribe(() => {},
      (error) => {this.passwordError = error.error; console.log(error);this.passwordUpdateLoading = false;
        if(error.status === 401){this.router.navigate(['/login']);}},
      () => {this.modalRef.hide(); this.passwordUpdateLoading = false;});
  }

  openUpdateModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  goBack(): void{
    this.location.back();
  }

}
