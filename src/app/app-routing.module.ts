import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',redirectTo: 'login', pathMatch: 'full' },
  { path: 'tabs', loadChildren:'./tabs/tabs.module#TabsPageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'rfo', loadChildren: './rfo/rfo.module#RfoPageModule' },
  { path: 'pengaturan', loadChildren: './pengaturan/pengaturan.module#PengaturanPageModule' },
  { path: 'detail-rfo/:year/:docid', loadChildren: './detail-rfo/detail-rfo.module#DetailRfoPageModule' },
  { path: 'penawaran-harga/:year/:docid', loadChildren: './penawaran-harga/penawaran-harga.module#PenawaranHargaPageModule' },
  { path: 'invoice/:no_invoice', loadChildren: './invoice/invoice.module#InvoicePageModule' }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
