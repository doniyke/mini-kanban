<script>
import MiniTicket from '../components/MiniTicket.vue'
import FullTicket from '../components/FullTicket.vue'
import PageLoader from '../components/PageLoader.vue'
import draggable from 'vuedraggable';
import axios from 'axios'
export default {
  order: 1,
  components: {
    MiniTicket,
    FullTicket,
    PageLoader,
    draggable
  },
  data () {
    return {
      routeColumn: this.$route.params.column,
      routeId: this.$route.params.id,
      mobileMenu : false,
      loading: false,
      todoData : [],
      progressData: [],
      testingData: [],
      completedData: [],
      currentBoard: 1,
      boards: [],
      currentBoardTitle: '',
      newBoardErrorText: '',
      newBoardError: false,
      pageLoading: true,
      dataLoading: false
    }
  },
  mounted () {
    this.pageLoading = true
    this.$watch('$route.path', () => {
      if (this.$route.params.column && this.$route.params.id){
        this.routeColumn = this.$route.params.column
        this.routeId = this.$route.params.id
        this.pageLoading = false
      } else {
        this.routeColumn = null,
        this.routeId = null
        this.pageLoading = false
      }
    })

    localStorage.clear()
    const localBoardsData = JSON.parse(localStorage.getItem('3dMIniKabanBoardData'))

    if (localBoardsData && localBoardsData !== null) {
      this.boards = localBoardsData
      this.pageLoading = false
    }else {
      this.getBoardData()
      this.pageLoading = false
    }
    this.pageLoading = false
    // this.getAllTasks()

  },
  methods: {
    dataChange (event, col) {
      if (event.added) {
        const CurrentData = event.added.element
        const column = col
        if (column == 1) {
          localStorage.setItem('3dMIniKabanTodoData', JSON.stringify(this.todoData))
          this.addTaskToApi(CurrentData, column)
        }
        if (column == 2) {
          localStorage.setItem('3dMIniKabanProgressData', JSON.stringify(this.progressData))
          this.addTaskToApi(CurrentData, column)
        }
        if (column == 3) {
          localStorage.setItem('3dMIniKabanTestingData', JSON.stringify(this.testingData))
          this.addTaskToApi(CurrentData, column)
        }
        if (column == 4) {
          localStorage.setItem('3dMIniKabanCompletedData', JSON.stringify(this.completedData))
          this.addTaskToApi(CurrentData, column)
        } 
      }
      if (event.removed) {
        const CurrentData = event.removed.element
        const column = col
        if (column == 1) {
          localStorage.setItem('3dMIniKabanTodoData', JSON.stringify(this.todoData))
          this.deleteTaskFromApi (CurrentData, column)
        }
        if (column == 2) {
          localStorage.setItem('3dMIniKabanProgressData', JSON.stringify(this.progressData))
          this.deleteTaskFromApi (CurrentData, column)
        }
        if (column == 3) {
          localStorage.setItem('3dMIniKabanTestingData', JSON.stringify(this.testingData))
          this.deleteTaskFromApi (CurrentData, column)
        }
        if (column == 4) {
          localStorage.setItem('3dMIniKabanCompletedData', JSON.stringify(this.completedData))
          this.deleteTaskFromApi (CurrentData, column)
        }
      }
    },
    deleteTaskFromApi (task, column) {
      const dbcolumn = column == 1 ? 'todo' : (column == 2 ? 'inprogress' : (column == 3 ? 'testing' : (column == 4 ? 'completed' : '')))
      const taskId = task.id
      axios.delete(this.apiUrl + dbcolumn + '/' + taskId, this.jsonConfigNoAuth)
      .catch(error => {
        if (error) {
          this.$toast.error('Network Error, Please make sure JSON Server is setup and running properly', {position: 'top-right'})
        }
      })
      .finally(() => this.loading = false)

    },
    addTaskToApi (task, column) {
      const dbcolumn = column == 1 ? 'todo' : (column == 2 ? 'inprogress' : (column == 3 ? 'testing' : (column == 4 ? 'completed' : '')))
      axios.post(this.apiUrl + dbcolumn, task, this.jsonConfigNoAuth)
      .catch(error => {
        if (error) {
          this.$toast.error('Network Error, Please make sure JSON Server is setup and running properly', {position: 'top-right'})
        }
      })
      .finally(() => this.loading = false)

    },
    changeBoard(id, title) {
      this.routeColumn = null,
      this.routeId = null
      this.$router.push('/')
      localStorage.clear()
      this.currentBoard = id
      this.currentBoardTitle = title
      this.getAllTasks()
    },
    getAllTasks () {
      this.dataLoading = true
      const localTodoData = JSON.parse(localStorage.getItem('3dMIniKabanTodoData'))
      const localProgressData = JSON.parse(localStorage.getItem('3dMIniKabanProgressData'))
      const localTestingData = JSON.parse(localStorage.getItem('3dMIniKabanTestingData'))
      const localCompletedData = JSON.parse(localStorage.getItem('3dMIniKabanCompletedData'))
      if (localTodoData && localTodoData !== null) {
        this.todoData = localTodoData
        this.dataLoading = false
      }else {
        axios.get(this.apiUrl + 'todo?board='+ this.currentBoard, this.jsonConfigNoAuth)
        .then(response => {
          localStorage.setItem('3dMIniKabanTodoData', JSON.stringify(response.data))
          this.todoData = response.data
          this.dataLoading = false
        })
        .catch(error => {
          if (error) {
            this.$toast.error('Network Error, Please make sure JSON Server is setup and running properly', {position: 'top-right'})
          }
          this.dataLoading = false
        })
        .finally(() => this.dataLoading = false)
      }

      if (localProgressData && localProgressData !== null) {
        this.progressData = localProgressData
      }else {
        axios.get(this.apiUrl + 'inprogress?board='+ this.currentBoard, this.jsonConfigNoAuth)
        .then(response => {
          localStorage.setItem('3dMIniKabanProgressData', JSON.stringify(response.data))
          this.progressData = response.data
        })
        .catch(error => {
          if (error) {
            this.$toast.error('Network Error, Please make sure JSON Server is setup and running properly.', {position: 'top-right'})
          }
        })
        .finally(() => this.dataLoading = false)
      }

      if (localTestingData && localTestingData !== null) {
        this.testingData = localTestingData
      }else {
        axios.get(this.apiUrl + 'testing?board='+ this.currentBoard, this.jsonConfigNoAuth)
        .then(response => {
          localStorage.setItem('3dMIniKabanTestingData', JSON.stringify(response.data))
          this.testingData = response.data
        })
        .catch(error => {
          if (error) {
            this.$toast.error('Network Error, Please make sure JSON Server is setup and running properly', {position: 'top-right'})
          }
        })
        .finally(() => this.dataLoading = false)
      }

      if (localCompletedData && localCompletedData !== null) {
        this.completedData = localCompletedData
      }else {
        axios.get(this.apiUrl + 'completed?board='+ this.currentBoard, this.jsonConfigNoAuth)
        .then(response => {
          localStorage.setItem('3dMIniKabanCompletedData', JSON.stringify(response.data))
          this.completedData = response.data
        })
        .catch(error => {
          if (error) {
            this.$toast.error('Network Error, Please make sure JSON Server is setup and running properly.', {position: 'top-right'})
          }
        })
        .finally(() => this.dataLoading = false)
      }
    },
    getBoardData() {
      this.dataLoading = true
      localStorage.clear()
      axios.get(this.apiUrl + 'boards', this.jsonConfigNoAuth)
      .then(response => {
        localStorage.setItem('3dMIniKabanBoardData', JSON.stringify(response.data))
        this.boards = response.data
        this.dataLoading = false
        if (this.boards.length > 0) {
          this.currentBoard = this.boards[0].id
          this.currentBoardTitle = this.boards[0].title
          this.dataLoading = false
        } else {
          this.currentBoard = null
          this.currentBoardTitle = null
          this.dataLoading = false
        }
        this.getAllTasks()
        this.dataLoading = false
      })
      .catch(error => {
        if (error) {
          this.$toast.error('Network Error, Please make sure JSON Server is setup and running properly. Please refer to the README.md file for full setup information', {position: 'top', duration: false})
          setTimeout(this.$toast.clear, 3000)
        }
        this.dataLoading = false
      })
      .finally(() => this.dataLoading = false)
    },
    addNewBoard() {
      this.loading = true
      this.newBoardError = false
      const title = this.$refs.boardTitle.value
      if (title == '' || title == null) {
        this.newBoardErrorText = 'Please enter board title'
        this.newBoardError = true
        this.loading = false
      } else {
        const boardData = {
          'id': Date.now(),
          'title' : title
        }
        axios.post(this.apiUrl + 'boards', boardData, this.jsonConfigNoAuth)
        .then(() => {
          this.getBoardData()
          this.$refs.boardTitle.value = ''
          this.$refs.modalBoardClose.click()
          this.$toast.success('Board Created Successfully', {position: 'top'});
          this.loading = false
        })
        .catch(error => {
          if (error) {
            this.newBoardErrorText = 'Network Error, Please make sure JSON Server is setup and running properly'
            this.newBoardError = true
            this.$toast.error('Network Error, Please make sure JSON Server is setup and running properly', {position: 'top-right'})
            this.loading = false
          }
        })
        .finally(() => this.loading = false)
      }
      
    },
    addNewTicket(){
      this.loading = true
      this.newBoardError = false
      const title = this.$refs.ticketTitle.value
      const ticketDescription = this.$refs.ticketDescription.value
      const shortDescription = ticketDescription.length > 50 ? ticketDescription.substring(0,50) : ticketDescription
      const fullDescription = this.$refs.ticketDescription.value
      const ticketType = this.$refs.ticketType.value
      if (title == '' || title == null || ticketDescription == '' || ticketDescription == null) {
        this.newBoardErrorText = 'Please fill all fields'
        this.newBoardError = true
        this.loading = false
      } else {
        const ticketData = {
          'id': Date.now(),
          'title' : title,
          'shortDescription' : shortDescription,
          'fullDescription' : fullDescription,
          'board' : this.currentBoard,
          'ticketType' : ticketType
        }
        axios.post(this.apiUrl + 'todo', ticketData, this.jsonConfigNoAuth)
        .then(() => {
          this.getAllTasks()
          this.$refs.ticketTitle.value = ''
          this.$refs.ticketDescription.value = ''
          this.todoData.push(ticketData)
          localStorage.setItem('3dMIniKabanTodoData', JSON.stringify(this.todoData))
          this.$refs.modalTicketClose.click()
          this.loading = false
        })
        .catch(error => {
          if (error) {
            this.$toast.error('Network Error, Please make sure JSON Server is setup and running properly', {position: 'top-right'})
          }
          this.loading = false
        })
        .finally(() => this.loading = false)
      }
    },
    deleteBoard(){
      axios.delete(this.apiUrl + 'boards/' + this.currentBoard, this.jsonConfigNoAuth)
      .then(() => {
        localStorage.clear()
        this.getBoardData()
      })
      .catch(error => {
        if (error) {
          this.$toast.error('Network Error, Please make sure JSON Server is setup and running properly.', {position: 'top-right'})
        }
      })
      .finally(() => this.loading = false)
    },
    updateBoard() {
      this.loading = true
      this.newBoardError = false
      const title = this.$refs.boardEditTitle.value
      if (title == '' || title == null) {
        this.newBoardErrorText = 'Please enter board title'
        this.newBoardError = true
        this.loading = false
      } else {
        const boardData = {
          'title' : title
        }
        axios.put(this.apiUrl + 'boards/' + this.currentBoard, boardData, this.jsonConfigNoAuth)
        .then(() => {
          const oldIndex = this.currentBoard
          localStorage.clear()
          this.getBoardData()
          this.changeBoard(oldIndex, title)
          this.$refs.modalUpdateClose.click()
          this.loading = false
        })
        .catch(error => {
          if (error) {
            this.$toast.error('Network Error, Please make sure JSON Server is setup and running properly', {position: 'top-right'})
          }
          this.loading = false
        })
        .finally(() => this.loading = false)
      }
      
    },
  }
}
</script>

