<script>
  import axios from 'axios'
  export default {
    props: {
      routeColumn: {
        type:String,
        required: true
      },
      routeId: {
        required:true
      }
    },
    data(){
        return{
            fullTicketData: null,
            ticketNotFound: false
        }
    },
    mounted () {
        axios.get(this.apiUrl + this.routeColumn + '/' + this.routeId, this.jsonConfigNoAuth)
        .then(response => {
            this.fullTicketData = response.data
        })
        .catch(error => {
            console.log(error)
            this.ticketNotFound = true
        })
        .finally(() => this.loading = false)
    },
    methods: {
      deleteTicket(){
        axios.delete(this.apiUrl + this.getCurrentColumn + '/' + this.ticketData.id, this.jsonConfigNoAuth)
        .then(response => {
          console.log(response.data)
          localStorage.clear()
          // this.getBoardData()
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
  <div class="mb-3 p-3">
    <div v-if="ticketNotFound">
        <div class="alert alert-danger">
            Sorry Ticket Not Found
        </div>
        <RouterLink to="/" class="btn btn-actions">Back To Board</RouterLink>
    </div>
    <div v-else>
        <div v-if="fullTicketData">
            <h5>{{ fullTicketData.title }}</h5>
            <p>
            {{ fullTicketData.shortDescription }}
            </p>
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
  .btn-actions {
    background:transparent;
    color: #8400f7;
    border: 1px solid #8400f7;
    font-weight: 600;
  }
</style>
