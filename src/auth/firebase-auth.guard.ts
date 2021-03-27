import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import * as q from 'q';
import * as _ from 'lodash';
@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    @InjectFirebaseAdmin()
    private readonly firebase: FirebaseAdmin,
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    try {
      const data = await this.firebase.auth.getUser(
        'cslgch7lPjWKOqFmcMjR6Zf39PU2',
      );
      Object.assign(request, { user: data });
      console.log({ data });

      return true;
    } catch (e) {
      Object.assign(request, { user: e });
      console.log({ e });

      return false;
    }
  }
}
