class easyHttp {
    constructor() {
        this.url = `http://127.0.0.1:5002/api/v1`;
    }

    // Make an HTTP GET Request 
    async get(url) {
        const response = await fetch(this.url+url);
        const resData = await response.json();
        return resData;
    }

    async post(url, data) {
        console.log(this.url+url, JSON.stringify(data));
        const response = await fetch(this.url+url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const resData = await response.json();
        return resData;
    }
    // Make an HTTP PUT Request
    async put(url, data) {
        const response = await fetch(this.url+url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        return resData;
    }

    // Make an HTTP DELETE Request
    async delete(url) {
        const response = await fetch(this.url+url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const resData = await 'Resource Deleted...';
    }
}

/*
// Api call
class Http {
    constructor() {
        this.url = `http://127.0.0.1:5002/api/v1`;
    }

    getUsingXhr(url, callback) {
        var args = Array.prototype.slice.call(arguments, 3);
        var xhr = new XMLHttpRequest();

        xhr.ontimeout = function () {
            console.error("The request for " + url + " timed out.");
        };

        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        };

        xhr.open("GET", `${this.url}` + url, true); //false
        //true\false differentiate call async or sync

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(xhr.statusText, JSON.parse(xhr.response));
                } else {
                    console.error(xhr.statusText);
                    callback(xhr.statusText, JSON.parse(xhr.response));
                }
            }
        };

        // xhr.timeout = timeout;
        xhr.send();

        return xhr;
    }

    // =============== Using promise ===============
    getUsingFetchAPI(endpoint) {
        // var result = [];
        // var self = this;

        // return new Promise(function (resolve, reject) {
        //     fetch(self.url + endpoint)
        //         .then(res => res.json())
        //         .then(data => resolve(data.result))
        //         .catch(data => reject(data));
        // });

    }

    // =============== using async / await ===============
    async getUsingFetchAPI(endpoint) {
        const response = await fetch(this.url + endpoint);
        const result = await response.json();
        return result.result;
    }

    async PostUsingFetchAPI(data) {

    }
}
*/