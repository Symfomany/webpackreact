import $ from 'jquery';

export default {
    getItems() {
        return $.getJSON("https://randomuser.me/api/?results=10&nat=fr")
            .then(function(result) {
                return result.results;
            });
    }
};