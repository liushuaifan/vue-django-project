<template>
  <v-card>

    <v-menu location="end">
      <template v-slot:activator="{ props }">
        <v-btn class="float-right ma-5" color="deep-purple accent-2" v-bind="props" icon="mdi-dots-vertical"></v-btn>
      </template>

      <v-list>
        <v-list-item
          v-if="showModifiers && curActive"
          v-on:click="editReview"
        >
          <template v-slot:prepend>
            <v-icon>mdi-pencil</v-icon>
          </template>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="showModifiers && curActive"
          v-on:click="deleteReview"
        >
          <template v-slot:prepend>
            <v-icon>mdi-delete</v-icon>
          </template>
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-on:click="(showReport = !showReport)"
        >
          <template v-slot:prepend>
            <v-icon>mdi-flag</v-icon>
          </template>
          <v-list-item-title>Report</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-card-title class="text-h2 text-left text-wrap font-weight-bold ma-5" style="line-height: 40pt">{{ review.title }}</v-card-title>

    <!-- <v-card-subtitle class="text-left text-h6 text-wrap ml-8">Review For <router-link :to="'/SearchResults/' + review.course_name">{{ review.course_name }}</router-link> In
      <router-link :to="'/SearchResults/' + review.department_name">{{ review.department_name }}</router-link> Department At <router-link :to="'/SearchResults/' + review.department_name">{{ review.school_name }}</router-link></v-card-subtitle> -->
    
    <v-container>
      <v-row no-gutters>
        <v-col align-self="center">
          <p class="text-left text-h5 text-wrap ml-7 font-weight-medium text-medium-emphasis">Course: <a href="javascript:void(null);" class="text-decoration-underline" @click="searchThing(review.course_name, review.course, 0)">{{ review.course_name }}</a></p>
        </v-col>

        <v-col align-self="center">
          <p class="text-left text-h5 text-wrap ml-7 font-weight-medium text-medium-emphasis">Department: <a href="javascript:void(null);" class="text-decoration-underline" @click="searchThing(review.department_name, review.department, 2)">{{ review.department_name }}</a></p>
        </v-col>

        <v-col align-self="center">
          <p class="text-left text-h5 text-wrap ml-7 font-weight-medium text-medium-emphasis">School: {{ review.school_name }}</p>
        </v-col>
      </v-row>
    </v-container>
    
    
    <v-card-subtitle class="text-left ml-10">Posted by: <router-link :to="'/ProfilE/' + review.poster">{{ review.poster_name }}</router-link> </v-card-subtitle>

    <div class="d-flex flex-row align-center" style="margin-left: 40%">
      <div class="votecircle">
        <v-progress-circular
          :rotate="360"
          :size="100"
          :width="10"
          :model-value="review.vote_pct"
          color="blue"
        >
          {{ review.vote_score }}
        </v-progress-circular>
      </div>
      <div class="ml-5">
        <p class="text-center text-h6 font-weight-regular"> {{ vote_pct_text }} </p>
        <v-btn
          icon
          color="blue"
          :disabled="hasUpvoted || !curActive"
          @click="upvote()"
        >
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>
        <v-btn
          icon
          color="grey"
          :disabled="noVote || !curActive"
          @click="clearvote()"
        >
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
        <v-btn
          icon
          color="red"
          :disabled="hasDownvoted || !curActive"
          @click="downvote()"
        >
          <v-icon>mdi-thumb-down</v-icon>
        </v-btn>
      </div>
    </div>

    <v-card-text class="text-right mr-10">
      Review Posted on {{ review.post_date }}
    </v-card-text>

    <v-divider></v-divider>

    <v-card-text class="text-right mr-10">
      Class taken in {{ semesters[review.semester] }} with <a  class="text-decoration-underline" @click="searchThing(review.professor_name, review.professor, 1)">{{ review.professor_name }}</a> as a {{ conversion[review.class_year_taken] }}
    </v-card-text>

    <v-container>
      <v-row no-gutters>
        <v-col align-self="center">
          <p class="text-center text-h5 font-weight-bold text-decoration-underline">Overall Rating</p>
          <v-rating
            class="pa-2 ma-2 text-body-2"
            v-model="review.rating"
            empty-icon="mdi-circle-outline"
            full-icon="mdi-circle"
            color="deep-purple accent-2"
            size="60"
            :item-labels="['poor', '', '', '', 'excellent']"
            readonly
          ></v-rating>
        </v-col>

        <v-col align-self="center">
          <p class="text-center text-subtitle-1 font-weight-bold">Difficulty</p>
          <v-rating
            class="pa-2 ma-2 text-body-2"
            v-model="review.difficulty"
            empty-icon="mdi-circle-outline"
            full-icon="mdi-circle"
            color="deep-purple accent-2"
            size="60"
            :item-labels="['very easy', '', '', '', 'very hard']"
            readonly
          ></v-rating>
        </v-col>

        <v-col align-self="center">
          <p class="text-center text-subtitle-1 font-weight-bold">Workload</p>
          <v-rating
            class="pa-2 ma-2 text-body-2"
            v-model="review.workload"
            empty-icon="mdi-circle-outline"
            full-icon="mdi-circle"
            color="deep-purple accent-2"
            size="60"
            :item-labels="['light', '', '', '', 'heavy']"
            readonly
          ></v-rating>
        </v-col>
      </v-row>
      <v-divider inset></v-divider>
      
      <br/>
      <v-row no-gutters>
        <v-col v-if="review.professor_helpfulness" align-self="center">
          <p class="text-center text-subtitle-2">Professor Helpfulness</p>
          <v-rating
            class="pa-2 ma-2 text-body-2"
            v-model="review.professor_helpfulness"
            empty-icon="mdi-circle-outline"
            full-icon="mdi-circle"
            color="deep-purple accent-2"
            size="60"
            :item-labels="['unhelpful', '', '', '', 'supportive']"
            readonly
          ></v-rating>
        </v-col>

        <v-col v-if="review.professor_friendliness" align-self="center">
          <p class="text-center text-subtitle-2">Professor Friendliness</p>
          <v-rating
            class="pa-2 ma-2 text-body-2"
            v-model="review.professor_friendliness"
            empty-icon="mdi-circle-outline"
            full-icon="mdi-circle"
            color="deep-purple accent-2"
            size="60"
            :item-labels="['apathetic', '', '', '', 'amicable']"
            readonly
          ></v-rating>
        </v-col>

        <v-col v-if="review.material_engagement" align-self="center">
          <p class="text-center text-subtitle-2">Material Engagement</p>
          <v-rating
            class="pa-2 ma-2 text-body-2"
            v-model="review.material_engagement"
            empty-icon="mdi-circle-outline"
            full-icon="mdi-circle"
            color="deep-purple accent-2"
            size="60"
            :item-labels="['boring', '', '', '', 'interesting']"
            readonly
          ></v-rating>
        </v-col>
      </v-row>
      <v-divider inset></v-divider>
      
      <br/>
      <v-row no-gutters>
        <v-col v-if="review.material_engagement" align-self="center">
          <p class="text-center text-subtitle-2">Class Size:</p>
          <p class=" text-center text-body-2">{{sizeConversion[review.class_size]}}</p>
        </v-col>

        <v-col v-if="review.class_type" align-self="center">
          <p class="text-center text-subtitle-2">Class Type:</p>
          <p class=" text-center text-body-2">{{conversion[review.class_type]}}</p>
        </v-col>

        <v-col v-if="review.instruction_style" align-self="center">
          <p class="text-center text-subtitle-2">Instruction Style:</p>
          <p class=" text-center text-body-2">{{conversion[review.instruction_style]}}</p>
        </v-col>
      </v-row>
    </v-container>

    <br/>

    <div v-if="review.review_text" class="d-flex flex-row align-end ml-10">
      <p class="text-left text-h6 font-weight-bold">Comment: </p>
      <p class="text-subtitle-1 font-weight-regular ml-2">{{review.review_text}}</p>

    </div>
  
    <br/>
    <br/>
    <v-divider></v-divider>
    <br/>
  
  
    <v-form v-if="curVerified && curActive" class="d-flex flex-row align-center ml-10" ref="commentform" lazy-validation>
      <div style="width:50%">
        <v-textarea
          label="Add a comment"
          auto-grow
          :rules="[v => !!v || 'Comment Cannot Be Empty']"
          v-model="userComment"
          rows="2"
        ></v-textarea>
      </div>
      <v-btn
        class="ml-5"
        :disabled="!userComment"
        prepend-icon="mdi-pencil"
        @click="addComment"
      >
        Comment
      </v-btn>
    </v-form>

    <v-divider inset></v-divider>
  
    <div v-if="comments.length" class="ml-10">
      <p class="text-left text-h6 font-weight-bold">Comments: </p>
      <div v-for="comment in comments" :key="comment.id"  class="text-left text-body-1">
        <p class="ml-2"><router-link :to="'/ProfilE/' + comment.poster" >{{ comment.poster_name }}</router-link> says:</p>
        <v-card-text class="ml-4">{{ comment.text }}</v-card-text>
        <v-divider inset></v-divider>
      </div>
    </div>
  
  
  </v-card>



    <v-card justify="end">
      <!-- <v-btn
        fab
        color="deep-purple accent-2"
        bottom
        left
        absolute
        @click="(showReport = !showReport)"
      >
        Report
      </v-btn> -->
      <v-dialog
        v-model="showReport"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Report Review
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
              color="deep-purple accent-2"
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

    <v-snackbar
      v-model="reportSnackbar"
      class="d-flex align-center d-inline"
    >
      <p class="text-left">Report Submitted</p>
      <v-btn
        color="red"
        text
        class="float-right d-inline"
        
        @click="reportSnackbar = false"
      >
        Close
      </v-btn>
      
    </v-snackbar>

  </template>
  
  
  <script>
  import axios from "axios";
  export default{
      name:'ReView',
      data(){
         console.log("id: " + this.$route.params.reviewId );
         return {
          review: [],
          awesome: false,
          hasDownvoted: false,
          hasUpvoted: false,
          noVote: true,
          vote_score: 0,
          vote_pct_text: 'No Votes Yet',
          comments: [],
          userComment: '',
          verified:'true',
          conversion: {
              'FR' : 'First-year',
              'SO' : 'Sophomore',
              'JR' : 'Junior',
              'SR' : 'Senior',
              'OTH' : 'Other',
              'LEC' : 'Lecture',
              'LAB' : 'Lab',
              'DIS' : 'Discussion',
              'IP' : 'In-person',
              'RM' : 'Remote',
              'HY' : 'Hybrid'
          },
          hourConversion: {
              '0' : '0-3 hours',
              '1' : '3-6 hours',
              '2' : '6-9 hours',
              '3' : '10+ hours'
          },
          sizeConversion: {
              '0' : '0-10 people',
              '1' : '11-40 people',
              '2' : '41-100 people',
              '3' : '100+ people'
          },
          semesters: {
            'FL2022': "Fall 2022",
            'SP2022': "Spring 2022",
            'FL2021': "Fall 2021",
            'SP2021': "Spring 2021",
            'FL2020': "Fall 2020",
            'SP2020': "Spring 2020"
          },
          curVerified: localStorage.getItem('loggedIn'),
          curUsername: localStorage.getItem('username'),
          curSchool: localStorage.getItem("schoolName"),
          curUser: localStorage.getItem("userID"),
          curAdmin: localStorage.getItem("isAdmin") === 'true',
          curActive: localStorage.getItem("isActive") === 'true',
          showModifiers: false,

          reportReason: '',
          reportSnackbar: false,
          reportValid: true,
          showReport: false,
          name: '',
          reportRules: [
            v => !!v || 'Reason is required'
          ]
         }
      },
      methods: {
        async getData() {
          try {
            // fetch tasks
                
                const res = await axios.get(`http://18.191.156.68:8000/api/reviews/` + this.$route.params.reviewId +'/' );
                this.review = res.data;
                if (this.review["vote_score"] == 0) {
                  this.review["vote_pct"] = 50;
                } else {
                  this.review["vote_pct"] = Math.trunc(100 * (this.review["num_vote_up"] / (this.review["num_vote_up"] + this.review["num_vote_down"])));
                  this.vote_pct_text = "" + this.review["vote_pct"] + "% Upvoted";
                }

                this.showModifiers = (this.review.poster == this.curUser)// && (localStorage.getItem('isActive') === "true")

                if (!this.review.is_active && localStorage.getItem('isAdmin') === 'false'){
                  this.$router.replace('/VisitorPage');
                }
                
                const res2 = await axios.get(`http://18.191.156.68:8000/api/comments/?review=` + this.$route.params.reviewId );
                this.comments = res2.data;
                

              try {
                await axios.post('http://18.191.156.68:8000/api/reviews/' + this.$route.params.reviewId + '/vote/', {
                  user_id: localStorage.getItem('userID'),
                  action: 'exists',
                  vote_action: 0
                });
                this.hasUpvoted = true;
                this.noVote = false;
              } catch (error) {
                    try {
                    await axios.post('http://18.191.156.68:8000/api/reviews/' + this.$route.params.reviewId + '/vote/', {
                      user_id: localStorage.getItem('userID'),
                      action: 'exists',
                      vote_action: 1
                    });
                    this.hasDownvoted = true;
                    this.noVote = false;
                  } catch (error) {
                    console.log(error);
                  }
              }
              
            } catch (error) {
                // log the error
                console.log("ERROR");
                this.$router.push('/VisitorPage');
            }
        },
        async addComment(){
          if (this.curVerified){
            try {
                // Send a POST request to the API
                console.log('comment: ' + this.userComment);
                const response = await axios.post('http://18.191.156.68:8000/api/comments/', {
                    poster: localStorage.getItem('userID'),
                    review: this.$route.params.reviewId,
                    text: this.userComment
                });
                await axios.post(`http://18.191.156.68:8000/api/messages/`, {
                  receiver: this.review.poster,
                  title: "Comment on Review",
                  text: this.curUsername + ' commented: "' + this.userComment + '" on your review titled ' + this.review.title
                });
                // Append the returned data to the tasks array
                console.log("pushing " + response.data);
                this.comments.push(response.data);
                this.userComment = '';
                this.$refs.commentform.resetValidation()
                // Reset the title and description field values.
            } catch (error) {
                // Log the error
                console.log(error);
            }
          }
        },
        searchThing(itemName, itemID, itemType) {
          localStorage.setItem('searchQuery', JSON.stringify([{name: itemName, id: itemID, type: itemType}]));
          this.$router.push("/SearchResults");
        },
        async upvote() {
          await axios.post('http://18.191.156.68:8000/api/reviews/' + this.$route.params.reviewId + '/vote/', {
            user_id: localStorage.getItem('userID'),
            action: 'up'
          });
          this.hasDownvoted = false;
          this.hasUpvoted = true;
          const res = await axios.get(`http://18.191.156.68:8000/api/reviews/` + this.$route.params.reviewId +'/' );
          this.review = res.data;

          if (this.review["vote_score"] == 0) {
            this.review["vote_pct"] = 50;
            this.vote_pct_text = "No Votes Yet";
          } else {
            this.review["vote_pct"] = Math.trunc(100 * (this.review["num_vote_up"] / (this.review["num_vote_up"] + this.review["num_vote_down"])));
            this.vote_pct_text = "" + this.review["vote_pct"] + "% Upvoted";
          }
          this.noVote = false;
        },
        async downvote() {
          await axios.post('http://18.191.156.68:8000/api/reviews/' + this.$route.params.reviewId + '/vote/', {
            user_id: localStorage.getItem('userID'),
            action: 'down'
          });
          this.hasDownvoted = true;
          this.hasUpvoted = false;
          const res = await axios.get(`http://18.191.156.68:8000/api/reviews/` + this.$route.params.reviewId +'/' );
          this.review = res.data;

          if (this.review["vote_score"] == 0) {
            this.review["vote_pct"] = 50;
            this.vote_pct_text = "No Votes Yet";
          } else {
            this.review["vote_pct"] = Math.trunc(100 * (this.review["num_vote_up"] / (this.review["num_vote_up"] + this.review["num_vote_down"])));
            this.vote_pct_text = "" + this.review["vote_pct"] + "% Upvoted";
          }
          this.noVote = false;
        },
        async clearvote() {
          await axios.delete(`http://18.191.156.68:8000/api/reviews/` + this.$route.params.reviewId + '/vote/', {
            data: {user_id: localStorage.getItem('userID')}
          });
          this.noVote = true;
          const res = await axios.get(`http://18.191.156.68:8000/api/reviews/` + this.$route.params.reviewId +'/' );
          this.review = res.data;

          if (this.review["vote_score"] == 0) {
            this.review["vote_pct"] = 50;
            this.vote_pct_text = "No Votes Yet";
          } else {
            this.review["vote_pct"] = Math.trunc(100 * (this.review["num_vote_up"] / (this.review["num_vote_up"] + this.review["num_vote_down"])));
            this.vote_pct_text = "" + this.review["vote_pct"] + "% Upvoted";
          }
          this.hasDownvoted = false;
          this.hasUpvoted = false;
        },
        editReview(){
          this.$router.push('/EditReview/' + this.$route.params.reviewId);
        },
        async deleteReview(){
          await axios.delete(`http://18.191.156.68:8000/api/reviews/` + this.$route.params.reviewId + '/');
          window.alert("Review deleted!");
          this.$router.push('/VisitorPage');
        },
        async reportUser(){
          console.log("reported " + this.reportReason);
          
          //post to userreports with user id and profile id

          if (this.reportReason.length != 0) {
            try {
              await axios.post('http://18.191.156.68:8000/api/reviewreports/', {
                  reporter: this.curUser,
                  review: this.$route.params.reviewId,
                  reason: this.reportReason
              });
              this.showReport = false;
              this.reportSnackbar = true;
            } catch (error) {
              console.log(error)
            }
          }
        },
        validate () {
          this.$refs.reportform.validate()
        }
        },
        created() {
          this.$emit('showTop', true)
          this.$store.dispatch("setLayout", "baseLayout");
          document.title = "Review";
            // Fetch tasks on page load
            this.getData();

            if(!localStorage.getItem('userID')){
                this.hasDownvoted = true;
                this.hasUpvoted = true;
            }
        },
        emits: ['showTop'],
  }
  </script>
  <style scoped>
  .box1 {
    color:red;
    margin-left: 150px;
    text-align: left;
  }
  .box3 {
    color:red;
    margin: 10px;
    margin-left: 120px;
    text-align: left;

  }
  .box4 {
    margin-left: 150px;
    margin-right: 150px;
    text-align: left;
    border-style: solid;
    border-width: 3px;
    border-bottom-color: #000;
    padding: 10px;
  }
  .comment {
    margin-top: 30px;
    margin-left: 150px;
    margin-right: 150px;
    text-align: left;
    border-style: solid;
    border-width: 3px;
    border-bottom-color: #000;
    padding: 10px;
  }
  </style>