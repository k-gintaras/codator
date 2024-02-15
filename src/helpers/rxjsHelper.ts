import { Observable } from 'rxjs';

export function delayHelper(ms: number): Observable<void> {
  return new Observable<void>((observer) => {
    const timerId = setTimeout(() => {
      observer.next();
      observer.complete();
    }, ms);

    return () => clearTimeout(timerId);
  });
}
