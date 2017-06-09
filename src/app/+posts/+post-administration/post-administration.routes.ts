/**
 * Created by aafanasiev on 08.06.2017.
 */
import { PostAdministrationComponent } from './post-administration.component';
import { AuthGuard } from '../../_guard/index';

export const routes = [
  { path: '', component: PostAdministrationComponent, pathMatch: 'full',canActivate: [AuthGuard] }
];

