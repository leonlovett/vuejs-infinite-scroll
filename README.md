# VueJs Infinite Scroll

## Project setup
```
cd fake-data
npm install

cd ../
npm install
```
### Start data server
```
cd ../fake-data
node index.js
```
### Configuration Options
```
maxPages: the maximum number of pages on the screen at one time.(default: 3)

pageSize: the maximum number of rows per page. (default: 50)

dataSource: a link or reference to the data source for the table.

scrollStopDelay: the number of milliseconds to wait to load more data after the user has stopped
scrolling. (default: 200)

offsetDistance: the distance in px from the bottom of the page to load the next page. (default: 200px)
```
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
