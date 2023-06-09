<script>
  export default {
    props: {
      ticketData: {
        type:Object,
        required: true
      }
    }
  }
</script>
<template>
  <div class="ticket-data shadow mb-3 p-3">
    <h5>{{ ticketData.title }}</h5>
    <p>
      {{ ticketData.shortDescription }}
    </p>
  </div>
</template>
<style scoped>
  .ticket-data{
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
  }
  h5 {
    font-size: 17px;
    margin-bottom: 30px;
  }
  p {
    font-size: 15px;
    color: #808CA4;
  }
</style>
