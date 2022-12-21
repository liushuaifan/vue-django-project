<template>
  <v-app>
    <br>
    <div class="title">
      <span style="font-size: 30px; right:40%  ">Create Dining Review</span>
    </div>
    <br>
  
    <v-form 
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
              :counter="30"
              label="Title"
              required
            ></v-text-field>
            <div>
                <v-autocomplete
                  label="Dining Hall"
                  v-model="diningHall"
                  :items="diningHalls"
                  :rules="mandatoryRule"
                  item-title="name"
                  item-value="id"
                  required
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
          Unable To Create Review
        </v-alert>
      </v-scroll-y-transition>
      <v-scroll-y-transition>
        <v-alert
          v-model="submitSuccess"
          type="success"
          closable
          close-label="Close"
        >
          Review Successfully Created!
        </v-alert>
      </v-scroll-y-transition>
    </div>

    <v-btn @click="validate">
      Create Review
    </v-btn>
      
  </v-form>
  

  </v-app>
  </template>
  
  <script>
  import axios from "axios";
  export default{
      name:'CreateDiningReview',
      data(){
         return {
          valid: true,
          panel: [0],
          title: '',
          diningHall: '',
          rating: 3,
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
          submitSuccess: false,
          submitFailure: false,
          mandatoryRule: [v => !!v || 'Field is required'],

         }
      },
      methods: {
        async validate () {
          const { valid } = await this.$refs.form.validate()
          if (valid) {
            await this.addReview()
            
            this.$refs.form.reset();
          } else {
            this.submitSuccess = false;
            this.submitFailure = true;
          }
        },
        async getData() {
            try {
                // fetch tasks
                const resDiningHalls = await axios.get('http://18.191.156.68:8000/api/dining/dining_halls/');
                this.diningHalls = resDiningHalls.data;
                
                
            } catch (error) {
                // log the error
                console.log(error);
            }
        },
        async addReview(){
            try {
                // Send a POST request to the API
                await axios.post('http://18.191.156.68:8000/api/dining/reviews/', {
                    poster: this.curUser,
                    title: this.title,
                    dining_hall: this.diningHall,
                    rating: parseInt(this.rating),
                    taste: parseInt(this.taste),
                    cleanliness: parseInt(this.cleanliness),
                    wait_time: this.wait,
                    variety: parseInt(this.variety),
                    staff_friendliness: parseInt(this.friendliness),
                    review_text: this.reviewComment
                });
                // window.alert("Review Created");
                // this.$router.push("/DiningVisitorPage");
                this.submitFailure = false;
                this.submitSuccess = true;

                // this.title = '';
                // this.diningHall = '';
                this.rating = 3;
                this.taste = '';
                this.cleanliness = '';
                // this.wait = '';
                this.variety = '';
                this.friendliness = '';
                // this.reviewComment = '';
                
            } catch (error) {
                // Log the error
                this.submitFailure = true;
                this.submitSuccess = false;
            }
        },
        },
        created() {
          this.$emit('showTop', true)
          this.$store.dispatch("setLayout", "baseDiningLayout");
            document.title = "Create Dining Review";
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