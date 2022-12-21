<template>
      <v-card>
        <v-tabs
          class="ma-5 rounded-xl"
          v-model="tab"
          :bg-color="barColor"
          @click="switchTabs"
        >
          <v-tab value="courses">Courses</v-tab>
          <v-tab value="clubs">Clubs</v-tab>
          <v-tab value="dining">Dining</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="courses">

              
              <div>
                <v-card
                  flat
                  class="py-12"
                >
                  <v-card-text>
                    <v-row
                      align="center"
                      justify="center"
                    >
                      <v-btn-toggle
                        class="rounded-t-xl"
                        v-model="requestOptions"
                        mandatory
                        color="deep-purple lighten-3"
                        @click="switchOptions"
                      >
                        <v-btn value="ReviewRequests">
                          Review Requests
                        </v-btn>

                        <v-btn value="SchoolRequests">
                          School Requests
                        </v-btn>

                        <v-btn value="ReviewReports">
                          Review Reports
                        </v-btn>

                        <v-btn value="UserReports">
                          User Reports
                        </v-btn>

                        <v-btn value="UnbanRequests">
                          Unban Requests
                        </v-btn>
                      </v-btn-toggle>
                    </v-row>
                  </v-card-text>
                </v-card>
                
                <v-slide-x-transition>
                  <p v-if="reviews.length == 0 && seeRevRequests" class="text-center text-h6 text-wrap ml-9 font-weight-regular text-medium-emphasis">No Requests to Display</p>

                  <v-row class="d-flex justify-center"  v-if="seeRevRequests">
                    <VCol
                          v-for = "(review, index) in reviews" :key="review.id"
                          cols="12"
                          sm="3"
                          class="pa-1 md-4 text-center"
                      >
                        <VCard v-if="review.show" class="my-2">
                          <br/>
                          Review: <router-link :to="('/Review/' + review.review)">{{review.review_title}}</router-link><br/>
                          <div v-if="review.showDepartment"><br/>Department: <input class="admininput" v-model="review.department" placeholder="department name" /></div>
                          <div v-if="review.showCourse"><br/>Course: <input class="admininput" v-model="review.course" placeholder="course name" /></div>
                          <div v-if="review.showProfessor"><br/>Professor: <input class="admininput" v-model="review.professor" placeholder="professor name" /></div>
                          <br/>
                          <v-btn
                            elevation="2" style="font-size: 12px;" class="ma-1" @click="addNew(review.review, review.department, review.course, review.professor, review.id, index, review.poster, review.review_title, review.school)">Add
                          </v-btn>
                          <v-btn
                            elevation="2" style="font-size: 12px;" class="ma-1" @click="rejectReview(review.review, review.id, index, review.poster, review.review_title)">Reject
                          </v-btn>
                          <v-btn
                            elevation="2" style="font-size: 12px;" class="ma-1" @click="resolveReview(review.id, index, review.poster, review.review_title, review.review)">Resolve
                          </v-btn>
                          <br/>
                        </VCard>
                      </VCol>
                  </v-row>
                </v-slide-x-transition>

                <v-slide-x-transition>
                  <p v-if="revReports.length == 0 && seeRevReports" class="text-center text-h6 text-wrap ml-9 font-weight-regular text-medium-emphasis">No Reports to Display</p>
                  
                  <v-row justify="center" v-if="seeRevReports">
                    <VCol
                        v-for = "(revReport, index) in revReports" :key="revReport.id"
                        cols="4"
                    >
                      <VCard v-if="revReport.show" class="pa-2 ma-2">
                        Review: <router-link :to="('/Review/' + revReport.review)">{{revReport.review_title}}</router-link>
                        <br/>Reported by: <router-link :to="('/ProfilE/' + revReport.reporter)">{{revReport.reporter_name}}</router-link>
                        <br/>Review Reason: {{revReport.reason}}
                        <br/>
                        <v-btn
                          elevation="2" class="ma-2" @click="acceptRevReport(revReport.review, revReport.id, index, revReport.reporter, revReport.review_title)">Delete Review
                        </v-btn>
                        <v-btn
                          elevation="2"  class="ma-2" @click="rejectRevReport(revReport.id, index, revReport.reporter, revReport.review_title)">Reject
                        </v-btn>
                      </VCard>
                    </VCol>
                   
                  </v-row>
                </v-slide-x-transition>

                <v-slide-x-transition>
                  <p v-if="usrReports.length == 0 && seeUsrReports" class="text-center text-h6 text-wrap ml-9 font-weight-regular text-medium-emphasis">No Reports to Display</p>

                  <v-row justify="center" v-if="seeUsrReports">
                    <v-col
                      v-for="(usrReport, index) in usrReports" :key="usrReport.id"
                      cols="4"
                    >
                      <v-card v-if="usrReport.show" class="pa-2 ma-2">
                        User: <router-link :to="('/Review/' + usrReport.reported)">{{usrReport.reported_name}}</router-link>
                        <br/>Reported by: <router-link :to="('/ProfilE/' + usrReport.reporter)">{{usrReport.reporter_name}}</router-link>
                        <br/>Reason: {{usrReport.reason}}
                        <br/>
                        <v-btn
                          elevation="3" class="ma-2" @click="acceptUsrReport(usrReport.reported, usrReport.id, index, usrReport.reported_name, usrReport.reporter)">Ban User
                        </v-btn>
                        <v-btn
                          elevation="3" class="ma-2" @click="rejectUsrReport(usrReport.id, index, usrReport.reported_name, usrReport.reporter)">Reject
                        </v-btn>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-slide-x-transition>

                <v-slide-x-transition>
                  <p v-if="schRequests.length == 0 && seeSchRequests" class="text-center text-h6 text-wrap ml-9 font-weight-regular text-medium-emphasis">No Requests to Display</p>

                  <v-row justify="center" v-if="seeSchRequests">
                    <VCol
                        v-for = "(schRequest, index) in schRequests" :key="schRequest.id"
                        cols="4"
                    >
                      <VCard v-if="schRequest.show" class="pa-2 ma-2">
                        Requester: <router-link :to="('/ProfilE/' + schRequest.requester)">{{schRequest.requester_name}}</router-link>
                        <br/>School: {{schRequest.school}}
                        <br/>
                        <v-btn
                          elevation="2" class="ma-2" @click="acceptSchRequest(schRequest.school, schRequest.id, schRequest.requester, index, schRequest.requester_profile)">Add
                        </v-btn>
                        <v-btn
                          elevation="2" class="ma-2" @click="rejectSchRequest(schRequest.id, index, schRequest.requester, schRequest.school)">Reject
                        </v-btn>
                      </VCard>
                    </VCol>
                    
                  </v-row>
                </v-slide-x-transition>

                <v-slide-x-transition>
                  <p v-if="unBanRequests.length == 0 && seeUnBanRequests" class="text-center text-h6 text-wrap ml-9 font-weight-regular text-medium-emphasis">No Requests to Display</p>

                  <v-row justify="center" v-if="seeUnBanRequests">
                    <VCol
                        v-for = "(unBanRequest, index) in unBanRequests" :key="unBanRequest.id"
                        cols="20"
                    >
                      <VCard v-if="unBanRequest.show" class="pa-2 ma-2">
                        User: <router-link :to="('/ProfilE/' + unBanRequest.banned_user)">{{unBanRequest.banned_name}}</router-link>
                        <br/>Reason: {{unBanRequest.reason}}
                        <br/>
                        <v-btn
                          elevation="2" class="ma-2" @click="acceptUnBanRequest(unBanRequest.banned_user, unBanRequest.id, index)">Unban
                        </v-btn>
                        <v-btn
                          elevation="2" class="ma-2" @click="rejectUnBanRequest(unBanRequest.id, index, unBanRequest.banned_user)">Reject
                        </v-btn>
                      </VCard>
                    </VCol>
                  </v-row>
                </v-slide-x-transition>

              </div>


            </v-window-item>

            <v-window-item value="clubs">
              <div>
                <v-card
                  flat
                  class="py-12"
                >
                  <v-card-text>
                    <v-row
                      align="center"
                      justify="center"
                    >
                      <v-btn-toggle
                       class="rounded-t-xl"
                        v-model="requestOptionsClub"
                        mandatory
                        color="deep-orange darken-1"
                        @click="switchOptionsClubs"
                      >
                        <v-btn value="ClubRevRequests">
                          Club Requests
                        </v-btn>

                        <v-btn value="ClubRevReports">
                          Review Reports
                        </v-btn>

                        <!-- <v-btn value="EventReports">
                          Event Reports
                        </v-btn> -->

                      </v-btn-toggle>
                    </v-row>
                  </v-card-text>
                </v-card>
                
                <v-slide-x-transition>
                  <p v-if="clubRevRequests.length == 0 && seeClubRevRequests" class="text-center text-h6 text-wrap ml-9 font-weight-regular text-medium-emphasis">No Requests to Display</p>

                  <VRow justify="center" v-if="seeClubRevRequests">
                    <VCol
                        v-for = "(clubRevRequest, index) in clubRevRequests" :key="clubRevRequest.id"
                        cols="20"
                    >
                      <VCard v-if="clubRevRequest.show" class="pa-2 ma-2" style="max-width: 30%;">
                        Review: <router-link :to="('/ClubReview/' + clubRevRequest.review)">{{clubRevRequest.review_title}}</router-link>
                        <br/>Club: <input class="admininput" v-model="clubRevRequest.club" placeholder="club name" />
                        <br/>Reported by: {{clubRevRequest.requester_name}}
                        <br/>Club Category: <v-select v-model="clubRevRequest.club_category"
                          :items="catItems"
                          label="Category"
                          item-title="name"
                          item-value="cat"
                          
                          style="max-width: 30%; margin-left: 33% !important"
                          density="compact">
                        </v-select>
                        <br/>
                        <v-btn
                          elevation="2" class="ma-2" @click="addClubNew(clubRevRequest.review, clubRevRequest.club, clubRevRequest.id, index, clubRevRequest.requester, clubRevRequest.review_title, clubRevRequest.club_category, clubRevRequest.school)">Add
                        </v-btn> 
                        <v-btn
                          elevation="2" class="ma-2" @click="rejectClubReview(clubRevRequest.review, clubRevRequest.id, index, clubRevRequest.requester, clubRevRequest.review_title)">Reject
                        </v-btn>
                        <v-btn
                          elevation="2" class="ma-2" @click="resolveClubReview(clubRevRequest.id, index, clubRevRequest.requester, clubRevRequest.review_title, clubRevRequest.review)">Resolve
                        </v-btn>
                      </VCard>
                    </VCol>
                </VRow>
                </v-slide-x-transition>

                <v-slide-x-transition>
                  <p v-if="clubRevReports.length == 0 && seeClubRevReports" class="text-center text-h6 text-wrap ml-9 font-weight-regular text-medium-emphasis">No Requests to Display</p>

                <VRow justify="center" v-if="seeClubRevReports">
                    <VCol
                        v-for = "(clubRevReport, index) in clubRevReports" :key="clubRevReport.id"
                        cols="20"
                    >
                      <VCard v-if="clubRevReport.show" class="pa-2 ma-2">
                        Review: <router-link :to="('/Review/' + clubRevReport.review)">{{clubRevReport.review_title}}</router-link>
                        <br/>Review Reason: {{clubRevReport.reason}}
                        <br/>Reported by: {{clubRevReport.reporter_name}}
                        <br/>
                        <v-btn
                          elevation="2" class="ma-2" @click="acceptClubRevReport(clubRevReport.review, clubRevReport.id, index, clubRevReport.reporter, clubRevReport.review_title)">Delete Review
                        </v-btn>
                        <v-btn
                          elevation="2" class="ma-2" @click="rejectClubRevReport(clubRevReport.id, index, clubRevReport.reporter, clubRevReport.review_title)">Reject
                        </v-btn>
                      </VCard>
                    </VCol>
                </VRow>
              </v-slide-x-transition>

                <!-- <VRow justify="center" v-if="seeClubEventReports">
                    <VCol
                        v-for = "(eventReport, index) in eventReports" :key="eventReport.id"
                        cols="20"
                    >
                      <VCard v-if="eventReport.show" class="pa-2 ma-2">
                        User: <router-link :to="('/Review/' + eventReport.reported)">{{eventReport.reported_name}}</router-link>
                        <br/>Reported by: {{eventReport.reporter_name}}
                        <br/>Reason: {{eventReport.reason}}
                        <br/>
                        <v-btn
                          elevation="3" class="ma-2" style="font-size: 12px; text-decoration: none;" @click="acceptClubEventReport(eventReport.reported, eventReport.id, index)">Ban User
                        </v-btn>
                        <v-btn
                          elevation="3" class="ma-2" style="font-size: 12px; text-decoration: none;" @click="rejectClubEventReport(eventReport.id, index)">Reject
                        </v-btn>
                      </VCard>
                    </VCol>

                </VRow> -->

              </div>
            </v-window-item>

            <v-window-item value="dining">
              <div>
                <v-card
                  flat
                  class="py-12"
                >
                  <v-card-text>
                    <v-row
                      align="center"
                      justify="center"
                    >
                      <v-btn-toggle
                       class="rounded-t-xl"
                        v-model="requestOptionsDining"
                        mandatory
                        color="green accent-4"
                        @click="switchOptionsDining"
                      >

                        <v-btn value="DiningRevReports">
                          Review Reports
                        </v-btn>

                        <v-btn value="PostReports">
                          Post Reports
                        </v-btn>

                      </v-btn-toggle>
                    </v-row>
                  </v-card-text>
                </v-card>
              

                <v-slide-x-transition>
                  <p v-if="diningRevReports.length == 0 && seeDiningRevReports" class="text-center text-h6 text-wrap ml-9 font-weight-regular text-medium-emphasis">No Reports to Display</p>

                  <VRow justify="center" v-if="seeDiningRevReports">
                      <VCol
                          v-for = "diningRevReport in diningRevReports" :key="diningRevReport.id"
                          cols="20"
                          justify="center"
                      >
                        <VCard v-if="diningRevReport.show"  class="pa-2 ma-2">
                          Review: <router-link :to="('/DiningReview/' + diningRevReport.review)">{{diningRevReport.review_title}}</router-link>
                          <br/>Reported by: <router-link :to="('/ProfilE/' + diningRevReport.reporter)">{{diningRevReport.reporter_name}}</router-link>
                          <br/>Reason: {{diningRevReport.reason}}
                          <br/>
                          <v-btn
                            elevation="2" class="ma-2" @click="acceptDiningRevReport(diningRevReport.review, diningRevReport.id, index, diningRevReport.reporter, diningRevReport.review_title)">Delete Review
                          </v-btn>
                          <v-btn
                            elevation="2"  class="ma-2" @click="rejectDiningRevReport(diningRevReport.id, index, diningRevReport.reporter, diningRevReport.review_title)">Reject
                          </v-btn>
                        </VCard>
                      </VCol>
                  </VRow>
                </v-slide-x-transition>

                <v-slide-x-transition>
                  <p v-if="diningPostReports.length == 0 && seeDiningPostReports" class="text-center text-h6 text-wrap ml-9 font-weight-regular text-medium-emphasis">No Reports to Display</p>

                  <VRow justify="center" v-if="seeDiningPostReports">
                      <VCol
                          v-for = "(diningPostReport, index) in diningPostReports" :key="diningPostReport.id"
                          cols="20"
                      >
                        <VCard v-if="diningPostReport.show"  class="pa-2 ma-2">
                          <a href="javascript:void(null);" class="text-decoration-underline" @click="showPost(diningPostReport.post)">View Post</a>
                          <br/>Reported by: <router-link :to="('/ProfilE/' + diningPostReport.reporter)"> {{diningPostReport.reporter_name}} </router-link>
                          <br/>Reason: {{diningPostReport.reason}}
                          <br/>
                          <v-btn
                            elevation="2" class="ma-2" @click="acceptDiningPostReport(diningPostReport.post, diningPostReport.id, index, diningPostReport.reporter, diningPostReport.post_text)">Delete Post
                          </v-btn>
                          <v-btn
                            elevation="2"  class="ma-2" @click="rejectDiningPostReport(diningPostReport.id, index, diningPostReport.reporter, diningPostReport.post_text)">Reject
                          </v-btn>
                        </VCard>
                      </VCol>
  
                    
                  </VRow>
                </v-slide-x-transition>

              </div>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>

      <v-card>
        <v-dialog
          v-model="showRiskyPost"
          max-width="500px"
        >
          <v-card>
            <div class="d-flex align-center justify-center">
              <v-img
                class="bg-white"
                width="300"
                :aspect-ratio="1"
                :src="riskyPost.post_img"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                      indeterminate
                      color="grey-lighten-4"
                    ></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </div>
            <div class="text-center text-body-1 text-wrap mb-3 font-weight-regular text-medium-emphasis">
              <br/>Posted by: <router-link :to="('/ProfilE/' + riskyPost.post_user)">{{riskyPost.post_user_name}}</router-link>
              <br/>Score: {{riskyPost.vote_score}}
              <br/>At location: {{riskyPost.dining_hall_name}}
              <br/>Description: {{riskyPost.post_text}}<br/>
            </div>
          </v-card>
        </v-dialog>
      </v-card>

