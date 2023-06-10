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
      if (error) {
        this.ticketNotFound = true
      }
    })
    .finally(() => this.loading = false)
  },
  methods: {
    deleteTicket(){
      axios.delete(this.apiUrl + this.routeColumn + '/' + this.routeId, this.jsonConfigNoAuth)
      .then(() => {
        localStorage.clear()
        this.$emit('get-board-data')
      })
      .catch(error => {
        if (error) {
          this.$toast.error('Network Error, Please make sure JSON Server is setup and running properly', {position: 'top-right'})
        }
      })
      .finally(() => this.loading = false)
    },
    fullTicket() {
      this.$router.push({ name: 'fullticket', params: { column: this.getCurrentColumn, id: this.ticketData.id } })
    },
    backToBoards(){
      this.$router.push('/')
      this.$emit('get-board-data')
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
    <button type="button" class="btn btn-actions" @click="backToBoards">Back To Board</button>
  </div>
  <div v-else>
    <div v-if="fullTicketData">
      <div class="shadow p-3">
          <div class="row">
            <div class="col-md-8">
              <h5>Ticket Title: {{ fullTicketData.title }}</h5>
              <p>
                Ticket Description: {{ fullTicketData.fullDescription }}
              </p>
              <p>
                Ticket Type/Category: {{ fullTicketData.ticketType }}
              </p>
            </div>
            <div class="col-md-4">
              <div class="d-grid">
                <button class="mb-3 btn btn-add-task">Copy This Ticket Link</button>
                <button class="btn btn-outline-danger mb-3">Delete This Ticket</button>
                <button type="button" class="btn btn-actions" @click="backToBoards">Back To Board</button>
              </div>
            </div>
          </div>
      </div>
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
