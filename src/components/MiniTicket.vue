<script>
  import axios from 'axios'
  export default {
    props: {
      ticketData: {
        type:Object,
        required: true
      },
      currentColumn: {
        type:Number,
        required:true
      }
    },
    computed: {
      getCurrentColumn() {
        const column = this.currentColumn == 1 ? 'todo' : (this.currentColumn == 2 ? 'inprogress' : (this.currentColumn == 3 ? 'testing' : (this.currentColumn == 3 ? 'completed' : '')))
        return column
      }
    },
    methods: {
      deleteTicket(){
        axios.delete(this.apiUrl + this.getCurrentColumn + '/' + this.ticketData.id, this.jsonConfigNoAuth)
        .then(response => {
          console.log(response.data)
          localStorage.clear()
          this.$emit('get-board-data')
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => this.loading = false)
      },
      fullTicket() {
        this.$router.push({ name: 'fullticket', params: { column: this.getCurrentColumn, id: this.ticketData.id } })
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
    <div class="d-flex justify-content-between">
      <div>
        <button class="btn btn-add-task btn-sm" @click="fullTicket()">
          view Full Ticket
        </button>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click="deleteTicket()">Delete This Ticket</button>
      </div>
    </div>
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
  .btn-add-task {
    background:#8400f7;
    color: #fff;
    font-weight: 600;
  }
</style>