<template>
  <main>
    <div v-if="pageLoading">
      <PageLoader />
    </div>
    <div class="container-fluid" v-else>
      <div class="row g-2">
        <div class="col-md-2 side-nav shadow">
          <div class="py-3">
            <div class="d-flex justify-content-between">
              <h1>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(132, 0, 247, 1);transform: ;msFilter:;"><path d="M2 2h2v20H2z"></path><rect x="6" y="13" width="16" height="6" rx="1"></rect><rect x="6" y="5" width="12" height="6" rx="1"></rect></svg>
                </span>
                Mini Kanban
              </h1>
              <div class="mobile-menu d-block d-md-none">
                <span class="p-2" @click="mobileMenu = !mobileMenu">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(132, 0, 247, 1);transform: ;msFilter:;"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
                </span>
              </div>
            </div>
            <div class="board-data" :class="{'d-block': mobileMenu}">
              <div>
                <h3>ALL BOARDS({{ boards.length }})</h3>
              </div>
              <div>
                <ul>
                  <li v-for="(board, index) in boards" :key="index" :class="{'active' : currentBoard == board.id}" @click="changeBoard(board.id, board.title)">
                    <span v-if="currentBoard == board.id">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path></svg>
                    </span>
                    <span v-else>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(128, 142, 164, 1);transform: ;msFilter:;"><path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path></svg>
                    </span>
                    {{ board.title }}
                  </li>
                </ul>
              </div>
              <div class="d-grid gap-2">
                <button type="button" class="btn btn-create-board" data-bs-toggle="modal" data-bs-target="#createNewBoardModal">Create New Board</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-10">
          <div>
            <div class="top-head shadow p-3">
              <div class="d-flex justify-content-between">
                <div>
                  <h2>{{ currentBoardTitle }}</h2>
                </div>
                <div>
                  <button class="btn btn-add-task btn-sm me-2 d-none d-md-inline" data-bs-toggle="modal" data-bs-target="#createNewTicketModal" v-if="boards.length > 0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zM8 14h3v-3h2v3h3v2h-3v3h-2v-3H8v-2z"></path></svg>
                    Create New Ticket
                  </button>
                  <a class="btn btn-actions btn-sm dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    Actions
                  </a>

                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><a class="dropdown-item" href="#" v-if="boards.length > 0" data-bs-toggle="modal" data-bs-target="#createNewTicketModal">Add New Ticket</a></li>
                    <li><a href="#" data-bs-toggle="modal" data-bs-target="#createNewBoardModal" class="dropdown-item">Create New Board</a></li>
                    <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editNewBoardModal" v-if="boards.length > 0">Edit Board Title</a></li>
                    <li><a class="dropdown-item text-danger" href="#" @click="deleteBoard()" v-if="boards.length > 0">Delete This Board</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-if="routeColumn && routeId">
              <FullTicket :route-column="routeColumn" :route-id="routeId" @get-board-data="getBoardData"/>
            </div>
            <div class="pt-4 ticket-column" v-else>
              <div v-if="dataLoading">
                <PageLoader />
              </div>
              <div class="row ticket-data-column p-3" v-else>
                <div class="col-md-3 mb-4">
                  <h4>Todo ({{ todoData.length }})</h4>
                  <div>
                    <draggable
                      :list="todoData"
                      group="tasks"
                      item-key="id"
                      class="kanban-col"
                      @change="dataChange($event, 1)"
                      >
                      <template #item="{element}">
                        <MiniTicket :ticket-data="element" :current-column=1 @get-board-data="getBoardData" />
                      </template>
                    </draggable>
                  </div>
                </div>
                <div class="col-md-3 mb-4">
                  <h4>In Progress ({{ progressData.length }})</h4>
                  <div>
                    <draggable
                      :list="progressData"
                      group="tasks"
                      item-key="id"
                      class="kanban-col"
                      @change="dataChange($event, 2)"
                      >
                      <template #item="{element}">
                        <MiniTicket :ticket-data="element" :current-column=2 @get-board-data="getBoardData" />
                      </template>
                    </draggable>
                  </div>
                </div>
                <div class="col-md-3 mb-4">
                  <h4>Testing ({{ testingData.length }})</h4>
                  <div>
                    <draggable
                      :list="testingData"
                      group="tasks"
                      item-key="id"
                      class="kanban-col"
                      @change="dataChange($event, 3)"
                      >
                      <template #item="{element}">
                        <MiniTicket :ticket-data="element" :current-column=3 @get-board-data="getBoardData" />
                      </template>
                    </draggable>
                  </div>
                </div>
                <div class="col-md-3 mb-4">
                  <h4>Completed ({{ completedData.length }})</h4>
                  <div>
                    <draggable
                      :list="completedData"
                      group="tasks"
                      item-key="id"
                      class="kanban-col"
                      @change="dataChange($event, 4)"
                      >
                      <template #item="{element}">
                        <MiniTicket :ticket-data="element" :current-column=4 @get-board-data="getBoardData" />
                      </template>
                    </draggable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create New Board Modal -->
    <div class="modal fade" ref="createNewBoardModal" id="createNewBoardModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Create New Board</h5>
            <button type="button" ref="modalBoardClose" class="btn-close text-danger" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addNewBoard">
              <div class="form-group mb-3">
                <label>Board Title</label>
                <input type="text" class="form-control" ref="boardTitle">
              </div>
              <div class="mb-3" v-if="newBoardError">
                <div class="alert alert-danger">
                  {{ newBoardErrorText }}
                </div>
              </div>
              <div class="d-grid">
                <button class="btn btn-add-task" type="button" disabled v-if="loading">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
                <button type="button" class="btn btn-add-task" @click="addNewBoard()" v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zM8 14h3v-3h2v3h3v2h-3v3h-2v-3H8v-2z"></path></svg>
                  Create New Board
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Board Modal -->
    <div class="modal fade" ref="editNewBoardModal" id="editNewBoardModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Edit Board</h5>
            <button type="button" ref="modalUpdateClose" class="btn-close text-danger" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group mb-3">
                <label>Board Title</label>
                <input type="text" class="form-control" ref="boardEditTitle" :value="currentBoardTitle">
              </div>
              <div class="mb-3" v-if="newBoardError">
                <div class="alert alert-danger">
                  {{ newBoardErrorText }}
                </div>
              </div>
              <div class="d-grid">
                <button class="btn btn-add-task" type="button" disabled v-if="loading">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
                <button type="button" class="btn btn-add-task" @click="updateBoard()" v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zM8 14h3v-3h2v3h3v2h-3v3h-2v-3H8v-2z"></path></svg>
                  Update Board
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Create New Ticket Modal -->
    <div class="modal fade" ref="createNewTicketModal" id="createNewTicketModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Create New Ticket</h5>
            <button type="button" ref="modalTicketClose" class="btn-close text-danger" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group mb-3">
                <label>Ticket Title</label>
                <input type="text" class="form-control" ref="ticketTitle">
              </div>
              <div class="form-group mb-3">
                <label>Ticket Description</label>
                <textarea cols="30" rows="10" class="form-control" ref="ticketDescription"></textarea>
              </div>
              <div class="form-group mb-3">
                <label>Select Ticket Type</label>
                <select class="form-control" ref="ticketType">
                  <option value="Bug">Bug</option>
                  <option value="New Feature" selected>New Feature</option>
                  <option value="Blocker">Blocker</option>
                  <option value="Old Feature Update">Old Feature Update</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="mb-3" v-if="newBoardError">
                <div class="alert alert-danger">
                  {{ newBoardErrorText }}
                </div>
              </div>
              <div class="d-grid">
                <button class="btn btn-add-task" type="button" disabled v-if="loading">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
                <button type="button" class="btn btn-add-task" @click="addNewTicket()" v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zM8 14h3v-3h2v3h3v2h-3v3h-2v-3H8v-2z"></path></svg>
                  Create New Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  </main>
