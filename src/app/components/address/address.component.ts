import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { Address } from '../../models/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  @Input() addresses: Address[] = []; // Allow addresses to be passed in from parent
  @Output() addressSelected = new EventEmitter<Address | null>();
  selectedAddress: Address | null = null;
  showNewAddressForm: boolean = false;
  newAddress: Partial<Address> = {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  };

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {}

  selectAddress(address: Address): void {
    this.selectedAddress = address;
    this.showNewAddressForm = false;
    this.addressSelected.emit(address); // Emit selected address
  }

  addNewAddress(): void {
    this.selectedAddress = null;
    this.showNewAddressForm = true;
    this.addressSelected.emit(null); // Emit null to indicate new address is being added
  }

  submitNewAddress(): void {
    // Retrieve the user object from localStorage
    const userFromStorage = localStorage.getItem('user');

    let userId: string; // Declare userId as a string

    if (userFromStorage) {
      const user = JSON.parse(userFromStorage); // Parse the stored user object

      // Check if user object has an id
      if (user && user.id) {
        userId = user.id; // Assign userId from the user object
      } else {
        console.error('User ID is not available');
        return; // Exit if userId is not found
      }
    } else {
      console.error('No user found in local storage');
      return; // Exit if no user found
    }

    // Create the address object with userId
    const addressToAdd: Address = {
      userId: userId, // userId is guaranteed to be a string
      street: this.newAddress.street!,
      city: this.newAddress.city!,
      state: this.newAddress.state!,
      zipCode: this.newAddress.zipCode!,
      country: this.newAddress.country!,
    };

    console.log('Submitting new address:', addressToAdd); // Log the address being submitted

    this.addressService.addAddress(addressToAdd).subscribe(
      (addedAddress: Address) => {
        console.log('Address added successfully:', addedAddress); // Log the response
        this.addresses.push(addedAddress);
        this.selectedAddress = addedAddress; // Set the newly added address as selected
        this.showNewAddressForm = false; // Hide the new address form
        this.addressSelected.emit(addedAddress); // Emit the new address
        this.resetNewAddress(); // Reset the new address fields
      },
      (error) => {
        console.error('Error adding new address:', error); // Log any errors
      }
    );
  }

  resetNewAddress(): void {
    this.newAddress = {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    };
  }
}
