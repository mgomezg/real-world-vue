<template>
  <div>
    <h1>Event List for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link>|
    </template>
    <template v-if="hasNextPage">
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
    this.$store.dispatch("event/fetchEvents", {
      perPage: 3,
      page: this.page
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.event.eventsTotal > (this.page * 3);
    },
    ...mapState(["event", "eventsTotal", "user"])
  }
};
</script>

<style></style>
