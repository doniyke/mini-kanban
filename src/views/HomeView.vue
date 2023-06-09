<script>
import MiniTicket from '../components/MiniTicket.vue'
import draggable from 'vuedraggable';
export default {
  order: 1,
  components: {
    MiniTicket,
    draggable
  },
  data () {
    return {
      mobileMenu : false,
      todoData : [
        {id:1, title: 'hello1', shortDescription : 'hello description here'},
        {id:2, title: 'hello2', shortDescription : 'hello description here'},
        {id:3, title: 'hello3', shortDescription : 'hello description here'},
        {id:0, title: 'hello4', shortDescription : 'hello description here'}
      ],
      progressData: [],
      testingData: [],
      completedData: []
    }
  },
  mounted () {
    //if todo exists in localstorage fetch todo from local storage and update todoData
    // else fetch todo from api , store fetched todo to localstorage and update todoData
  },
  methods: {
    //on each drag change, update store data and update json data
    dataChange (event, col) {
      if (event.added) {
        const CurrentData = event.added.element
        const column = col
        console.log ('current Data', CurrentData)
        console.log ('Column', column)
        //update localstorage todo with the current todo
        //update api todo with current todo
      }
      if (event.removed) {
        const CurrentData = event.removed.element
        const column = col
        const oldIndex = event.removed.oldIndex
        console.log ('current Data', CurrentData)
        console.log ('Column', column)
        console.log ('oldIndex', oldIndex)
        //update localstorage todo with the current todo
        //update api todo with current todo
      }
      console.log(this.progressData)
    }
  }
}
</script>

<template>
  <main>
    <div class="container-fluid">
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
                <h3>ALL BOARDS(3)</h3>
              </div>
              <div>
                <ul>
                  <li>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(128, 142, 164, 1);transform: ;msFilter:;"><path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path></svg>
                    </span>
                    Board 1
                  </li>
                  <li class="active">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path></svg>
                    </span>
                    Board 2
                  </li>
                  <li>Board 3</li>
                </ul>
              </div>
              <div class="d-grid gap-2">
                <button class="btn btn-create-board">Create New Board</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-10">
          <div>
            <div class="top-head shadow p-3">
              <div class="d-flex justify-content-between">
                <div>
                  <h2>Board Name</h2>
                </div>
                <div>
                  <button class="btn btn-add-task btn-sm me-2 d-none d-md-inline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zM8 14h3v-3h2v3h3v2h-3v3h-2v-3H8v-2z"></path></svg>
                    Create New Ticket
                  </button>
                  <a class="btn btn-actions btn-sm dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    Actions
                  </a>

                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><a class="dropdown-item" href="#">Add New Ticket</a></li>
                    <li><a class="dropdown-item" href="#">Edit Board Title</a></li>
                    <li><a class="dropdown-item text-danger" href="#">Delete Board</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="pt-4 ticket-column">
              <div class="row ticket-data-column p-3">
                <div class="col-md-3 mb-4">
                  <h4>Todo (3)</h4>
                  <div>
                    <draggable
                      :list="todoData"
                      group="tasks"
                      item-key="id"
                      class="kanban-col"
                      @change="dataChange($event, 1)"
                      >
                      <template #item="{element}">
                        <MiniTicket :ticket-data="element"/>
                      </template>
                    </draggable>
                  </div>
                </div>
                <div class="col-md-3 mb-4">
                  <h4>In Progress (3)</h4>
                  <div>
                    <draggable
                      :list="progressData"
                      group="tasks"
                      item-key="id"
                      class="kanban-col"
                      @change="dataChange($event, 2)"
                      >
                      <template #item="{element}">
                        <MiniTicket :ticket-data="element" />
                      </template>
                    </draggable>
                  </div>
                </div>
                <div class="col-md-3 mb-4">
                  <h4>Testing (3)</h4>
                  <div>
                    <draggable
                      :list="testingData"
                      group="tasks"
                      item-key="id"
                      class="kanban-col"
                      @change="dataChange($event, 3)"
                      >
                      <template #item="{element}">
                        <MiniTicket :ticket-data="element"/>
                      </template>
                    </draggable>
                  </div>
                </div>
                <div class="col-md-3 mb-4">
                  <h4>Completed (3)</h4>
                  <div>
                    <draggable
                      :list="completedData"
                      group="tasks"
                      item-key="id"
                      class="kanban-col"
                      @change="dataChange($event, 4)"
                      >
                      <template #item="{element}">
                        <MiniTicket :ticket-data="element"/>
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
