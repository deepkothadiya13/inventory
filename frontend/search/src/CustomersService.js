import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class CustomersService{

    // constructor(){}


    getReviews() {
        const url = `${API_URL}/api/reviews/`;
        return axios.get(url).then(response => response.data);
    }
    getReviewsByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getReview(pk) {
        const url = `${API_URL}/api/reviews/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteReview(review){
        const url = `${API_URL}/api/reviews/${review.pk}`;
        return axios.delete(url);
    }
    createReview(review){
        const url = `${API_URL}/api/reviews/`;
        return axios.post(url,review);
    }
    updateReview(review){
        const url = `${API_URL}/api/reviews/${review.pk}`;
        return axios.put(url,review);
    }
    getSearch(search) {
        const url = `${API_URL}/api/search/${search}`;
        return axios.get(url).then(response => response.data);
    }
}