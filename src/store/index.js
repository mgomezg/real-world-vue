import { createStore } from "vuex";
import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'
import * as notification from '@/store/modules/notification.js'

export default createStore({
  modules: {
    user,
    event,
    notification
  },
  state: {
    // user: { id: "123", name: "Mila Gómez" },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
    // count: 0,
    // events: [],
    // eventsTotal: 0,
    // event: {},
  }
});
