// src/app/components/address/address.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { Address } from '../../models/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  @Output() addressSelected = new EventEmitter<Address | null>();
  addresses: Address[] = [];
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

  ngOnInit(): void {
    const userId = 'currentUserId'; // Replace with actual userId, e.g., from AuthService
    this.addressService.getAddressesByUserId(userId).subscribe(
      (data: Address[]) => {
        this.addresses = data;
      },
      (error) => {
        console.error('Error fetching addresses:', error);
      }
    );
  }

  selectAddress(address: Address): void {
    this.selectedAddress = address;
    this.showNewAddressForm = false;
    this.addressSelected.emit(address);
  }

  addNewAddress(): void {
    this.selectedAddress = null;
    this.showNewAddressForm = true;
    this.addressSelected.emit(null); // Indicates that a new address is being added
  }

  submitNewAddress(): void {
    const userId = 'currentUserId'; // Replace with actual userId
    const addressToAdd: Address = {
      id: '', // Backend should generate ID
      userId: userId,
      street: this.newAddress.street!,
      city: this.newAddress.city!,
      state: this.newAddress.state!,
      zipCode: this.newAddress.zipCode!,
      country: this.newAddress.country!,
    };

    this.addressService.addAddress(addressToAdd).subscribe(
      (addedAddress: Address) => {
        this.addresses.push(addedAddress);
        this.selectedAddress = addedAddress;
        this.showNewAddressForm = false;
        this.addressSelected.emit(addedAddress);
        // Reset newAddress fields
        this.newAddress = {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        };
      },
      (error) => {
        console.error('Error adding new address:', error);
      }
    );
  }
}
