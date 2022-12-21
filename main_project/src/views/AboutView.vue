<template>
  <div>
    <v-btn flat small>Normal</v-btn>
  </div>
  
  
    <v-icon>mdi-account</v-icon>
  

  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Dropdown
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in item"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>

  <div class="text-center">
    <div>
      <v-btn
        class="ma-2"
        color="primary"
        dark
      >
        Accept
        <v-icon
          dark
          right
        >
          mdi-checkbox-marked-circle
        </v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
        color="red"
        dark
      >
        Decline
        <v-icon
          dark
          right
        >
          mdi-cancel
        </v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
        dark
      >
        <v-icon
          dark
          left
        >
          mdi-minus-circle
        </v-icon>Cancel
      </v-btn>
    </div>

    <div>
      <v-btn
        class="ma-2"
        color="orange darken-2"
        dark
      >
        <v-icon
          dark
          left
        >
          mdi-arrow-left
        </v-icon>Back
      </v-btn>

      <v-btn
        class="ma-2"
        color="purple"
        dark
      >
        <v-icon dark>
          mdi-wrench
        </v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
        color="indigo"
        dark
      >
        <v-icon dark>
          mdi-cloud-upload
        </v-icon>
      </v-btn>
    </div>

    <div>
      <v-btn
        class="ma-2"
        text
        icon
        color="blue lighten-2"
      >
        <v-icon>mdi-thumb-up</v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
        text
        icon
        color="red lighten-2"
      >
        <v-icon>mdi-thumb-down</v-icon>
      </v-btn>
      
    </div>
  </div>


  <v-row justify="space-around">
    <v-menu
      v-for="([text, rounded], index) in btns"
      :key="text"
      :rounded="rounded"
      offset-y
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          :color="colors[index]"
          class="white--text ma-5"
          v-bind="attrs"
          v-on="on"
        >
          {{ text }} Radius
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item"
          link
        >
          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>

  <div class="text-center">
    <v-menu
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in item"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>

</template>

<script>
  export default {
    data: () => ({
      item: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      btns: [
        ['Removed', '0'],
        ['Large', 'lg'],
        ['Custom', 'b-xl'],
      ],
      colors: ['deep-purple accent-4', 'error', 'teal darken-1'],
      items: [...Array(4)].map((_, i) => `Item ${i}`),

    }),
  }
</script>