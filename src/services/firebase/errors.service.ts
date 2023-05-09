import { FirebaseError as OriginalFirebaseErrorInterface } from "./admin";

export class FirebaseError implements OriginalFirebaseErrorInterface {
  code: string;
  message: string;
  constructor(code: number, message: string) {
    this.code = `${code}`;
    this.message = message;
  }

  toJSON(): object {
    return this;
  }
}
