<template>
    <div class="control ma-5"> 


    <VRow v-if="(showit==false)">
      <VCol
          v-for = "(review, index) in reviews" :key="review.id"
          cols="3"
      >
      <VCard>
        <v-img
            class="bg-white"
            width="300"
            :aspect-ratio="1"
            :src="review.post_img"
            @click="viewImage(review, index)"
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
      </VCard>
      </VCol>
    </VRow>

      
    
    <v-btn
      color="green accent-4"
      size="x-large"
      style="position: fixed; bottom: 5%; right: 3%"
      @click="(showPost = !showPost)"
      icon="mdi-plus"
    >
    </v-btn>


    <v-card>
      <v-dialog
        v-model="showPost"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Make a Post
          </v-card-title>
          <v-form
          ref="postform"
          v-model="postValid"
          lazy-validation
          >

          <div class="pa-2"> 
            <v-card-text>Dining Hall</v-card-text>               
            <select class="form-control" v-model="diningHall">
                <option v-for="diningHall in this.diningHalls" :key="diningHall.id" :value="diningHall.id" >{{ diningHall.name }}</option>
                <option value= "-1">Other</option>
            </select>
          </div>

          <v-card-text>
            <v-text-field
              v-model="postDesc"
              :rules="reportRules"
              label="Please Provide a Description"
              required
            ></v-text-field>
          </v-card-text>

          <v-content style="padding:50px; margin-top:30px;">
              
              <v-file-input label="Add Image" chips accept="image/*" v-model="testfiles"/>
              

              <v-alert v-if="isError">
                  {{errorText}}
              </v-alert>

          </v-content>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              :disabled="!postValid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Post
            </v-btn>
          </v-card-actions>
        </v-form>
        </v-card>
      </v-dialog>
    </v-card>

    <v-snackbar
      v-model="postSnackbar"
    >
       Post Submitted
      
      <v-btn
       class="float-right"
        color="light-green"
        text
        
        @click="postSnackbar = false"
      >
        Close
      </v-btn>
      
    </v-snackbar>

    <v-card justify="end">
      <v-dialog
        v-model="showReport"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Report Post
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
              color="success"
              class="mr-4"
              @click="otherValidate"
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
  </div>


  <v-card>
    <v-dialog
      v-model="showViewPost"
      max-width="600px"
    >
      <v-card>

        <v-menu location="end">
          <template v-slot:activator="{ props }">
            <v-btn class="float-right" style="margin-left: 90%; margin-top: 12px" color="green accent-4" v-bind="props" icon="mdi-dots-vertical"></v-btn>
          </template>

          <v-list>
            <v-list-item
              v-on:click="atRisk(selectedPost.id)"
            >
              <template v-slot:prepend>
                <v-icon>mdi-flag</v-icon>
              </template>
              <v-list-item-title>Report Post</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <br/>

        <div class="d-flex align-center justify-center ma-4">
          <v-img
            class="bg-white"
            width="300"
            :aspect-ratio="1"
            :src="selectedPost.post_img"
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

        <v-divider inset></v-divider>

        <p class="text-h6 text-left text-wrap ma-3 text-medium-emphasis">Posted by: <router-link :to="('/ProfilE/' + selectedPost.post_user)">{{selectedPost.post_user_name}}</router-link></p>
        
        <v-row>
          <v-col>
            <p class="text-left text-body-1 text-wrap ma-5 font-weight-regular text-medium-emphasis justify-center align-center"><a class="text-subtitle-1 font-weight-bold">At location:</a> {{selectedPost.dining_hall_name}}</p>
          </v-col>

          <v-col>
            <p class="text-center text-body-1 text-wrap mb-3 ml-5 font-weight-medium text-medium-emphasis"><a class="text-subtitle-1 font-weight-bold">Score:</a> {{selectedPost.vote_score}}</p>
            <div class="mb-3" style="margin-left: 27%;">
              <v-btn
                icon
                color="blue"
                :disabled="selectedPost.hasUpvoted"
                @click="upvote(selectedPost.id, selectedIndex)"
              >
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
              <v-btn
                icon
                color="grey"
                :disabled="selectedPost.noVote"
                @click="clearvote(selectedPost.id, selectedIndex)"
              >
                <v-icon>mdi-close-thick</v-icon>
              </v-btn>
              <v-btn
                icon
                color="red"
                :disabled="selectedPost.hasDownvoted"
                @click="downvote(selectedPost.id, selectedIndex)"
              >
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
            </div>
            
          </v-col>
        </v-row>
        <p class="text-left text-body-1 text-wrap mx-5 mt-0 font-weight-regular text-medium-emphasis"><a class="text-subtitle-1 font-weight-bold">Description:</a>  {{selectedPost.post_text}}<br/></p>
        <br/>
        <br/>
      </v-card>
    </v-dialog>
  </v-card>
