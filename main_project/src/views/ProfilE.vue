<template>

    <v-menu location="end">
      <template v-slot:activator="{ props }">
        <v-btn class="float-right mr-4" :color="menuColor" v-bind="props" icon="mdi-dots-vertical"></v-btn>
      </template>

      <v-list>
        <v-list-item
          v-if="(curUser == this.$route.params.userId && !banned)"
          v-on:click="editProfile"
        >
          <template v-slot:prepend>
            <v-icon>mdi-pencil</v-icon>
          </template>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="!banned"
          v-on:click="(showReport = !showReport)"
        >
          <template v-slot:prepend>
            <v-icon>mdi-flag</v-icon>
          </template>
          <v-list-item-title>Report</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="(curUser == this.$route.params.userId && banned)"
          v-on:click="(showRequest = !showRequest)"
        >
          <template v-slot:prepend>
            <v-icon>mdi-lock-open</v-icon>
          </template>
          <v-list-item-title>Request Unban</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>


    <v-card-title class="text-h2 text-left text-wrap font-weight-bold ma-5" style="line-height: 40pt">{{ profile.username }}'s Profile</v-card-title>

    <div class="d-flex flex-row align-center" style="margin-left: 3%">
      <div>
        <p class="text-left text-h5 text-wrap ml-9 font-weight-medium text-medium-emphasis">School: {{ profile.school_name }}</p>
        <br/>
        <p class="text-left text-h5 text-wrap ml-9 font-weight-medium text-medium-emphasis">Area of Study: {{ profile.areaOfStudy }}</p>
      </div>
      <div class="votecircle" style="margin-left: 400px">
        <v-progress-circular
          :rotate="360"
          :size="100"
          :width="10"
          :model-value="total_votes_pct"
          color="blue"
        >
          {{ total_votes_score }}
        </v-progress-circular>
        <br/>
        <br/>
        <p>{{ total_votes_text }}</p>
        <p>{{ total_votes }} Votes and {{ total_reviews }} Reviews</p>
      </div>
    
    </div>





    <br/>
    
      
    <br/>
    <br/>
    <br/>
    <v-row justify="center" >
    <!-- <v-btn
        v-if="(curUser == this.$route.params.userId)"
        fab
        color="deep-purple accent-2"
        class="ma-2"
        @click="editProfile"
      >
      Edit Profile
    </v-btn>
    <v-btn
        fab
        color="deep-purple accent-2"
        class="ma-2"
        @click="(showReport = !showReport)"
      >
        Report
      </v-btn> -->
    <v-card>
      <v-dialog
        v-model="showReport"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Report User
          </v-card-title>
          <v-form
          ref="reportform"
          v-model="reportValid"
          lazy-validation
          >

          <v-card-text>
            <v-text-field
              v-model="reportReason"
              :rules="reportRules"
              label="Please Provide a Reason"
              required
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              :disabled="!reportValid"
              color="red darken-1"
              class="mr-4"
              @click="reportUser"
            >
              Report
            </v-btn>
          </v-card-actions>
        </v-form>
        </v-card>
      </v-dialog>
    </v-card>

    <v-card>
      <!-- <v-btn
        fab
        color="deep-purple"
        @click="(showRequest = !showRequest)"
      >
        Request an Unban
      </v-btn> -->
      <v-dialog
        v-model="showRequest"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Report User
          </v-card-title>
          <v-form
          ref="requestform"
          v-model="requestValid"
          lazy-validation
          >

          <v-card-text>
            <v-text-field
              v-model="requestReason"
              
              :rules="reportRules"
              label="Please Provide a Reason"
              required
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              :disabled="!requestValid"
              color="success"
              class="mr-4"
              @click="requestUnban"
            >
              Request Unban
            </v-btn>
          </v-card-actions>
        </v-form>
        </v-card>
      </v-dialog>
    </v-card>
  </v-row>

    <v-snackbar
      v-model="reportSnackbar"
      class="d-flex align-center"
    >
      <p class="text-left d-inline">Report Submitted</p>
      
      <v-btn
        color="deep-purple"
        text
        class="float-right d-inline"
        @click="reportSnackbar = false"
      >
        Close
      </v-btn>
      
    </v-snackbar>


    <v-snackbar
      v-model="requestSnackbar"
      class="d-flex align-center d-inline"
    >
      <p class="text-left">Unban Request Submitted</p>
      
      <v-btn
        color="red"
        text
        class="float-right d-inline"
        @click="requestSnackbar = false"
      >
        Close
      </v-btn>
      
    </v-snackbar>

    <br/>
    <v-divider inset></v-divider>
    <br/>

    <v-card>
      <v-tabs
        class="ma-5 rounded-xl"
        justify="center"
        v-model="tab"
        fixed-tabs
        :bg-color="menuColor"
      >
        <v-tab value="courseReviews">Course Reviews</v-tab>
        <v-tab value="diningReviews">Dining Reviews</v-tab>
        <v-tab value="diningPosts">Dining Posts</v-tab>
        <v-tab value="clubReviews">Club Reviews</v-tab>
        <v-tab value="clubEvents">Club Events</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="courseReviews">
            <p v-if="userReviews.length == 0" class="text-center text-h6 text-wrap ml-9 font-weight-regular text-medium-emphasis">No Reviews to Display</p>

            <v-container>
              <VRow>
                <VCol
                    v-for = "review in userReviews" :key="review.id"
                    cols="4"
                >
                <VCard router-link :to="'/Review/' +  review.id">
                  Title: {{review.title}}
                <br/>Course: {{review.course_name}}<br/>Professor: {{review.professor_name}}<br/>Rating: {{review.rating}}
                </VCard>
                </VCol>
              </VRow>
            </v-container>

          </v-window-item>

          <v-window-item value="diningReviews">
            <p v-if="userDiningReviews.length == 0" class="text-center text-h6 text-wrap ml-9 font-weight-regular text-medium-emphasis">No Reviews to Display</p>
            
            <v-container>
              <VRow>
                <VCol
                    v-for = "review in userDiningReviews" :key="review.id"
                    cols="4"
                >
                <VCard router-link :to="'/DiningReview/' +  review.id">
                  Title: {{review.title}}
                <br/>Dining Hall: {{review.dining_hall}}<br/>Rating: {{review.rating}}
                </VCard>
                </VCol>
              </VRow>
            </v-container>

          </v-window-item>

          <v-window-item value="diningPosts">
            <p v-if="userDiningPosts.length == 0" class="text-center text-h6 text-wrap ml-9 font-weight-regular text-medium-emphasis">No Posts to Display</p>
            
            <v-container>

                <VRow>
                  <VCol
                      v-for = "review in userDiningPosts" :key="review.id"
                      cols="4"
                  >
                  <v-card>
                    <v-img
                        class="bg-white align-center justify-center"
                        width="300"
                        :aspect-ratio="1"
                        :src="review.post_img"
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
  
                    <br/>Location: {{review.dining_hall_name}}
                    <br/>Description: {{review.post_text}}<br/>

                  </v-card>
                  </VCol>
                </VRow>
            </v-container>

          </v-window-item>

          <v-window-item value="clubReviews">
            <p v-if="userClubReviews.length == 0" class="text-center text-h6 text-wrap ml-9 font-weight-regular text-medium-emphasis">No Reviews to Display</p>
            
            <v-container>
              <VRow>
                <VCol
                    v-for = "review in userClubReviews" :key="review.id"
                    cols="4"
                >
                <VCard router-link :to="'/ClubReview/' +  review.id">
                  Title: {{review.title}}
                <br/>Club: {{review.club_name}}<br/>Rating: {{review.rating}}
                </VCard>
                </VCol>
              </VRow>
            </v-container>
          </v-window-item>

          <!-- <v-window-item value="clubEvents">
            Club Events
          </v-window-item> -->
        </v-window>
      </v-card-text>
    </v-card>


