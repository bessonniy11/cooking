import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {UserService} from "../../services/user.service";


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector,
  ) {
  }

  handleError(error: Error) {
    const userService = this.injector.get(UserService);
    console.error(error);
    const data = {
      userId: userService?.user?.userId.toString(),
    };
  }
}
