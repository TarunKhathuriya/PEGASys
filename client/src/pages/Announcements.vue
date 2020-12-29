<template>
  <div>
    <h4>this is announcement page</h4>
    <AddAnnouncement @submit="onAddAnnouncementSubmit" />
  </div>
</template>

<script>
 import AddAnnouncement from "../components/AddAnnouncement";
export default {
     components: { AddAnnouncement },
  name: "Announcement",
  data() {
    return {};
  },
  methods: {
    async Announcements() {},
    async onAddAnnouncementSubmit() {
      await this.Announcements();
    },
  },
};
</script>