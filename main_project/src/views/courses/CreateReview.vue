<template>
  <v-app>
    <br>
    <div class="title">
      <span style="font-size: 30px; right:40%  ">Create Course Review</span>
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
              :rules="nameRules"
              :counter="30"
              label="Title"
              required
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
                ></v-autocomplete>
                <div v-if="newCourse">
                  <label>Enter new Course Name</label>
                  <v-text-field
                    :rules="[
                      v => (!!v && this.newCourse) || 'Name is required'
                    ]"
                    clearable
                    label="Course"
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
                  :disabled="disableDpt"
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
                :disabled="disableProf"
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
                  label="Professor"
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
            ></v-select>

            <v-select
              label="Class Year Taken"
              v-model="classWhenTaken"
              :items="[{'name': 'Freshman', 'id': 'FR'}, {'name': 'Sophomore', 'id': 'SO'}, {'name': 'Junior', 'id': 'JR'}, {'name': 'Senior', 'id': 'SR'}]"
              :rules="mandatoryRule"
              item-title="name"
              item-value="id"
              required
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
              :items="[{'name': '0-3 hours', 'id': 0}, {'name': '3-6 hours', 'id': 1}, {'name': '6-9 hours', 'id': 2}, {'name': '10+ hours', 'id': 3}]"
              item-title="name"
              item-value="id"
            ></v-select>
            <v-select
              label="Class Size"
              v-model="classSize"
              :items="[{'name': '0-10 people', 'id': 0}, {'name': '11-40 people', 'id': 1}, {'name': '41-100 people', 'id': 2}, {'name': '100+ people', 'id': 3}]"
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
      Create Review
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
          author: 'test user',
          
          title: '',
          professor: '',
          course: '',
          semester: '',
          department: '',
          rating: 3,
          workload: 3,
          difficulty: 3,
          classWhenTaken: '',
          classType: '',
          timePerWeek: '',
          classSize: '',
          instructStyle: '',
          helpfulness: '',
          friendliness: '',
          materialE: '',
          newDptName: '',
          newProfName: '',
          newCourseName: '',
          
          disableDpt: true,
          disableProf: true,

          newDpt: false,
          newProf: false,
          newCourse: false,
          
          reviewComment: '',

         
          existingProfessors: [],
          existingDepartments: [],
          existingCourses: [],
          showProfessors: [],
          nonCourseProfs: [],
          showDepartments: [],
          showCourses: [],
          semesters: [
            {id: 'FL2022', name: "Fall 2022"},
            {id: 'SP2022', name: "Spring 2022"},
            {id: 'FL2021', name: "Fall 2021"},
            {id: 'SP2021', name: "Spring 2021"},
            {id: 'FL2020', name: "Fall 2020"},
            {id: 'SP2020', name: "Spring 2020"},
          ],
          
          curVerified: localStorage.getItem('loggedIn'),
          curUsername: localStorage.getItem('username'),
          curSchool: localStorage.getItem("schoolName"),
          curUser: localStorage.getItem("userID"),
          curAdmin: localStorage.getItem("isAdmin") === 'true',
          nameRules: [
            v => !!v || 'Title is required',
          ],
          mandatoryRule: [v => !!v || 'Field is required'],
          submitSuccess: false,
          submitFailure: false,
         }
      },
      methods: {
        async validate () {
          const { valid } = await this.$refs.form.validate()
          if (valid) {
            await this.addReview()
            this.$refs.form.reset()
          } else {
            this.submitFailure = true;
            this.submitSuccess = false;
          }
        },
        async getData() {
            try {
                // fetch tasks
                const resProfs = await axios.get(`http://18.191.156.68:8000/api/professors/?school=` + localStorage.getItem('schoolID') );
                this.existingProfessors = resProfs.data;
                this.existingProfessors.push({id: -1, name: "Other"});
                const resDeps = await axios.get(`http://18.191.156.68:8000/api/departments/?school=` + localStorage.getItem('schoolID') );
                this.existingDepartments = resDeps.data;
                this.existingDepartments.push({id: -1, name: "Other"});
                const resCors = await axios.get(`http://18.191.156.68:8000/api/courses/?school=` + localStorage.getItem('schoolID') );
                this.existingCourses = resCors.data;
                this.existingCourses.push({id: -1, name: "Other"});
                
                this.showProfessors = this.existingProfessors;
                this.showDepartments = this.existingDepartments;
                this.showCourses = this.existingCourses;
            } catch (error) {
                // log the error
                console.log(error);
            }
        },
        async addReview(){
            try {
                // Send a POST request to the API
                var am_active = true;
                var dict = {
                    poster: localStorage.getItem('userID'),
                    title: this.title,
                    class_year_taken: this.classWhenTaken,
                    rating: parseInt(this.rating),
                    semester: this.semester,
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
                
                if(this.newDpt){
                  am_active = false;
                } else {
                  dict["department"] = this.department;
                }
                if(this.newProf){
                  am_active = false;
                } else {
                  dict["professor"] = this.professor;
                }
                if(this.newCourse){
                  am_active = false;
                } else {
                  dict["course"] = this.course;
                }
                dict["is_active"] = am_active;
                //console.log(this.newDpt);
                //console.log("dict: ", dict);
               
                const response = await axios.post('http://18.191.156.68:8000/api/reviews/', dict);
                console.log(response.data);
                //window.alert("Review Created");
                if(!am_active){
                  await axios.post('http://18.191.156.68:8000/api/reviewrequests/', {
                    course: this.newCourseName,
                    department: this.newDptName,
                    professor: this.newProfName,
                    review: response.data.id
                  });
                } else if (this.nonCourseProfs.filter(prof =>  prof.id == this.professor).length != 0){ //adds old prof to old course
                  await axios.patch('http://18.191.156.68:8000/api/courses/' + this.course + '/', {
                    professors: this.professor,
                  });
                }



                this.submitFailure = false;
                this.submitSuccess = true;
                console.log("resetting");
                //this.$refs.form.reset()
                this.rating = 3;
                this.workload = 3;
                this.difficulty = 3;
                this.helpfulness = '';
                this.friendliness = '';
                this.materialE = '';

                this.newDptName = '';
                this.newProfName = '';
                this.newCourseName = '';
          
                this.disableDpt = true;
                this.disableProf = true;

                this.newDpt = false;
                this.newProf = false;
                this.newCourse = false;
          
                
                //this.$router.push("/VisitorPage");
                
                //this.$alert("Hello Vue Simple Alert.");
                // Append the returned data to the tasks array
                //console.log("pushing " + response.data);
                //this.comments.push(response.data);
                // Reset the title and description field values.
            } catch (error) {
                // Log the error
                console.log(error);
                // window.alert("Unable to create review");
                this.submitFailure = true;
                this.submitSuccess = false;
            }
        },
        dptChange() {
          this.professor = '';
            if(this.department == "-1"){
              this.newDpt = true;
              this.showProfessors = this.existingProfessors;
            } else if(this.department && this.course && this.department != "-1" && this.course != "-1"){
              const temp = this.existingCourses.find(crs => this.course == crs.id);
              this.showProfessors = this.existingProfessors.filter(prof =>  prof.courses && prof.courses.includes(this.course));
              this.nonCourseProfs = this.existingProfessors.filter(prof => (prof.departments && prof.departments.includes(temp.department)) && (prof.courses && !prof.courses.includes(this.course)));
              this.showProfessors.concat(this.nonCourseProfs);
              this.showProfessors.push({id: -1, name: "Other"});
              this.newDpt = false;
            } else if(this.department) {
              this.showProfessors = this.existingProfessors.filter(prof =>  prof.departments && prof.departments.includes(this.department));
              this.showProfessors.push({id: -1, name: "Other"});
              this.newDpt = false;
            } else if(this.course && this.course != "-1") {
              // const temp = this.existingCourses.find(crs => this.course == crs.id);
              this.showProfessors = this.existingProfessors.filter(prof =>  prof.courses && prof.courses.includes(this.course));
              this.showProfessors.push({id: -1, name: "Other"});
              this.newDpt = false;
            }
            if(this.department && this.course){
              this.disableProf = false;
            } else {
              this.disableProf = true;
              this.newDpt = false;
            }
        },
        profChange() {
            if(this.professor == "-1"){
              this.newProf = true;
            } else {
              this.newProf = false;
            }
        },
        courseChange() {
          this.department = '';
          this.professor = '';
          this.disableProf = true;
            if(this.course == "-1"){
              this.newCourse = true;
              this.showDepartments = this.existingDepartments;
              this.showProfessors = this.existingProfessors;
            } else if (this.course) {
              const temp = this.existingCourses.find(crs => this.course == crs.id);
              this.showDepartments = this.existingDepartments.filter(dpt => temp.department == dpt.id);
              this.newCourse = false;
            }
            if(this.course){
              this.disableDpt = false;
            } else {
              this.newCourse = false;
              this.disableDpt = true;
              this.disableProf = true;
            }
            
        }
        },
        created() {
          this.$emit('showTop', true)
          this.$store.dispatch("setLayout", "baseLayout");
          document.title = "Create Review";
            // Fetch tasks on page load
            if(localStorage.getItem('loggedIn') && localStorage.getItem('isActive') === "true"){
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