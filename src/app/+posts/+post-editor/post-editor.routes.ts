import { PostEditorComponent } from './post-editor.component';
import { AuthGuard } from '../../_guard/index';

export const routes = [
  { path: '', component: PostEditorComponent, pathMatch: 'full',canActivate: [AuthGuard] }
];

