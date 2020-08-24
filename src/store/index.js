import { createStore } from "vuex";
import EventService from "@/services/EventService.js";

export default createStore({
  state: {
    user: { id: "123", name: "Mila Gómez" },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
    count: 0,
    events: [],
    eventsTotal: 0,
    event: {},
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value;
    },
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENTS_TOTAL(state, value) {
      state.eventsTotal = value;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
  },
  actions: {
    updateCount({ state, commit }, incrementBy) {
      if (state.user) {
        commit("INCREMENT_COUNT", incrementBy);
      }
    },
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event.data);
      });
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          console.log("Total events are " + response.headers["x-total-count"]);
          commit("SET_EVENTS", response.data);
          commit("SET_EVENTS_TOTAL", response.headers["x-total-count"]);
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventById(id); // See if we already have this event

      if (event) {
        // If we do, set the event
        commit("SET_EVENT", event);
      } else {
        // If not, get it with the API.
        EventService.getEvent(id)
          .then((response) => {
            commit("SET_EVENT", response.data);
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
      }
    },
  },
  getters: {
    catLength: (state) => {
      return state.categories.length;
    },
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id);
    },
  },
});
