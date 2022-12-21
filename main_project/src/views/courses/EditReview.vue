<template>
  <v-app>
    <br>
    <div class="title">
      <span style="font-size: 30px; right:40%  ">Update Review</span>
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
              :counter="30"
              :rules="nameRules"
              label="Title"
              required
              disabled
            ></v-text-field>
            <div>
                <v-autocomplete
                  label="Course"
                  v-model="course"
                  :items="showCourses"
                  :rules="mandatoryRule"
                  item-title="name"
                  item-value="id"
                  @update:modelValue="courseChange"
                  required
                  disabled
                ></v-autocomplete>
                <div v-if="newCourse">
                  <label>Enter new Course Name</label>
                  <v-text-field
                    :rules="[
                      v => (!!v && this.newCourse) || 'Name is required'
                    ]"
                    clearable
                    label="Department"
                    v-model="newCourseName"
                  ></v-text-field>
              </div>
            </div>
            
            <div >
                <v-autocomplete
                  label="Department"
                  v-model="department"
                  :items="showDepartments"
                  :rules="mandatoryRule"
                  item-title="name"
                  item-value="id"
                  disabled
                  required
                  @update:modelValue="dptChange"
                ></v-autocomplete>
                <div v-if="newDpt">
                  <label>Enter new Department Name</label>
                  <v-text-field
                    :rules="[
                      v => (!!v && this.newDpt) || 'Name is required'
                    ]"
                    clearable
                    label="Department"
                    v-model="newDptName"
                  ></v-text-field>
                </div>
            </div>
            
            <div> 
              <v-autocomplete
                label="Professor"
                v-model="professor"
                :items="showProfessors"
                :rules="mandatoryRule"
                item-title="name"
                item-value="id"
                disabled
                required
                @update:modelValue="profChange"
              ></v-autocomplete>
              <div v-if="newProf">
                <label>Enter new Professor Name</label>
                <v-text-field
                  :rules="[
                    v => (!!v && this.newProf) || 'Name is required'
                  ]"
                  clearable
                  label="Department"
                  v-model="newProfName"
                ></v-text-field>
              </div>
            </div>
        
            <v-select
              label="Semester Taken"
              v-model="semester"
              :items="semesters"
              :rules="mandatoryRule"
              item-title="name"
              item-value="id"
              required
              disabled
            ></v-select>

            <v-select
              label="Class Year Taken"
              v-model="classWhenTaken"
              :items="[{'name': 'Freshman', 'id': 'FR'}, {'name': 'Sophomore', 'id': 'SO'}, {'name': 'Junior', 'id': 'JR'}, {'name': 'Senior', 'id': 'SR'}]"
              :rules="mandatoryRule"
              item-title="name"
              item-value="id"
              required
              disabled
            ></v-select>

            <p>Overall Rating:</p>
            <v-rating
              v-model="rating"
              empty-icon="mdi-circle-outline"
              full-icon="mdi-circle"
              half-icon="mdi-circle-half"
              size="72"
              color="deep-purple accent-2"
              hover
              :item-labels="['poor', '', '', '', 'excellent']"
            ></v-rating>

            <p>Difficulty:</p>
            <v-rating
              v-model="difficulty"
              empty-icon="mdi-circle-outline"
              full-icon="mdi-circle"
              half-icon="mdi-circle-half"
              size="72"
              color="deep-purple accent-2"
              hover
              :item-labels="['very easy', '', '', '', 'very hard']"
            ></v-rating>

            <p>Workload:</p>
            <v-rating
              v-model="workload"
              empty-icon="mdi-circle-outline"
              full-icon="mdi-circle"
              half-icon="mdi-circle-half"
              size="72"
              color="deep-purple accent-2"
              hover
              :item-labels="['light', '', '', '', 'heavy']"
            ></v-rating>
            
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-title>Optional</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-select
              label="Class Type"
              v-model="classType"
              :items="[{name: 'In-person', id: 'IP'}, {name: 'Remote', id: 'RM'}, {name: 'Hybrid', id: 'HY'}]"
              item-title="name"
              item-value="id"
            ></v-select>
            <v-select
              label="Time per Week"
              v-model="timePerWeek"
              :items="[{'name': '0-3 hours', 'id': '0'}, {'name': '3-6 hours', 'id': '1'}, {'name': '6-9 hours', 'id': '2'}, {'name': '10+ hours', 'id': '3'}]"
              item-title="name"
              item-value="id"
            ></v-select>
            <v-select
              label="Class Size"
              v-model="classSize"
              :items="[{'name': '0-10 people', 'id': '0'}, {'name': '11-40 people', 'id': '1'}, {'name': '41-100 people', 'id': '2'}, {'name': '100+ people', 'id': '3'}]"
              item-title="name"
              item-value="id"
            ></v-select>
            <v-select
              label="Instruction Style"
              v-model="instructStyle"
              :items="[{'name': 'Lecture', 'id': 'LEC'}, {'name': 'Lab', 'id': 'LAB'}, {'name': 'Discussion', 'id': 'DIS'}, {'name': 'Other', 'id': 'OTH'}]"
              item-title="name"
              item-value="id"
            ></v-select>
          
            <p>Professor Helpfulness:</p>
            <v-rating
              v-model="helpfulness"
              empty-icon="mdi-circle-outline"
              full-icon="mdi-circle"
              half-icon="mdi-circle-half"
              size="72"
              color="deep-purple accent-2"
              hover
              :item-labels="['unhelpful', '', '', '', 'supportive']"
            ></v-rating>
            <p>Professor Friendliness:</p>
            <v-rating
              v-model="friendliness"
              empty-icon="mdi-circle-outline"
              full-icon="mdi-circle"
              half-icon="mdi-circle-half"
              size="72"
              color="deep-purple accent-2"
              hover
              :item-labels="['apathetic', '', '', '', 'amicable']"
            ></v-rating>
            <p>Material Engagement:</p>
            <v-rating
              v-model="materialE"
              empty-icon="mdi-circle-outline"
              full-icon="mdi-circle"
              half-icon="mdi-circle-half"
              size="72"
              color="deep-purple accent-2"
              hover
              :item-labels="['boring', '', '', '', 'interesting']"
            ></v-rating>

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

    <v-btn class="ma-5" @click="validate">
      Update Review
    </v-btn>
      
    
  </v-form>

  
  </v-app>
  </template>


