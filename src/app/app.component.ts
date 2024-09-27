import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'employee-management';
  /**Component OnInit life cycle hook. */
  ngOnInit() {
    const request = indexedDB.open('EmployeeDB', 1);
    //To initialize db
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;

      // Check if the objectStore exists before creating
      if (!db.objectStoreNames.contains('employees')) {
        const objectStore = db.createObjectStore('employees', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('role', 'role', { unique: false });
        objectStore.createIndex('startDate', 'startDate', { unique: false });
        objectStore.createIndex('endDate', 'endDate', { unique: false });

      }
    };

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      console.log('Database created successfully!');
    };

    request.onerror = (event: any) => {
      console.error('Database error:', event.target.errorCode);
    };
  }
}
