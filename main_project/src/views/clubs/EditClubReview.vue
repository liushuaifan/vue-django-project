<template>
 <v-app>
    <br/>
      <div class="title">
        <span style="font-size: 30px; right:40%  ">Create Club Review</span>
      </div>
    <br/>
    <!-- v-on:submit.prevent="addReview" -->

    <v-form 
      ref="clubform"
      v-model="valid"
    >
      <v-expansion-panels
          v-model="panel"
          multiple
          style="width: 90%; margin-left: 5%"
        >
          <v-expansion-panel>
            <v-expansion-panel-title>Mandatory</v-expansion-panel-title>
            <v-expansion-panel-text>

              <v-text-field
                v-model="title"
                :counter="30"
                label="Title"
                disabled
              ></v-text-field>

              <div>
                <v-autocomplete
                  label="Club Name"
                  v-model="club"
                  disabled
                ></v-autocomplete>
              </div>

              <p>Overall Rating:</p>
              <v-rating
                v-model="rating"
                empty-icon="mdi-circle-outline"
                full-icon="mdi-circle"
                half-icon="mdi-circle-half"
                size="72"
                color='deep-orange darken-1'
                hover
                :item-labels="['poor', '', '', '', 'excellent']"
              ></v-rating>

              <p>Club Organization:</p>
              <v-rating
                v-model="organization"
                empty-icon="mdi-circle-outline"
                full-icon="mdi-circle"
                half-icon="mdi-circle-half"
                size="72"
                color='deep-orange darken-1'
                hover
                :item-labels="['dysfunctional', '', '', '', 'coordinated']"
              ></v-rating>

              <p>Club Leadership:</p>
              <v-rating
                v-model="leadership"
                empty-icon="mdi-circle-outline"
                full-icon="mdi-circle"
                half-icon="mdi-circle-half"
                size="72"
                color='deep-orange darken-1'
                hover
                :item-labels="['poor', '', '', '', 'excellent']"
              ></v-rating>

              <p>Level of Activity:</p>
              <v-rating
                v-model="activity"
                empty-icon="mdi-circle-outline"
                full-icon="mdi-circle"
                half-icon="mdi-circle-half"
                size="72"
                color='deep-orange darken-1'
                hover
                :item-labels="['dead', '', '', '', 'daily events']"
              ></v-rating>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>Optional</v-expansion-panel-title>
            <v-expansion-panel-text>

              <v-textarea
                label="Open Comments"
                auto-grow
                v-model="reviewComment"
                rows="2"
              ></v-textarea>
              
            </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <div class="ma-5">
        <v-scroll-y-transition>
          <v-alert
            v-model="submitFailure"
            type="error"
            closable
            close-label="Close"
          >
            Unable To Update Review
          </v-alert>
        </v-scroll-y-transition>
        <v-scroll-y-transition>
          <v-alert
            v-model="submitSuccess"
            type="success"
            closable
            close-label="Close"
          >
            Review Successfully Updated!
          </v-alert>
        </v-scroll-y-transition>
      </div>

      <v-btn @click="validate">
        Update Review
      </v-btn>
        
    </v-form>
</v-app>


</template>


<script>
import axios from "axios";

export default{
   name:'CreateReview',

   data(){
      return {
        valid: true,
        panel: [0],
        title: '',
        club: '',
        rating: '',
        organization: '',
        leadership: '',
        activity: '',
        reviewComment: '',
        verified:'true',
        curVerified: localStorage.getItem('loggedIn'),
        curUsername: localStorage.getItem('username'),
        curSchool: localStorage.getItem("schoolName"),
        curUser: localStorage.getItem("userID"),
        curAdmin: localStorage.getItem("isAdmin") === 'true',
        review: [],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 30) || 'Name must be less than 30 characters',
        ],
        submitSuccess: false,
        submitFailure: false,
        mandatoryRule: [v => !!v || 'Field is required'],
      }
   },
   methods: {
    async validate () {
      const { valid } = await this.$refs.clubform.validate()
      if (valid) {
        await this.addReview()
        
        this.$refs.clubform.reset();
      } else {
        this.submitSuccess = false;
        this.submitFailure = true;
      }
    },
     async getData() {
         try {
             // fetch tasks
             const res = await axios.get(`http://18.191.156.68:8000/api/clubs/reviews/` + this.$route.params.reviewId + '/');
             this.review = res.data;
             console.log(this.review);

             this.club = this.review.club_name;
             this.title = this.review.title;
             this.rating = this.review.rating;
             
             this.organization = this.review.organization;
             this.leadership = this.review.leadership;
             this.activity = this.review.activity;
             this.reviewComment = this.review.review_text
             
         } catch (error) {
             // log the error
             console.log(error);
         }
     },
     async addReview(){
         try {
             // Send a POST request to the API

             var dict = {
                organization: this.organization,
                leadership: this.leadership,
                activity: this.activity,
                review_text: this.reviewComment,
             };

            
             const response = await axios.patch('http://18.191.156.68:8000/api/clubs/reviews/' + this.$route.params.reviewId + '/', dict);
             console.log(response);
             this.submitFailure = false;
            this.submitSuccess = true;

             window.alert("Review Updated");

             
             this.$router.push("/ClubReview/" + this.$route.params.reviewId);
         } catch (error) {
             // Log the error
             console.log(error);
             this.submitSuccess = false;
              this.submitFailure = true;
         }
     },
     },
     created() {
      this.$emit('showTop', true)
      this.$store.dispatch("setLayout", "baseClubLayout");
       document.title = "Edit Review";
         // Fetch tasks on page load
         if(localStorage.getItem('loggedIn') && localStorage.getItem('isActive') === "true"){
           this.getData();
         } else {
           this.$router.push("/ClubVisitorPage");
         }
         
     },
      emits: ['showTop'],
}
</script>
<style scoped>
.title {
 margin-left: 10px;
 text-align: center;
}
.box3 {
 margin: 10px;
 margin-left: 120px;
 text-align: left;
}
.area1 {
 margin-left: 150px;
 margin-right: 150px;
 text-align: left;
 border-style: solid;
 border-width: 3px;
 border-bottom-color: #000;
 padding: 10px;
}
.area2 {
 margin-top: 30px;
 margin-left: 150px;
 margin-right: 150px;
 text-align: left;
 border-style: solid;
 border-width: 3px;
 border-bottom-color: #000;
 padding: 10px;
}
.formfield * {
 width:200px; 
 height:100px;
 vertical-align: middle;
 text-align: center;

 left: 0px;

}
.form-control {
/* position: relative;
font-family: Arial; */

border: 1px solid black;
height: 23px;
width: 150px;
border-radius: 2px;
}
</style>