var Rest = require('./index').RestService
var rest = new Rest({
    monitor_apps: ['server']
})

rest.connect().then(function () {
    rest.listen(7979);
}).catch(function (err) {
    console.log(err);
});


