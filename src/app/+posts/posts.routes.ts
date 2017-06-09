import { PostsComponent } from './posts.component';

export const routes = [
  { path: '', children: [
    { path: '', component: PostsComponent },
    { path: 'edit', loadChildren: './+post-editor#PostEditorModule' },
    { path: 'administration', loadChildren: './+post-administration#PostAdministrationModule'}
     ]}
];
