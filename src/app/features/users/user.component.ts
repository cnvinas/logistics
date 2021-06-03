/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Component } from "@angular/core";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent {
  showUserCreateForm = false;
  cols = ["Nombre", "Apellido", "Perfil", "Mall Asignado", "Correo"];
  rows = [
    {
      Nombre: "Serena",
      Apellido: "Williams",
      Perfil: "runner",
      "Mall Asignado": "Chile",
      Correo: "serena@williams.com",
    },
    {
      Nombre: "David",
      Apellido: "Nalbaldian",
      Perfil: "runner",
      "Mall Asignado": "Chile",
      Correo: "elreydavid@nalbaldian.com",
    },
    {
      Nombre: "Gisela",
      Apellido: "Dulko",
      Perfil: "runner",
      "Mall Asignado": "Agentina",
      Correo: "gise@dulko.com",
    },
    {
      Nombre: "Rogelio",
      Apellido: "Federer",
      Perfil: "runner",
      "Mall Asignado": "Perú",
      Correo: "rogelito@federer.com",
    },
    {
      Nombre: "Lourdes",
      Apellido: "Carlé",
      Perfil: "runner",
      "Mall Asignado": "Argentina",
      Correo: "luli@carle.com",
    },
    {
      Nombre: "Norberto",
      Apellido: "Djokovic",
      Perfil: "runner",
      "Mall Asignado": "Argentina",
      Correo: "norber@esargentino.com",
    },
    {
      Nombre: "Gabriela",
      Apellido: "Sabatini",
      Perfil: "runner",
      "Mall Asignado": "ARgentina",
      Correo: "gaby@lamejor.com",
    },
    {
      Nombre: "Esteban",
      Apellido: "Tsitsipas",
      Perfil: "runner",
      "Mall Asignado": "Uruguay",
      Correo: "titi@montevideano.com",
    },
  ];
  createUser() {
    this.showUserCreateForm = !this.showUserCreateForm;
  }
}
