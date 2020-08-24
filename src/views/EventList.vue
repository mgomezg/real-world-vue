<template>
  <div>
    <h1>Event List</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link>|
    </template>
    <template v-if="eventsTotal > (this.page * 3)">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }">Next Page</router-link>
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";
// import EventService from "@/services/EventService.js";

export default {
  components: {
    EventCard
  },
  // data() {
  //   return {
  //     events: []
  //   };
  // },
  created() {
    // EventService.getEvents() // Does a get request
    //   .then(response => {
    //     this.events = response.data;
    //   })
    //   .catch(error => {
    //     console.log("There was an error:", error.response); // Logs out the error
    //   });
    this.$store.dispatch("fetchEvents", {
      perPage: 3,
      page: this.page
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState(["events", "eventsTotal"])
  }
};
</script>

<style></style>
