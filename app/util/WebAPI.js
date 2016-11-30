import $ from 'jquery';

export default {
    getItems() {
        return new Promise((resolve) => {
            console.log("liii");
            $.getJSON("https://randomuser.me/api/?results=10&nat=fr")
                .then(function(result) {
                    return resolve(result.results);
                });

            // setTimeout(() => {
            //     resolve(['Item 1', 'Item 2', 'Item 3'].map((item, i) => {
            //         return {
            //             id: i,
            //             label: item
            //         };
            //     }));
            // }, 5000);
        });
    }
};