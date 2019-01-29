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
      maxPages: 3,
      startPage: 1,
      endPage: 1,
      pageSize: 50,
      dataSource: 'https://us-central1-infinite-scroll-vuejs.cloudfunctions.net/getData',
      scrollStopDelay: 200,
      offsetDistance: 200,
      scrollIntoViewOptions: {
        behavior: "auto",
        block: "end",
        inline: "start"
      }
    };
  },
  mounted() {
    this.loadData('initial');
    this.scrollStop();
  },
  methods: {
    loadData: function(direction) {
      return fetch(this.dataSource)
      .then(x => x.json())
      .then(x => {
        if (x.length === 0) {
          this.$notify({
            message: 'There is no more data',
            duration: 2000
          });
        }
        if (direction === 'initial') {
          this.tableData.push(...x);
        }
        if (direction === 'previous') {
          if (this.startPage > 1) {
            this.removeData(direction);
            this.tableData.unshift(...x);
            this.rowsInView = document.getElementsByClassName('el-table__row');
            this.scrollToRow = this.getScrollToRow(direction);
          }
        }
        if (direction === 'next') {
        this.tableData.push(...x);
        this.endPage++;
        this.rowsInView = document.getElementsByClassName('el-table__row');
        window.clearTimeout(this.isScrolling);
        }
        })
        .then(x => {
          this.scrollToRow = this.getScrollToRow(direction);
          if (this.scrollToRow) {
            this.scrollToRow.scrollIntoView(this.scrollIntoViewOptions);
          }
          this.checkDataSize()
            .then(isMaxPages => {
              if (isMaxPages === true) {
                this.removeData(direction);
              }
            });
        });
    },
    loadNextData: function () {
      if (this.tableData.length > this.pageSize - 1) {
        this.pageNumber++;
        this.loadData('next');
        window.clearTimeout(this.isScrolling);
      }
    },
    loadPreviousData: function () {
      if (this.startPage === 1) {
        this.$notify({
          title: 'Calm down',
          message: `You've reached the beginning.`
        });
      } else {
        this.loadData('previous')
      }
    },
    checkDataSize: async function () {
      return this.endPage - this.startPage + 1 > this.maxPages;
    },
    removeData: function (direction) {
      if (direction === 'next') {
        this.tableData.splice(0, this.pageSize);
        if (this.endPage - this.startPage >= 2) {
          this.startPage++;
        }
      }
      if (direction === 'previous') {
        this.tableData.splice(this.tableData.length - this.pageSize, this.pageSize);
        this.startPage--;
        this.endPage--;
      }
      this.scrollToRow = this.getScrollToRow();
      if (this.scrollToRow) {
        this.scrollToRow.scrollIntoView(this.scrollIntoViewOptions);
      }
    },
    getScrollToRow: function (direction) {
      let a;
      if (direction === 'previous') {
        return this.rowsInView[0];
      }
      if (direction === 'next') {
        a = this.rowsInView.length <= this.pageSize * this.maxPages ? this.pageSize : (this.pageSize * this.maxPages) - this.pageSize;
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
          const scrollPos = Math.ceil(document.documentElement.scrollTop + window.innerHeight) + this.offsetDistance;
          const screenHeight = document.documentElement.offsetHeight;
          const bottomOfWindow = scrollPos >= screenHeight;
          if (bottomOfWindow === true) {
            this.loadNextData();
            window.clearTimeout(this.isScrolling);
          }
          if (document.documentElement.scrollTop === 0) {
            this.loadPreviousData();
          }
        }, this.scrollStopDelay);
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
</style>
