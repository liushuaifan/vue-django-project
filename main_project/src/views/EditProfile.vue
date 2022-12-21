<template>
    <br>
    <br>
    <div class="title">
    <span style="margin 0 auto">Profile</span>
    <!-- <button style="margin-left: 300px;">Report</button> -->
    </div>
    <div class="box">
    <v-form 
      @submit.prevent="submitForm"
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="curUsername"
        label="Username"
        disabled
      ></v-text-field>
      <v-autocomplete
        label="University"
        v-model="university"
        :items="universities"
        :rules="mandatoryRule"
        item-title="name"
        item-value="id"
        @update:modelValue="uniChange"
        required
      ></v-autocomplete>
      <div v-if="newUni">
        <label>Enter new University Name</label>
        <v-text-field
            :rules="[
            v => (!!v && this.newUni) || 'Name is required'
            ]"
            clearable
            label="New University"
            v-model="newUniName"
        ></v-text-field>
      </div>
      <v-text-field 
          v-model="AreaOfStudy"
          :rules="mandatoryRule"
          label="Area of Study"
          required
      ></v-text-field>
      <v-btn class="justify-center" @click="submitProfile" type="submit">Submit Updates</v-btn>
      <v-btn class="justify-center ma-5" @click="goProfile" type="submit">Back to Profile</v-btn>
    </v-form>
    </div>
  
</template>


<script>
import axios from "axios";
  export default{
      name:'EditProfile',
      data(){
         console.log("id: " + this.$route.params.userId );
         return {
          review: [],
          profile: [],
          universities: [],
          university: "",
          newUni: false,
          newUniName: "",
          AreaOfStudy: "",
          username: localStorage.getItem("username"),
          curVerified: localStorage.getItem('loggedIn'),
          curUsername: localStorage.getItem('username'),
          curSchool: localStorage.getItem("schoolName"),
          curUser: localStorage.getItem("userID"),
          curAdmin: localStorage.getItem("isAdmin") === 'true',
          profileID: localStorage.getItem("profileID"),
          mandatoryRule: [v => !!v || 'Field is required'],
         }
      },
      methods: {
        async getData() {
            try {
                // fetch tasks
                const userProfile = await axios.get(`http://18.191.156.68:8000/api/profiles/?id=` + this.$route.params.userId);
                this.profile = userProfile.data[0];
                this.university = this.profile.school;
                this.AreaOfStudy = this.profile.areaOfStudy;

                const res = await axios.get(`http://18.191.156.68:8000/api/schools/`);
                this.universities = res.data;
                this.universities.push({id: "-1", name: "Other"});
            } catch (error) {
                // log the error
                console.log(error);
            }
        },
        async submitProfile(){
          var isActive = true;
          if (this.newUni) {
              this.university = "1";
              isActive = false;
              await axios.post('http://18.191.156.68:8000/api/schoolrequests/', {
                  school: this.newUniName,
                  requester: this.curUser
              });
          }
          await axios.patch('http://18.191.156.68:8000/api/profiles/' + this.curUser + '/', {
              school: parseInt(this.university),
              areaOfStudy: this.AreaOfStudy,
              isActive: isActive
          });
          localStorage.setItem('isActive', isActive)
          localStorage.setItem('schoolID', this.university);
          localStorage.setItem('schoolName', this.universities[this.university - 1].name);
          this.$router.push('/ProfilE/' + this.$route.params.userId);
        },
        uniChange() {
          if(this.university == "-1"){
            this.newUni = true;
          } else {
            this.newUni = false;
          }
        },
        goProfile() {
          this.$router.push('/ProfilE/' + this.$route.params.userId);
        }},
        created() {
          this.$emit('showTop', true)
          if (localStorage.getItem("reviewType") == 'dining'){
            this.$store.dispatch("setLayout", "baseDiningLayout");
          } else  if (localStorage.getItem("reviewType") == 'course') {
            this.$store.dispatch("setLayout", "baseLayout");
          } else {
            this.$store.dispatch("setLayout", "baseClubLayout");
          }
          document.title = "Edit Profile"
          // Fetch tasks on page load
          if(localStorage.getItem('loggedIn') && localStorage.getItem('userID') == this.$route.params.userId){
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
  /* text-align: left; */
  border-style: solid;
  border-width: 3px;
  border-bottom-color: #000;
  padding: 10px;
}

</style>