</template>


<script>
import axios from "axios";
export default{
  name:'AdminPage',
  data(){
      return{
          tab: null,
          getClubs: false,
          getDining: false,
          showCourses: true,
          showClubs: false,
          showDining: false,
          showRiskyPost: false,
          riskyPost: {},

          barColor: 'deep-purple lighten-1',
          catItems: [{cat: '0', name: 'Greek Life'},{cat: '1', name: 'Sports'},{cat: '2', name: 'Student Government'},{cat: '3', name: 'Community Service'}
              ,{cat: '4', name: 'Recreational'},{cat: '5', name: 'Cultural'},{cat: '6', name: 'Arts'},{cat: '7', name: 'Academic'},{cat: '8', name: 'Political Action'}],

          search:'',
          dpt:'',
          prf:'',
          crs:'',
          searchresult: [],
          professors: [],
          professor_list:new Set(),

          reviews: [],
          revReports: [],
          unBanRequests: [],
          usrReports: [],
          schRequests: [],
          seeRevRequests: true,
          seeSchRequests: false,
          seeRevReports: false,
          seeUsrReports: false,
          seeUnBanRequests: false,

          clubRevRequests: [],
          clubRevReports: [],
          eventReports: [],
          seeClubRevRequests: true,
          seeClubRevReports: false,
          seeClubEventReports: false,

          diningRevReports: [],
          diningPostReports: [],
          seeDiningRevReports: true,
          seeDiningPostReports: false,
          

          isShow:true,
          curVerified: localStorage.getItem('loggedIn'),
          curUsername: localStorage.getItem('username'),
          curSchool: localStorage.getItem("schoolName"),
          curUser: localStorage.getItem("userID"),
          curSchoolID: localStorage.getItem('schoolID'),
          curAdmin: localStorage.getItem("isAdmin") === 'true',
          items: ['foo', 'bar', 'fizz', 'buzz'],
          requestOptions: "ReviewRequests",
          requestOptionsDining: "DiningRevReports",
          requestOptionsClub: "ClubRevRequests"
      }
  },
  methods: {
    async getData() {
        try {
            // fetch tasks

            
            const resRevReqs = await axios.get('http://18.191.156.68:8000/api/reviewrequests/');
            const resRevReps = await axios.get('http://18.191.156.68:8000/api/reviewreports/');
            // if (res.data.length < 4) {
            //   this.reviews = res.data;
            // } else {
            //   this.reviews = res.data.slice(res.data.length-8, res.data.length);
            // }
            this.reviews = resRevReqs.data;
            this.revReports = resRevReps.data;
            
            for (let i in this.reviews) {
              this.reviews[i].show = true;
            }
            for (let i in this.revReports) {
              this.revReports[i].show = true;
            }
           
            for (let i in this.reviews) {
              this.reviews[i].show = true;
              if (this.reviews[i].course.length != 0){
                this.reviews[i].showCourse = true;
              }
              if (this.reviews[i].department.length != 0){
                this.reviews[i].showDepartment = true;
              }
              if (this.reviews[i].professor.length != 0){
                this.reviews[i].showProfessor = true;
              }
            }
            //console.log(this.reviews[0].professor_name);
            //console.log(this.reviews.length);
            console.log("retrieving");
            const resSchReqs = await axios.get('http://18.191.156.68:8000/api/schoolrequests/');
            this.schRequests = resSchReqs.data;
            for (let i in this.schRequests) {
              this.schRequests[i].show = true;
            }

            const resUsrReps = await axios.get('http://18.191.156.68:8000/api/userreports/');
            this.usrReports = resUsrReps.data;
            for (let i in this.usrReports) {
              console.log("reported");
              this.usrReports[i].show = true;
            }

            const resUnBanReqs = await axios.get('http://18.191.156.68:8000/api/unbanrequests/');
            this.unBanRequests = resUnBanReqs.data;
            for (let i in this.unBanRequests) {
              this.unBanRequests[i].show = true;
            }



            const resClubReqs = await axios.get('http://18.191.156.68:8000/api/clubs/reviewrequests/');
            this.clubRevRequests = resClubReqs.data;
              for (let i in this.clubRevRequests) {
                this.clubRevRequests[i].show = true;
                this.clubRevRequests[i].club_category = '0';
            }

            const resClubReps = await axios.get('http://18.191.156.68:8000/api/clubs/reviewreports/');
            this.clubRevReports = resClubReps.data;
              for (let i in this.clubRevReports) {
                this.clubRevReports[i].show = true;
            }

            const resClubEvtReps = await axios.get('http://18.191.156.68:8000/api/clubs/eventreports/');
            this.clubEventReports = resClubEvtReps.data;
              for (let i in this.clubEventReports) {
                this.clubEventReports[i].show = true;
            }


            const resDiningReps = await axios.get('http://18.191.156.68:8000/api/dining/reviewreports/');
            this.diningRevReports = resDiningReps.data;
              for (let i in this.diningRevReports) {
                this.diningRevReports[i].show = true;
            }

            const resPostReps = await axios.get('http://18.191.156.68:8000/api/dining/postreports/');
            this.diningPostReports = resPostReps.data;
              for (let i in this.diningPostReports) {
                this.diningPostReports[i].show = true;
            }

            
        } catch (error) {
            // log the error
            console.log(error);
        }
    },
    async showPost(postID){
      console.log(postID);
      const resRiskyPost = await axios.get(`http://18.191.156.68:8000/api/dining/posts/` + postID + '/' );
      this.riskyPost = resRiskyPost.data;
      this.showRiskyPost = true;
    },
    switchOptions(){
          
          
          switch(this.requestOptions) {
            case "ReviewRequests":
              this.seeRevRequests = true;
              this.seeRevReports = false;
              this.seeSchRequests = false;
              this.seeUsrReports = false;
              this.seeUnBanRequests = false;
              break;
            case "ReviewReports":
              console.log("bro?");
              this.seeRevRequests = false;
              this.seeRevReports = true;
              this.seeSchRequests = false;
              this.seeUsrReports = false;
              this.seeUnBanRequests = false;
              break;
            case "SchoolRequests":
              this.seeRevRequests = false;
              this.seeRevReports = false;
              this.seeSchRequests = true;
              this.seeUsrReports = false;
              this.seeUnBanRequests = false;
              break;
            case "UserReports":
              this.seeRevRequests = false;
              this.seeRevReports = false;
              this.seeSchRequests = false;
              this.seeUsrReports = true;
              this.seeUnBanRequests = false;
              break;
            default:
              this.seeRevRequests = false;
              this.seeRevReports = false;
              this.seeSchRequests = false;
              this.seeUsrReports = false;
              this.seeUnBanRequests = true;
            
          }
    },
    switchOptionsDining(){
          switch(this.requestOptionsDining) {
            case "DiningRevReports":
              this.seeDiningRevReports = true;
              this.seeDiningPostReports = false;
              break;
            default:
              this.seeDiningRevReports = false;
              this.seeDiningPostReports = true;
          }
    },
    switchOptionsClubs(){
          switch(this.requestOptionsClub) {
            case "ClubRevRequests":
              this.seeClubRevRequests = true;
              this.seeClubRevReports = false;
              this.seeClubEventReports = false;
              break;
            case "ClubRevReports":
              console.log("bro?");
              this.seeClubRevRequests = false;
              this.seeClubRevReports = true;
              this.seeClubEventReports = false;
              break;
            default:
              this.seeClubRevRequests = false;
              this.seeClubRevReports = false;
              this.seeClubEventReports = true;
          }
    },
    async acceptSchRequest(schoolName, reportID, requesterID, index, profileID){
          console.log(schoolName, profileID, requesterID);

          const resSch = await axios.post('http://18.191.156.68:8000/api/schools/', {
                name: schoolName
          });
          const schID = resSch.data.id
          //const resReqstr = await axios.get(`http://18.191.156.68:8000/api/profiles/?id=` + requesterID );
                    
          //await axios.patch(`http://18.191.156.68:8000/api/profiles/` + resReqstr.data[0]["id"] +'/' , {
          await axios.patch(`http://18.191.156.68:8000/api/profiles/` + profileID +'/' , {
            school: schID,
            isActive: true,
          });
          await axios.delete(`http://18.191.156.68:8000/api/schoolrequests/`+ reportID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "School Request Accepted",
            text: "Your request for " + schoolName + " has been accepted and your school has been changed accordingly."
          });
          this.schRequests[index].show = false;
    },
    async rejectSchRequest(reportID, index, requesterID, requestedSchool){
          await axios.delete(`http://18.191.156.68:8000/api/schoolrequests/`+ reportID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "School Request Rejected",
            text: "Your request for " + requestedSchool + " has been rejected."
          });
          this.schRequests[index].show = false;
    },
    async acceptUnBanRequest(reportedID, reportID, index){
          //console.log(switchOption)
          const resReqstr = await axios.get(`http://18.191.156.68:8000/api/profiles/?id=` + reportedID );
                    
          await axios.patch(`http://18.191.156.68:8000/api/profiles/` + resReqstr.data[0]["id"] +'/' , {
            isActive: true,
          });
          await axios.delete(`http://18.191.156.68:8000/api/unbanrequests/`+ reportID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: reportedID,
            title: "Unban Request Accepted",
            text: "Your ban has been lifted."
          });
          this.unBanRequests[index].show = false;
    },
    async rejectUnBanRequest(reportID, index, bannedID){
          await axios.delete(`http://18.191.156.68:8000/api/unbanrequests/`+ reportID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: bannedID,
            title: "Unban Request Rejected",
            text: "Your unban request has been rejected."
          });
          this.unBanRequests[index].show = false;
    },
    async acceptUsrReport(reportedID, reportID, index, reportedName, reporterID){
          const resReqstr = await axios.get(`http://18.191.156.68:8000/api/profiles/?id=` + reportedID );
                    
          await axios.patch(`http://18.191.156.68:8000/api/profiles/` + resReqstr.data[0]["id"] +'/' , {
            isActive: false,
          });
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: reporterID,
            title: "User Report Accepted",
            text: "Your report against " + reportedName + " has been accepted and the user has been banned."
          });
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: reportedID,
            title: "You Have Been Banned",
            text: "You have been banned. If you think this is a mistake appeal by submitting an unban request."
          });
          await axios.delete(`http://18.191.156.68:8000/api/userreports/`+ reportID + '/');
          this.usrReports[index].show = false;
    },
    async rejectUsrReport(reportID, index, reportedName, reporterID){
          await axios.delete(`http://18.191.156.68:8000/api/userreports/`+ reportID + '/');

          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: reporterID,
            title: "User Report Rejected",
            text: "Your report against " + reportedName + " has been rejected."
          });

          this.usrReports[index].show = false;
    },
    async acceptRevReport(reviewID, reportID, index, requesterID, reviewName){
          console.log(reportID)
          await axios.delete(`http://18.191.156.68:8000/api/reviews/` + reviewID +'/' );
          //await axios.delete(`http://18.191.156.68:8000/api/reviewreports/`+ reportID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "Review Report Accepted",
            text: "Your report against " + reviewName + " has been accepted and the review has been deleted."
          });
          this.revReports[index].show = false;
    },
    async rejectRevReport(reportID, index, requesterID, reviewName){
          await axios.delete(`http://18.191.156.68:8000/api/reviewreports/`+ reportID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "Review Report Rejected",
            text: "Your report against " + reviewName + " has been rejected."
          });
          this.revReports[index].show = false;
    },
    async rejectReview(reviewID, requestID, index, requesterID, reviewName){
          //console.log(switchOption)
          console.log(reviewID, requestID, index);
          await axios.delete(`http://18.191.156.68:8000/api/reviews/` + reviewID +'/' );
          //await axios.delete(`http://18.191.156.68:8000/api/reviewrequests/`+ requestID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "Review Request Rejected",
            text: "Your request for " + reviewName + " has been rejected and your review has been deleted."
          });

          this.reviews[index].show = false;
    },
    async resolveReview(requestID, index, requesterID, reviewName, reviewID){
          await axios.patch(`http://18.191.156.68:8000/api/reviews/` + reviewID +'/', {
            is_active: true,
          });
          await axios.delete(`http://18.191.156.68:8000/api/reviewrequests/`+ requestID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "Review Request Resolved",
            text: "Your request for " + reviewName + " has been resolved and your review has been added."
          });
          this.reviews[index].show = false;
    },
    async addNew(reviewID, department, course, professor, requestID, index, requesterID, reviewName, school) {
      try {
          console.log(reviewID, department, course, professor);


          let dptID = -1;
          let courseID = -1;
          let profID = -1;
          if (department.length != 0) {
            const resDpt = await axios.post('http://18.191.156.68:8000/api/departments/', {
                school: school,
                name: department
            });
            dptID = resDpt.data.id
          }

          if (professor.length != 0) {
            const resProf = await axios.post('http://18.191.156.68:8000/api/professors/', { //adds new prof to old/new dpt
                school: school,
                name: professor,
                departments: dptID
            });
            profID = resProf.data.id
          } 
          
          const resOthers = await axios.get('http://18.191.156.68:8000/api/reviews/' + reviewID + '/');
          if(profID == -1) {
            profID = resOthers.data["professor"];
          }
          if(dptID == -1) {
            dptID = resOthers.data["department"];
          }

          if (course.length != 0) {
            const resCourse = await axios.post('http://18.191.156.68:8000/api/courses/', { //adds new course to old/new prof
                school: school,
                department: dptID,
                professors: profID,
                name: course,
            });
            courseID = resCourse.data.id
          } else {
            courseID = resOthers.data["course"];
          }
              
          if (department.length != 0 && professor.length == 0) { //add new dpt to old prof
            await axios.patch('http://18.191.156.68:8000/api/professors/' + profID, {
                departments: dptID
            });
          }

          if (professor.length != 0 && course.length == 0) { //add new prof to old course
            await axios.patch('http://18.191.156.68:8000/api/courses/' + courseID, {
                professors: profID
            });
          }

          const res = await axios.patch('http://18.191.156.68:8000/api/reviews/' + reviewID + '/', {
            department: dptID,
            professor: profID,
            course: courseID,
            is_active: true
          });
          console.log(res);
          await axios.delete(`http://18.191.156.68:8000/api/reviewrequests/`+ requestID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "Review Request Accepted",
            text: "Your request for " + reviewName + " has been accepted and your review has been added."
          });
          this.reviews[index].show = false;


      } catch (error) {
            // Log the error
            console.log(error);
      }
    },
    async acceptClubRevReport(reviewID, reportID, index, requesterID, reviewName){
          console.log(reportID)
          await axios.delete(`http://18.191.156.68:8000/api/clubs/reviews/` + reviewID +'/' );
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "Review Report Accepted",
            text: "Your report against " + reviewName + " has been accepted and the review has been deleted."
          });
          this.clubRevReports[index].show = false;
    },
    async rejectClubRevReport(reportID, index, requesterID, reviewName){
          await axios.delete(`http://18.191.156.68:8000/api/clubs/reviewreports/`+ reportID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "Review Report Rejected",
            text: "Your report against " + reviewName + " has been rejected."
          });
          this.clubRevReports[index].show = false;
    },
    async rejectClubReview(reviewID, requestID, index, requesterID, reviewName){
      console.log(requestID);
          await axios.delete(`http://18.191.156.68:8000/api/clubs/reviews/` + reviewID +'/' );
          //await axios.delete(`http://18.191.156.68:8000/api/reviewrequests/`+ requestID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "Review Request Rejected",
            text: "Your request for " + reviewName + " has been rejected and your review has been deleted."
          });

          this.clubRevRequests[index].show = false;
    },
    async resolveClubReview(requestID, index, requesterID, reviewName, reviewID){
          await axios.patch(`http://18.191.156.68:8000/api/clubs/reviews/` + reviewID +'/', {
            is_active: true,
          });
          await axios.delete(`http://18.191.156.68:8000/api/clubs/reviewrequests/`+ requestID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "Review Request Resolved",
            text: "Your request for " + reviewName + " has been resolved and your review has been added."
          });
          this.clubRevRequests[index].show = false;
    },
    async addClubNew(reviewID, club, requestID, index, requesterID, reviewName, clubCat, school) {
      try {

          const resClub = await axios.post('http://18.191.156.68:8000/api/clubs/clubs/', {
              school: school,
              name: club,
              category: clubCat,
          });
          let clubID = resClub.data.id;
              
          const res = await axios.patch('http://18.191.156.68:8000/api/clubs/reviews/' + reviewID + '/', {
            club: clubID,
            is_active: true
          });
          console.log(res);
          await axios.delete(`http://18.191.156.68:8000/api/clubs/reviewrequests/`+ requestID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "Review Request Accepted",
            text: "Your request for " + reviewName + " has been accepted and your review has been added."
          });
          this.clubRevRequests[index].show = false;


      } catch (error) {
            // Log the error
            console.log(error);
      }
    },
    async acceptDiningRevReport(reviewID, reportID, index, requesterID, reviewName){
          //console.log(switchOption)
          await axios.delete(`http://18.191.156.68:8000/api/dining/reviews/` + reviewID +'/' );
          //await axios.delete(`http://18.191.156.68:8000/api/dining/reviewreports/`+ reportID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "Review Report Accepted",
            text: "Your report against " + reviewName + " has been accepted and the review has been deleted."
          });
          this.diningRevReports[index].show = false;
    },
    async rejectDiningRevReport(reportID, index, requesterID, reviewName){
          await axios.delete(`http://18.191.156.68:8000/api/dining/reviewreports/`+ reportID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "Review Report Rejected",
            text: "Your report against " + reviewName + " has been rejected."
          });
          this.diningRevReports[index].show = false;
    },
    async acceptDiningPostReport(reviewID, reportID, index, requesterID, reviewName){
          console.log(reviewName);
          await axios.delete(`http://18.191.156.68:8000/api/dining/posts/` + reviewID +'/' );
          //await axios.delete(`http://18.191.156.68:8000/api/dining/postreports/`+ reportID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "Post Report Accepted",
            text: "Your post report has been accepted and the post has been deleted."
          });
          this.diningPostReports[index].show = false;
    },
    async rejectDiningPostReport(reportID, index, requesterID, reviewName){
          console.log(reviewName);
          await axios.delete(`http://18.191.156.68:8000/api/dining/postreports/`+ reportID + '/');
          await axios.post(`http://18.191.156.68:8000/api/messages/`, {
            receiver: requesterID,
            title: "Post Report Rejected",
            text: "Your post report has been rejected."
          });
          this.diningPostReports[index].show = false;
    },
    switchTabs() {
      console.log(this.tab);
      if(this.tab == 'courses'){
        this.barColor = 'deep-purple lighten-1';
      } else if (this.tab == 'dining') {
        this.barColor = 'green accent-4';
      } else {
        this.barColor = 'deep-orange darken-1';
      }
    },
    searchClass() {
      console.log(this.search);
      this.searchresult = [];
      for (let i in this.reviews) {
          if (this.reviews[i].course_name == this.search) {
            this.searchresult.push(this.reviews[i]);
          }
          //console.log(this.reviews[i].professor_name.replace(" ",""));
          //console.log(this.search.replace(" ",""));
          if (this.reviews[i].professor_name.replaceAll(" ","") == this.search.replaceAll(" ","")) {
            this.searchresult.push(this.reviews[i]);
          }
          if(this.reviews[i].department_name == this.search){
            this.searchresult.push(this.reviews[i]);
          }
      }
      if(this.searchresult.length>0) this.isShow = false;
      else this.isShow = true;
    },
    goToSearch() {
      console.log("hello?");
      if(this.search){
        this.$router.push('/SearchResults/' + this.search);
      } 
      
    },
    switchToDining() {
      //console.log("dining");
      this.$router.push('/DiningVisitorPage');
    },
    },
    created() {
        // Fetch tasks on page load
        this.$emit('showTop', true)
        if (localStorage.getItem("reviewType") == 'dining'){
          this.$store.dispatch("setLayout", "baseDiningLayout");
        } else  if (localStorage.getItem("reviewType") == 'course') {
          this.$store.dispatch("setLayout", "baseLayout");
        } else {
          this.$store.dispatch("setLayout", "baseClubLayout");
        }
        document.title = "Admin Page"
        if (localStorage.getItem('isAdmin') === "false") {
          this.$router.replace('/VisitorPage');
          return
        }

        this.getData();
        console.log(this.curUsername);
        
    },
    emits: ['showTop'],
}
</script>

<style lang="scss">
#app {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
}
.text-center{
text-align:center;
}
.admininput{
  border: 2px solid rgba(122,122,122,.5);
  border-radius: 5px;
}
.b-nav{
text-align: left;
}
.text {
position: absolute;
top: 13px;
text-decoration: none;
color: white;
font-weight: 600;
}

.center {
margin-left: auto;
margin-right: auto;
}

.searchbar{
  width: 600px;
  position: absolute;
  left:27%;
}
</style>
<style lang="scss" scoped>
input[type=text] {
  border: 1px solid black;
  border-radius: 2px;
}
</style>