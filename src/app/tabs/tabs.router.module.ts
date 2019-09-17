import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren:'../profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: 'rfo',
        children: [
          {
            path: '',
            loadChildren:'../rfo/rfo.module#RfoPageModule'
          }
        ]
      },
      {
        path: 'pengaturan',
        children: [
          {
            path: '',
            loadChildren:'../pengaturan/pengaturan.module#PengaturanPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/profile',
        pathMatch: 'full'
      }
    ]
  },
  /*
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
  */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