</template>





<script>
import axios from "axios";

  export default{
      name:'ProfilE',
      data(){
         console.log("id: " + this.$route.params.userId );
         return {
          tab: 'courseReviews',
          reportReason: '',
          reportSnackbar: false,
          requestReason: '',
          requestSnackbar: false,
          review: [],
          profile: [],
          username: localStorage.getItem("username"),
          curVerified: localStorage.getItem('loggedIn'),
          curUsername: localStorage.getItem('username'),
          curSchool: localStorage.getItem("schoolName"),
          curUser: localStorage.getItem("userID"),
          banned: localStorage.getItem("isActive") == 'true' ? false : true,
          showReport: false,
          showRequest: false,
          userReviews: [],
          userDiningReviews: [],
          userDiningPosts: [],
          userClubReviews: [],

          menuColor: 'deep-purple lighten-1',
          
          requestValid: true,
          reportValid: true,
          name: '',
          reportRules: [
            v => !!v || 'Reason is required'
          ],
          files: [],
          isError: false,
          errorText: null,
          testfiles: [],

          total_votes: 0,
          total_votes_score: 0,
          total_reviews: 0,
          total_votes_pct: 50,
          total_votes_text: 'No Votes Yet.',
         }
      },
      methods: {
        async getData() {
            try {
                // fetch tasks
                const userProfile = await axios.get(`http://18.191.156.68:8000/api/profiles/?id=` + this.$route.params.userId);
                const userReviews = await axios.get(`http://18.191.156.68:8000/api/reviews/?is_active=1&user=` + this.$route.params.userId);
                const userDiningReviews = await axios.get(`http://18.191.156.68:8000/api/dining/reviews/?user=` + this.$route.params.userId);
                const userDiningPosts = await axios.get(`http://18.191.156.68:8000/api/dining/posts/?user=` + this.$route.params.userId);
                const userClubReviews = await axios.get(`http://18.191.156.68:8000/api/clubs/reviews/?user=` + this.$route.params.userId);
                //NEED QUERY SET


                this.userReviews = userReviews.data;
                this.userDiningReviews = userDiningReviews.data;
                this.userDiningPosts = userDiningPosts.data;
                this.userClubReviews = userClubReviews.data;
                this.total_reviews = this.userReviews.length + this.userDiningReviews.length;
                this.profile = userProfile.data[0];

                let total_up = 0;
                let total_down = 0;
                this.userReviews.forEach(review => {
                  this.total_votes_score += review["vote_score"];
                  total_up += review["num_vote_up"];
                  total_down += review["num_vote_down"];
                });
                this.userDiningReviews.forEach(review => {
                  this.total_votes_score += review["vote_score"];
                  total_up += review["num_vote_up"];
                  total_down += review["num_vote_down"];
                });
                this.userClubReviews.forEach(review => {
                  this.total_votes_score += review["vote_score"];
                  total_up += review["num_vote_up"];
                  total_down += review["num_vote_down"];
                });
                this.total_votes = total_down + total_up;
                if(this.total_votes != 0){
                  this.total_votes_pct = Math.trunc(100 * (total_up / this.total_votes));
                  this.total_votes_text = "" + this.total_votes_pct + "% Upvoted Based on";
                }
                console.log(this.profile)
            } catch (error) {
                // log the error
                console.log(error);
            }
        },
        onAddFiles() { //uses https://github.com/nickycdk/vue-cloudinary-demo/blob/master/src/App.vue
          console.log("yo");
          console.log(this.testfiles);
          if(this.testfiles.length > 0) {
              this.testfiles.forEach((file) => {
                  console.log(file);
                  this.uploadFileToCloudinary(file).then((fileResponse) => {
                      this.files.push(fileResponse);
                  });
              });
          }
        },
        uploadFileToCloudinary(file) {
            return new Promise(function (resolve, reject) {
                //Ideally these to lines would be in a .env file
                const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dj9h8c4dc/upload';
                const CLOUDINARY_UPLOAD_PRESET = 'n6de1obi';
                

                let formData = new FormData();
                formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
                formData.append('folder', 'cloudinary-demo');
                formData.append('file', file);

                let request = new XMLHttpRequest();
                request.open('POST', CLOUDINARY_URL, true);
                request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

                request.onreadystatechange = () => {
                    // File uploaded successfully
                    if (request.readyState === 4 && request.status === 200) {
                        let response = JSON.parse(request.responseText);
                        resolve(response);
                    }

                    // Not succesfull, let find our what happened
                    if (request.status !== 200) {
                        let response = JSON.parse(request.responseText);
                        let error = response.error.message;
                        alert('error, status code not 200 ' + error);
                        reject(error);
                    }

                };

                request.onerror = (err) => {
                    alert('error: ' + err);
                    reject(err);
                };

                request.send(formData);
            });
        },
        editProfile(){
          this.$router.push('/EditProfile/' + this.$route.params.userId)
        },
        async reportUser(){
          console.log("reported " + this.reportReason);
          
          //post to userreports with user id and profile id

          if (this.reportReason.length != 0) {
            try {
              await axios.post('http://18.191.156.68:8000/api/userreports/', {
                  reporter: this.curUser,
                  reported: this.$route.params.userId,
                  reason: this.reportReason
              });
              this.showReport = false;
              this.reportSnackbar = true;
            } catch (error) {
              console.log(error)
            }
          }
        },
        async requestUnban(){
          console.log("request " + this.requestReason);
          
          //post to userreports with user id and profile id

          if (this.requestReason.length != 0) {
            try {
              await axios.post('http://18.191.156.68:8000/api/unbanrequests/', {
                  banned_user: this.curUser,
                  reason: this.requestReason
              });
              this.showRequest = false;
              this.requestSnackbar = true;
            } catch (error) {
              console.log(error)
            }
          }
        },
        validate () {
          if (this.showRequest){
            this.$refs.requestform.validate()
          } else {
            this.$refs.reportform.validate()
          }
          
        }
        },
        created() {
          this.$emit('showTop', true)
          if (localStorage.getItem("reviewType") == 'dining'){
            this.$store.dispatch("setLayout", "baseDiningLayout");
            this.menuColor = 'green accent-4';
          } else  if (localStorage.getItem("reviewType") == 'course') {
            this.$store.dispatch("setLayout", "baseLayout");
            this.menuColor = 'deep-purple lighten-1';
          } else {
            this.$store.dispatch("setLayout", "baseClubLayout");
            this.menuColor = 'deep-orange darken-1';
          }
          document.title = "Profile";
            // Fetch tasks on page load
            if(localStorage.getItem('loggedIn')){
              this.getData();
            } else {
              this.$router.push("/VisitorPage");
            }
        },
        emits: ['showTop'],
  }

</script>
<style scoped>
.title {
  text-align: center;
  font-size: 35px;
}


.box {
  margin-left: 150px;
  margin-right: 150px;
  text-align: left;
  border-style: solid;
  border-width: 3px;
  border-bottom-color: #000;
  padding: 10px;
}

</style>