</template>


<script>
import axios from "axios";
export default{
    name:'DiningPosts',
    data(){
        return{
            canUpload: true,
            search:'',
            imgsrc:'https://res.cloudinary.com/dj9h8c4dc/image/upload/v1670271098/cloudinary-demo/oeg7iwjrf08lnadmyud2.jpg',
            searchresult: [],
            professors: [],
            reviews: [],
            isShow:true,
            testtext: "Successfully",
            curVerified: localStorage.getItem('loggedIn'),
            curUsername: localStorage.getItem('username'),
            curSchool: localStorage.getItem("schoolName"),
            curUser: localStorage.getItem("userID"),
            curAdmin: localStorage.getItem("isAdmin") === 'true',
            professor_list:new Set(),
            showit:false,
            reviews1:[],

            hasDownvoted: [],
            hasUpvoted: [],
            noVote: [],

            selectedPost: {},
            selectedIndex: -1,

            diningHall: '',
            diningHalls: [],
            riskyPost: 0,
            showPost: false,
            showReport: false,
            showViewPost: false,
            reportReason: '',
            reportSnackbar: false,
            reportValid: true,
            name: '',
            reportRules: [
              v => !!v || 'Reason is required'
            ],
            postDesc: '',
            postImg: '',
            postSnackbar: false,
            postValid: true,
            files: [],
            isError: false,
            errorText: null,
            testfiles: [],

            postSubmitSuccess: false,
            postSubmitFailure: false,
        }
    },
    methods: {
      async getData() {
          try {
              // fetch tasks
              const res = await axios.get(`http://18.191.156.68:8000/api/dining/posts/`);
              this.reviews = res.data;
              for(let i in this.reviews){
                if(!this.reviews[i].dining_hall) {
                  this.reviews[i].dining_hall_name = "Other";
                }
                this.reviews[i].noVote = true;

                try {
                  await axios.post('http://18.191.156.68:8000/api/dining/posts/' + this.reviews[i].id + '/vote/', {
                    user_id: localStorage.getItem('userID'),
                    action: 'exists',
                    vote_action: 0
                  });
                  this.reviews[i].hasUpvoted = true;
                  this.reviews[i].hasDownvoted = false;
                  this.reviews[i].noVote = false;
                } catch (error) {
                      try {
                      await axios.post('http://18.191.156.68:8000/api/dining/posts/' + this.reviews[i].id + '/vote/', {
                        user_id: localStorage.getItem('userID'),
                        action: 'exists',
                        vote_action: 1
                      });
                      this.reviews[i].hasUpvoted = false;
                      this.reviews[i].hasDownvoted = true;
                      this.reviews[i].noVote = false;
                    } catch (error) {
                      console.log(error);
                    }
                }
              }

              const resDiningHalls = await axios.get('http://18.191.156.68:8000/api/dining/dining_halls/');
              this.diningHalls = resDiningHalls.data;
              for(let i in res.data){
                  this.professor_list.add(res.data[i].dining_hall_name);
              }
              //console.log(this.reviews.length);
          } catch (error) {
              // log the error
              console.log(error);
          }
      },
      async submitForm(){
          try {
              // Send a POST request to the API
              const response = await axios.post('http://18.191.156.68:8000/api/professors/', {
                  name: this.title
              });
              // Append the returned data to the tasks array
              console.log("pushing " + response.data);
              this.professors.push(response.data);
              // Reset the title and description field values.
              this.title = '';
              this.description = '';
          } catch (error) {
              // Log the error
              console.log(error);
          }
      },
      atRisk(postID){
        this.riskyPost = postID;
        this.showReport = !this.showReport;
      },
      viewImage(viewPost, index){
        this.selectedPost = viewPost;
        this.selectedIndex = index;
        this.showViewPost = true;
      },
      async otherValidate () {
          //this.$refs.reportform.validate()
          const { valid } = await this.$refs.reportform.validate()

          if (valid) {
            this.reportUser()
          } else {
            this.submitFailure = true;
          }
        },
        async reportUser(){
          console.log("reported " + this.reportReason);
          
          //post to userreports with user id and profile id

          if (this.reportReason.length != 0) {
            try {
              await axios.post('http://18.191.156.68:8000/api/dining/postreports/', {
                  reporter: this.curUser,
                  post: this.riskyPost,
                  reason: this.reportReason
              });
              this.showReport = false;
              this.reportSnackbar = true;
            } catch (error) {
              console.log(error)
            }
          }
        },
      async testUploadImage(url){
        console.log("urL: ",url);
        this.postImg = url;

        // console.log("before", this.files.length);
        // for(let i in this.files){
        //   console.log(this.files[i]);
        //   this.postImg = this.files[i].url;
        // }
        console.log("hm");
        console.log(this.files);
        console.log(this.postImg);
        //this.postImg = this.files[0]["url"];
        this.testfiles = [];
        if (this.postDesc.length != 0 && this.canUpload) {
          this.canUpload = false;
          try {
            if (this.diningHall != "-1") {
              await axios.post('http://18.191.156.68:8000/api/dining/posts/', {
                  post_user: this.curUser,
                  dining_hall: this.diningHall,
                  post_text: this.postDesc,
                  post_img: this.postImg
              });
            } else {
              await axios.post('http://18.191.156.68:8000/api/dining/posts/', {
                  post_user: this.curUser,
                  post_text: this.postDesc,
                  post_img: this.postImg
              });
            }
           
            
            this.getData();

            return this.testtext;
          } catch (error) {
            console.log(error)
            return this.testtext;
          }
        }
        return this.testtext;
        
      },
      
      async upvote(postID, index) {
          await axios.post('http://18.191.156.68:8000/api/dining/posts/' + postID + '/vote/', {
            user_id: localStorage.getItem('userID'),
            action: 'up'
          });
          if(this.reviews[index].hasDownvoted){
            this.reviews[index].vote_score += 2;
          } else if (this.reviews[index].noVote) {
            this.reviews[index].vote_score += 1;
          }
          this.reviews[index].hasDownvoted = false;
          this.reviews[index].hasUpvoted = true;
          this.reviews[index].noVote = false;
        },
        async downvote(postID, index) {
          await axios.post('http://18.191.156.68:8000/api/dining/posts/' + postID + '/vote/', {
            user_id: localStorage.getItem('userID'),
            action: 'down'
          });
          if(this.reviews[index].hasUpvoted){
            this.reviews[index].vote_score -= 2;
          } else if (this.reviews[index].noVote) {
            this.reviews[index].vote_score -= 1;
          }
          this.reviews[index].hasDownvoted = true;
          this.reviews[index].hasUpvoted = false;
          this.reviews[index].noVote = false;
          
        },
        async clearvote(postID, index) {
          await axios.delete(`http://18.191.156.68:8000/api/dining/posts/` + postID + '/vote/', {
            data: {user_id: localStorage.getItem('userID')}
          });
          if(this.reviews[index].hasDownvoted){
            this.reviews[index].vote_score += 1;
          } else if (this.reviews[index].hasUpvoted) {
            this.reviews[index].vote_score -= 1;
          }
          this.reviews[index].hasDownvoted = false;
          this.reviews[index].hasUpvoted = false;
          this.reviews[index].noVote = true;
        },
    onAddFiles() { //uses https://github.com/nickycdk/vue-cloudinary-demo/blob/master/src/App.vue
      console.log("yo");
      console.log(this.testfiles);
      this.files = [];
      if(this.testfiles.length > 0) {
          this.testfiles.forEach((file) => {
              console.log(file);
              this.uploadFileToCloudinary(file).then((fileResponse) => {
                  this.files.push(fileResponse);
                  console.log("uploaded", fileResponse);
                  this.testUploadImage(fileResponse.url);
              });
          });
      }
      // console.log(this.files);
      // console.log(this.files[0]);
      // console.log(this.files[0].url);
      // this.testUploadImage(this.files[0].url);
      
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
    goToSearch() {
      // console.log("hello?");
        // if(this.search){
        //   this.$router.push('/SearchResults/' + this.search);
        // } 
        this.reviews1 = []
        for(let i in this.reviews){
          if (this.reviews[i].dining_hall_name.replaceAll(" ","") == this.search.replaceAll(" ","")){
              this.reviews1.push(this.reviews[i]);
          }
        }

        this.showit = true;
    },
    switchToDining() {
      this.$router.push('/DiningVisitorPage');
    },
    makePost(){
      this.onAddFiles();
      this.canUpload = true;
      this.showPost = false;
      this.postSnackbar = true;
    },
    async validate () {
      const { valid } = await this.$refs.postform.validate()

      if (valid) {
        this.makePost()
      } else {
        this.submitFailure = true;
      }
    },
    },
    created() {
        this.$emit('showTop', true)
        this.$store.dispatch("setLayout", "baseDiningLayout");
        this.getData();
    },
    searchmyclass(){
      return Array.from(this.professor_list);
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
// div1{
//     display:inline;
// }
// html,body{
//   margin:0;
//   padding:0;
//   overflow-x:hidden;
// }
// body{
//   background-color:rgb(245,245,245);
// }
// img {
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   padding: 5px;
//   width: 50px;
// }
.text-center{
  text-align:center;
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
// table, th, td {
//   border: 1px solid black;
//   border-collapse: collapse;
//   font-size: 25px;
// }
.center {
  margin-left: auto;
  margin-right: auto;
}
</style>