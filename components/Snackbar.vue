<template>
  <v-snackbar :value="value" :timeout="3000" bottom text color="primary">
    <div class="snack">
      {{ text }}
      <v-btn fab x-small text @click="$emit('input', false)" color="primary">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.snack {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
