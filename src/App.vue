<template>
  <div id="app">
    <div class="table">
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="firstName" label="First Name"></el-table-column>
        <el-table-column prop="lastName" label="Last Name"></el-table-column>
        <el-table-column prop="phoneNumber" label="Phone Number"></el-table-column>
        <el-table-column prop="street" label="Address"></el-table-column>
        <el-table-column prop="city" label="City"></el-table-column>
        <el-table-column prop="state" label="State" width="70"></el-table-column>
        <el-table-column prop="zipCode" label="Zip Code" width="100"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      tableData: [],
      pageNumber: 1,
      body: null,
      isScrolling: null,
      scrollToRow: null,
      rowsInView: 0,
      scrollIntoViewOptions: {
        behavior: "auto",
        block: "end",
        inline: "start"
      }
    };
  },
  mounted() {
    this.loadData('next');
    this.scrollStop();
  },
  methods: {
    loadData: function(direction) {
      return fetch('https://us-central1-infinite-scroll-vuejs.cloudfunctions.net/getData')
      // return fetch(`http://localhost:3000/1000/50/${this.pageNumber}`)
      .then(x => x.json())
      .then(x => {
        if (x.length === 0) {
          this.$notify({
            message: 'There is no more data',
            duration: 2000
          });
        }
        if (direction === 'previous') {
          if (this.pageNumber === 1) {
            this.$notify({
              title: 'Calm down',
              message: `You've reached the beginning.`
            });
          }
          if (this.pageNumber > 1) {
            this.removeData();
            this.tableData.unshift(...x);
            this.rowsInView = document.getElementsByClassName('el-table__row');
            this.scrollToRow = this.getScrollToRow(direction);
            this.scrollToRow.classList.add('placeholder');
            this.pageNumber--;
            this.$notify({
              message: `Page ${this.pageNumber} loaded.`,
              position: 'top-right',
              duration: 2000
            })
          }
        }
        if (direction === 'next') {
        this.tableData.push(...x);
        this.rowsInView = document.getElementsByClassName('el-table__row');
        window.clearTimeout(this.isScrolling);
        }
        })
        .then(x => {
          this.scrollToRow = this.getScrollToRow(direction);
          if (this.scrollToRow) {
            this.scrollToRow.scrollIntoView(this.scrollIntoViewOptions);
            this.scrollToRow.classList.add('placeholder');
          }
          this.checkDataSize()
            .then(z => {
              if (z === true) {
                this.removeData();
              }
            });
        });
    },
    loadNextData: function () {
      if (this.tableData.length > 49) {
        this.pageNumber++;
        this.$notify({
          message: `Page ${this.pageNumber} loaded`,
          position: 'bottom-right',
          duration: 2000
        })
        this.loadData('next');
        window.clearTimeout(this.isScrolling);
      }
    },
    loadPreviousData: function () {
      this.loadData('previous')
    },
    checkDataSize: async function () {
      return this.tableData.length > 150;
    },
    removeData: function () {
      this.tableData.splice(0, 50);
      this.scrollToRow = this.getScrollToRow();
      if (this.scrollToRow) {
        this.scrollToRow.scrollIntoView(this.scrollIntoViewOptions);
        this.scrollToRow.classList.add('placeholder');
      }
    },
    getScrollToRow: function (direction) {
      let a;
      if (direction === 'previous') {
        return this.rowsInView[0];
      }
      if (direction === 'next') {
        a = this.rowsInView.length <= 150 ? 50 : 100;
      }
      if (this.rowsInView.length === 50) {
        a = -1;
      }
      return this.rowsInView[this.rowsInView.length - a];
    },
    scrollStop: function () {
      window.addEventListener('scroll', event => {
        window.clearTimeout(this.isScrolling);
        this.isScrolling = setTimeout(() => {
          const scrollPos = Math.ceil(document.documentElement.scrollTop + window.innerHeight);
          const screenHeight = document.documentElement.offsetHeight;
          const bottomOfWindow = scrollPos === screenHeight;
          if (bottomOfWindow === true) {
            this.loadNextData();
            window.clearTimeout(this.isScrolling);
          }
          if (document.documentElement.scrollTop === 0) {
            this.loadPreviousData();
          }
        }, 200, this.isScrolling);
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.overlay {
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  font-size: 26px;
  border-radius: 3px;
  padding: 10px 0;
  border: 1px solid black;
  opacity: 0.7;
}
span {
  margin: 10px 0;
}
.placeholder {
  background-color: rgba(239, 242, 10, 0.09) !important;
}
</style>