<script>
import axios from "axios";

export default{
   name:'EditReview',

   data(){
      return {
       review: [],
       panel: [0],
       search: 'search your class',
       title: '',
       professor: '',
       className: 'Class Title',
       course: '',
       semester: '',
       department: '',
       rating: '',
       workload: '',
       difficulty: '',
       classWhenTaken: '',
       classType: '',
       timePerWeek: '',
       classSize: '',
       instructStyle: '',
       helpfulness: '',
       friendliness: '',
       materialE: '',
       reviewComment: '',

       semesters: [
            {id: 'FL2022', name: "Fall 2022"},
            {id: 'SP2022', name: "Spring 2022"},
            {id: 'FL2021', name: "Fall 2021"},
            {id: 'SP2021', name: "Spring 2021"},
            {id: 'FL2020', name: "Fall 2020"},
            {id: 'SP2020', name: "Spring 2020"},
          ],

       verified:'true',
       
       curVerified: localStorage.getItem('loggedIn'),
       curUsername: localStorage.getItem('username'),
       curSchool: localStorage.getItem("schoolName"),
       curUser: localStorage.getItem("userID"),
       curAdmin: localStorage.getItem("isAdmin") === 'true',
       nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 30 characters',
       ],
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
             const res = await axios.get(`http://18.191.156.68:8000/api/reviews/` + this.$route.params.reviewId + '/');
             this.review = res.data;

             this.title = this.review.title;
             this.professor = this.review.professor_name
             this.course = this.review.course_name
             this.department = this.review.department_name
             this.semester = this.review.semester
             this.rating = this.review.rating

             this.difficulty = this.review.difficulty
             this.workload = this.review.workload
             this.classWhenTaken = this.review.class_year_taken
             this.classType = this.review.class_type
             this.timePerWeek = this.review.time_per_week
             this.classSize = this.review.class_size
             this.instructStyle = this.review.instruction_style
             this.helpfulness = this.review.professor_helpfulness
             this.friendliness = this.review.professor_friendliness
             this.materialE = this.review.material_engagement
             this.reviewComment = this.review.review_text
            
             
         } catch (error) {
             // log the error
             console.log(error);
         }
     },
     async addReview(){
         try {
             var dict = {
                 class_year_taken: this.classWhenTaken,
                 difficulty: parseInt(this.difficulty),
                 workload: parseInt(this.workload),
                 class_type: this.classType,
                 time_per_week: this.timePerWeek,
                 professor_helpfulness: parseInt(this.helpfulness),
                 professor_friendliness: parseInt(this.friendliness),
                 material_engagement: parseInt(this.materialE),
                 class_size: this.classSize,
                 instruction_style: this.instructStyle,
                 review_text: this.reviewComment
             };
             
             await axios.patch('http://18.191.156.68:8000/api/reviews/' + this.$route.params.reviewId + '/', dict);
             window.alert("Review Updated");
             
             this.$router.push("/ReView/" + this.$route.params.reviewId);



             
             //this.$alert("Hello Vue Simple Alert.");
             // Append the returned data to the tasks array
             //console.log("pushing " + response.data);
             //this.comments.push(response.data);
             // Reset the title and description field values.
         } catch (error) {
             // Log the error
             console.log(error);
             window.alert("Unable to update review");
         }
     },
     dptChange(event) {
         if(event.target.value == "-1"){
           this.newDpt = true;
         } else {
           this.newDpt = false;
         }
     },
     profChange(event) {
         if(event.target.value == "-1"){
           this.newProf = true;
         } else {
           this.newProf = false;
         }
     },
     courseChange(event) {
         if(event.target.value == "-1"){
           this.newCourse = true;
         } else {
           this.newCourse = false;
         }
     }
     },
     async created() {
         // Fetch tasks on page load
         document.title = "Edit Review";
        if(localStorage.getItem('loggedIn')){
          await this.getData();
          if (this.review.is_active == false){
            this.$router.push("/VisitorPage");
          }
        } else {
            this.$router.push("/VisitorPage");
        }
         
     }
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