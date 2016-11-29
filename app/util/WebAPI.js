export default {
    getItems() {
        return new Promise((resolve) => {
            console.log("liii");
            axios.get("https://randomuser.me/api/?results=10&nat=fr")
                .then(function(result) {
                    console.log(result.data.results);
                    return resolve(result.data.results);
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