</template>

<style scoped>
  .side-nav {
    background-color: #fff;
    color: #808EA4;
    min-height: 100vh;
  }
  .side-nav h1 {
    margin-left: 20px;
    color: #020012;
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: 900;
  }
  .side-nav h3 {
    font-size: 15px;
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .side-nav ul{
    list-style-type: none;
    margin: 0 !important;
    padding: 0 !important;
  }
  .side-nav ul li {
    padding: 10px 20px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }
  .side-nav ul li:hover {
    background-color: #f1f1f1;
    color: #8400f7;
    border-radius: 0 20px 20px 0px;
  }
  .side-nav ul li.active {
    background-color: #8400f7;
    color: #fff;
    border-radius: 0 20px 20px 0px;
  }
  .btn-create-board{
    background:transparent;
    color: #8400f7;
    border: 1px solid #8400f7;
    border-end-start-radius: 0;
    border-start-start-radius: 0;
    margin-top: 40px;
  }
  .btn-create-board:hover{
    background:#8400f7;
    color: #fff;
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
  .btn-actions:hover, .btn-add-task:hover{
    background:#B48AFF;
    color: #fff;
  }
  .top-head h2{
    font-size: 25px;
  }
  .ticket-column{
    min-height: 100vh;
  }
  .ticket-data-column h4{
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 30px;
  }
  .ticket-data-column > div {
    border-right: 1px solid #F1EAF9;
    min-height: 100vh;
  }
  .ticket-data-column > div:last-child{
    border-right: none;
  }
  .ticket-data-column > div:first-child h4{
    color: #00C3E9;
  }
  .ticket-data-column > div:nth-child(2) h4{
    color: purple;
  }
  .ticket-data-column > div:nth-child(3) h4{
    color: #9664D7;
  }
  .ticket-data-column > div:last-child h4{
    color: green;
  }
  .kanban-col {
    min-height: 100vh;
  }
  @media only screen and (max-width:768px) {
    .container-fluid {
      margin: 0 !important;
      padding: 0 !important;
      overflow:hidden !important;
    }
    .side-nav {
      min-height: 0px;
    }
    .side-nav h1{
      margin-bottom: 0px;
    }
    .board-data {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #ccc;
      display: none;
    }
    .ticket-column{
      min-height: 30vh;
    }
    .ticket-data-column > div {
      min-height: 30vh;
    }
    .kanban-col {
      min-height: 10vh;
    }
  }
</style>
