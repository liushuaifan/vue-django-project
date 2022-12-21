<template>
  <v-app>
    <br>
    <div class="title">
      <span style="font-size: 30px; right:40%  ">Update Dining Review</span>
    </div>
    <br>
  
    <v-form 
      v-on:submit.prevent="addReview"
      ref="form"
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
              :rules="mandatoryRule"
              label="Title"
              disabled
            ></v-text-field>
            <div>
                <v-autocomplete
                  label="Dining Hall"
                  v-model="diningHall"
                  :items="diningHalls"
                  :rules="mandatoryRule"
                  item-title="name"
                  item-value="id"
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
              color="rgb(70,175,152)"
              hover
              :item-labels="['poor', '', '', '', 'excellent']"
            ></v-rating>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-title>Optional</v-expansion-panel-title>
          <v-expansion-panel-text>
            <p>Taste:</p>
            <v-rating
              v-model="taste"
              empty-icon="mdi-circle-outline"
              full-icon="mdi-circle"
              half-icon="mdi-circle-half"
              size="72"
              color="rgb(70,175,152)"
              hover
              :item-labels="['disgusting', '', '', '', 'delicious']"
            ></v-rating>
            <p>Cleanliness:</p>
            <v-rating
              v-model="cleanliness"
              empty-icon="mdi-circle-outline"
              full-icon="mdi-circle"
              half-icon="mdi-circle-half"
              size="72"
              color="rgb(70,175,152)"
              hover
              :item-labels="['filthy', '', '', '', 'pristine']"
            ></v-rating>
            <p>Variety:</p>
            <v-rating
              v-model="variety"
              empty-icon="mdi-circle-outline"
              full-icon="mdi-circle"
              half-icon="mdi-circle-half"
              size="72"
              color="rgb(70,175,152)"
              hover
              :item-labels="['stagnant', '', '', '', 'diverse']"
            ></v-rating>
            <p>Staff Friendliness:</p>
            <v-rating
              v-model="friendliness"
              empty-icon="mdi-circle-outline"
              full-icon="mdi-circle"
              half-icon="mdi-circle-half"
              size="72"
              color="rgb(70,175,152)"
              hover
              :item-labels="['rude', '', '', '', 'kind']"
            ></v-rating>
            <v-select
              label="Average Wait Time"
              v-model="wait"
              :items="[{name: '0-5 mins.', id: '0'}, {name: '5-10 mins.', id: '1'}, {name: '10-15 mins.', id: '2'}, {name: '15+ mins.', id: '3'}]"
              item-title="name"
              item-value="id"
            ></v-select>

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
      name:'EditDiningReview',
      data(){
         return {
          valid: true,
          panel: [0],
          author: '',
          title: '',
          diningHall: '',
          rating: '',
          taste: '',
          cleanliness: '',
          wait: '',
          variety: '',
          friendliness: '',
          reviewComment: '',
          verified:'true',
          diningHalls: [],
          curVerified: localStorage.getItem('loggedIn'),
          curUsername: localStorage.getItem('username'),
          curSchool: localStorage.getItem("schoolName"),
          curUser: localStorage.getItem("userID"),
          curAdmin: localStorage.getItem("isAdmin") === 'true',
          review: [],
          submitSuccess: false,
          submitFailure: false,
         }
      },
      methods: {
        async validate () {
          const { valid } = await this.$refs.form.validate()

          if (valid) {
            this.addReview()
          } else {
            this.submitFailure = true;
          }
        },
        async getData() {
            try {
                // fetch tasks
                const res = await axios.get('http://18.191.156.68:8000/api/dining/reviews/' + this.$route.params.reviewId + '/');
                this.review = res.data;
                
                this.title = this.review.title;
                this.diningHall = this.review.dining_hall_name;
                this.rating = this.review.rating;

                this.taste = this.review.taste;
                this.cleanliness = this.review.cleanliness;
                this.wait = this.review.wait_time;
                this.variety = this.review.variety;
                this.friendliness = this.review.staff_friendliness;
                this.reviewComment = this.review.review_text;
                
            } catch (error) {
                // log the error
                console.log(error);
            }
        },
        async addReview(){
            try {
                // Send a POST request to the API
                await axios.patch('http://18.191.156.68:8000/api/dining/reviews/' + this.$route.params.reviewId + '/', {
                    rating: parseInt(this.rating),
                    taste: parseInt(this.taste),
                    cleanliness: parseInt(this.cleanliness),
                    wait_time: this.wait,
                    variety: parseInt(this.variety),
                    staff_friendliness: parseInt(this.friendliness),
                    review_text: this.reviewComment
                });
                window.alert("Review Updated");
                this.$router.push("/DiningReview/" + this.$route.params.reviewId + "/");
            } catch (error) {
                // Log the error
                console.log(error);
                window.alert("Unable to create review");
            }
        },
        },
        created() {
          this.$emit('showTop', true)
          this.$store.dispatch("setLayout", "baseDiningLayout");
            document.title = "Edit Dining Review"
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
    vertical-align: middle;
  }
  </style>