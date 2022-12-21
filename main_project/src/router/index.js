import { createRouter, createWebHistory } from 'vue-router'
import Homeview from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/LogIn.vue'
import VisiTor from '../views/VisitorPage.vue'
import CreateReview from '../views/courses/CreateReview.vue'
import CreateDiningReview from '../views/dining/CreateDiningReview.vue'
import ReView from '../views/courses/ReView.vue'
import DiningReview from '../views/dining/DiningReview.vue'
import DiningPosts from '../views/dining/DiningPostViews.vue'
import ProfilE from '../views/ProfilE.vue'
import DiningVisitor from '../views/dining/DiningVisitorPage.vue'
import SearchResults from '../views/SearchResults.vue'
import CourseReview from '../views/courses/CourseReview.vue'
import AboutView from '../views/AboutView.vue'
import AdminPage from '../views/AdminPage.vue'
import EditProfile from '../views/EditProfile.vue'
import EditReview from '../views/courses/EditReview.vue'
import EditDiningRview from '../views/dining/EditDiningReview.vue'
import ClubVisitorPage from '../views/clubs/ClubVisitorPage.vue'
import CreateClubReview from '../views/clubs/CreateClubReview.vue'
import ClubReview from '../views/clubs/ClubReview.vue'
import Messages from '../views/Messages.vue'
import EditClubReview from '../views/clubs/EditClubReview.vue'
import SwitchLayout from '../components/SwitchLayout.vue'
import OtherSwitch from '../components/OtherSwitch.vue'
import DiningSearchResults from '../views/dining/DiningSearchResults.vue'
import ClubSearchResults from '../views/clubs/ClubSearchResults.vue'

const routes = [
  {path: '/', name:'VisiTor',component: VisiTor},
  {path: '/signUp', name:'signUp',component: SignUp },
  {path: '/LogIn', name:'LogIn',component: Login },
  {path: '/HomeView', name:'HomeView',component: Homeview },
  {path: '/VisitorPage', name:'VisitorPage',component: VisiTor},
  {path: '/CreateReview', name:'CreateReview',component: CreateReview},
  {path: '/CreateDiningReview', name:'CreateDiningReview',component: CreateDiningReview},
  {path: '/ReView/:reviewId', name:'ReView',component: ReView},
  {path: '/DiningReview/:reviewId', name:'DiningReview',component: DiningReview},
  {path: '/ProfilE/:userId', name:'ProfilE',component: ProfilE},
  {path: '/DiningVisitorPage', name:'DiningVisitorPage', component: DiningVisitor},
  {path: '/DiningPosts', name:'DiningPosts', component: DiningPosts},
  {path: '/SearchResults', name:'SearchResults', component: SearchResults},
  {path: '/DiningSearchResults', name:'DiningSearchResults', component: DiningSearchResults},
  {path: '/CourseReview', name:'CourseReview', component: CourseReview},
  {path: '/AboutView', name:'AboutView', component: AboutView},
  {path: '/Admin', name:'AdminPage', component: AdminPage},
  {path: '/EditProfile/:userId', name:'EditProfile', component: EditProfile},
  {path: '/EditReview/:reviewId', name:'EditReview', component: EditReview},
  {path: '/EditDiningReview/:reviewId', name:'EditDiningReview', component: EditDiningRview},
  {path: '/ClubVisitorPage', name:'ClubVisitorPage', component: ClubVisitorPage},
  {path: '/CreateClubReview', name:'CreateClubReview', component: CreateClubReview},
  {path: '/ClubReview/:reviewId', name:'ClubReview', component: ClubReview},
  {path: '/EditClubReview/:reviewId', name:'EditClubReview', component: EditClubReview},
  {path: '/Messages', name:'Messages', component: Messages},
  {path: '/ClubSearchResults', name:'ClubSearchResults', component: ClubSearchResults},
  {
    path: '/Test2',
    name: 'Switch',
    component: SwitchLayout
  },
  {
    path: '/Test',
    name: 'OtherSwitch',
    component: OtherSwitch
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router