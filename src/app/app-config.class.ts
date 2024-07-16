import { Toolbar } from "ngx-editor";
import { Embassy } from "./core-module/interfaces/geography/embassy.interface";

export class AppConfig {
  public static toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  public static faqTypes = [
    {
      id: 1,
      name: 'Visa'
    }
  ];

  public static rowStatuses = [
    {
      id: 1,
      name: 'Active'
    },
    {
      id: 2,
      name: 'In Active'
    },
    {
      id: 1,
      name: 'Deleted'
    }
  ];

  public static faqStatuses = [
    {
      id: 1,
      name: 'New'
    },
    {
      id: 2,
      name: 'Verified'
    },
    {
      id: 3,
      name: 'Author verified'
    }
  ];

  // public static embassies: Embassy[] = [
  //   {
  //     id: 1,
  //     name: "New Delhi"
  //   },
  //   {
  //     id: 2,
  //     name: "Mumbai"
  //   },
  //   {
  //     id: 3,
  //     name: "Kolkata"
  //   },
  //   {
  //     id: 4,
  //     name: "Chennai"
  //   },
  //   {
  //     id: 5,
  //     name: "Hyderabad"
  //   }
  // ]
}
