import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: 'my-map',
    loadChildren: () => import('./my-map/my-map.module').then( m => m.MyMapPageModule)
  },
  {
    path: 'site-details/:id',
    loadChildren: () => import('./site-details/site-details.module').then( m => m.SiteDetailsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'cultural-sites',
    loadChildren: () => import('./cultural-sites/cultural-sites.module').then( m => m.CulturalSitesPageModule)
  },
  {
    path: 'natural-sites',
    loadChildren: () => import('./natural-sites/natural-sites.module').then( m => m.NaturalSitesPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('./quiz/quiz.module').then( m => m.QuizPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
