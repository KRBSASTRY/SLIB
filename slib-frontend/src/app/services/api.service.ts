import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnDestroy {
  private BASE_URL = 'http://localhost:5001'; // Ensure backend port is correct
  private socket: Socket;
  private socketListeners = new Subject<void>(); // Used to unsubscribe from socket events

  constructor(private http: HttpClient) {
    // Initialize Socket.io connection
    this.socket = io(this.BASE_URL, {
      transports: ['websocket', 'polling'], // Ensures better connectivity
    });
  }

  // 🟢 Fetch all libraries
  getLibraries(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/libraries`);
  }

  // 🟢 Get a single library by ID
  getLibraryById(libraryId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/libraries/${libraryId}`);
  }
  

  // 🟢 Add a new library
  addLibrary(libraryData: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/libraries`, libraryData);
  }

  // 🟢 Listen for real-time updates when a new library is added
  onLibraryAdded(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('libraryAdded', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.off('libraryAdded'); // Cleanup listener when unsubscribing
      };
    });
  }

  // Cleanup subscriptions on component destroy
  ngOnDestroy(): void {
    this.socketListeners.next();
    this.socketListeners.complete();
    this.socket.disconnect();
  }
}
