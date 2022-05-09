import { Injectable } from '@angular/core';


export interface IUser {
  id: number;
  name: string;
  role: number;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: IUser | null = null;

  constructor() { }
}
