import { ACCESS_TOKEN, API_URL } from "@common/config";

async function authMiddleWare(serviceDefinition, serviceOptions) {

    // This will be printed everytime you call a service
    return {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + ACCESS_TOKEN
        }
    };
}

const getDataService = {

    getData: function (url, method, token) {

        return new Promise((resolve, reject) => {
            fetch(API_URL + url + '/' + ACCESS_TOKEN)
                .then((response) => response.json())
                .then((json) => resolve(json))
                .catch((error) => console.error(error))
        });
    },

    postData: function (url, data = null) {
        let header = {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
        };
        // if (token != null) {
        header = {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            "X-Auth-Token": ACCESS_TOKEN
        };

        //}

        return fetch(API_URL + url + '/' + ACCESS_TOKEN, {
            method: "POST",
            headers: header,
            body: data
        })
            .then(response => response.json())
            .then(async responseJson => {
                return responseJson;
            })
            .catch(error => {
                console.error(error);
            });
    },

    jsonpostData: async function (url, data = null, token = null, cartToken) {

        return fetch(API_URL + url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/vnd.api+json',
                //  'Commerce-Cart-Token': cartToken,
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(async responseJson => {
                return responseJson;
            })
            .catch(error => {
                console.error(error);
            });
    }
};
export default getDataService;
