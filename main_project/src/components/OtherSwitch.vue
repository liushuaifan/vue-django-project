<template>
    <div class="pa-4 ma-4">
        <v-select :items="layouts" label="Select a layout" v-model="selectedLayout" @update:modelValue="test1"></v-select>
        <v-btn @click="changeLayout">Change</v-btn>

        <v-autocomplete
            label="Autocomplete"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            v-model="autocomplete_text"
            @update:search="test2"
            @keydown="test3"
        ></v-autocomplete>
    </div>
 </template>
 
 <script>
 export default {
   data: () => ({
       layouts: ['baseLayout', 'constrainedLayout'],
       selectedLayout: "",
       autocomplete_text: "",
   }),
   methods: {
        changeLayout(){
            console.log(this.selectedLayout);
            this.$store.dispatch("setLayout", this.selectedLayout.length == 0 ? this.layouts[0] : this.selectedLayout);
       },
       test1(){
        console.log("testing");
       },
       test2(event){
        this.autocomplete_text = event;
        console.log("testing2", this.autocomplete_text);
       },
       test3(event){
        console.log("testing3", event);
       }
   }
 };
 </script>