<template>
  <v-row no-gutters align="center" justify="center">
    <v-col cols="auto">
      <v-card min-width="400" class="rounded-lg px-6 py-4 boxshadow">
        <Snackbar v-model="snackbar" :text="message" />
        <v-card-title>
          <h2>Login</h2>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="isValid"
            lazy-validation
            @submit.prevent="submit"
          >
            <v-text-field
              v-model="user.name"
              :counter="16"
              :rules="nameRules"
              label="Username"
              required
            />
            <v-text-field
              v-model="user.room"
              :counter="16"
              :rules="roomRules"
              label="Room Name"
              required
            />
            <v-card-actions class="px-0">
              <v-btn
                :disabled="!isValid"
                color="primary"
                class="mt-6 rounded-xl"
                width="100%"
                height="42"
                type="submit"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import Snackbar from "@/components/Snackbar";

export default {
  name: "Home",
  layout: "login",
  components: {
    Snackbar,
  },
  data: () => ({
    isValid: false,
    user: {
      name: "",
      room: "",
      typingStatus: false,
    },
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 16) || "Name must be less than 16 characters",
    ],
    roomRules: [
      (v) => !!v || "Enter the room",
      (v) => (v && v.length <= 16) || "Room must be less than 16 characters",
    ],
    snackbar: false,
    messages: {
      noUser: "Enter your name and room",
      leftChat: "You leaved chat",
    },
  }),
  computed: {
    message() {
      const { message } = this.$route.query;
      return this.messages[message] || "";
    },
  },
  mounted() {
    this.snackbar = !!this.message;
  },

  methods: {
    ...mapActions(["createUser"]),
    submit() {
      if (this.$refs.form.validate()) {
        this.createUser(this.user);
        this.$router.push("/chat");
      }
    },
  },

  head: {
    title: "nuxt-chat-app",
  },
};
</script>

<style scoped>
.boxshadow {
  box-shadow: 0px 3px 40px 14px rgba(201, 201, 201, 0.8) !important;
}
</style>
