
export const filterRestaurants = (restaurants,filter) => {
    let results = [],
        isValid = false;

    // Loop through restaurants
    for(const item in restaurants){

        // Check if it's inside the rating range, update isValid to true
        if(
            restaurants[item].restaurant.user_rating &&
            restaurants[item].restaurant.user_rating.aggregate_rating &&
            numberBetween(restaurants[item].restaurant.user_rating.aggregate_rating,filter.rating)
        ){
            isValid = true;
        }

        // Check if it's outside of the cost range and update isValid to false
        if(
            restaurants[item].restaurant.price_range &&
            !numberBetween(restaurants[item].restaurant.price_range,filter.cost) &&
            isValid
        ){
            isValid = false;
        }

        // if isValid, add to the array
        if(isValid){
            results.push(restaurants[item]);
        }

    }

    return results;
}


export const numberBetween = (number,arrayNumber) => {
    let min = Math.min(...arrayNumber),
        max = Math.max(...arrayNumber);
    return number >= min && number <= max;
}