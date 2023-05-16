<template>
  <div class="container">
    <div>
      <div id="reviews-product-modal"  ref="close-product-modal" title="BootstrapVue">
        <div class="review-body-wrapper">
          <div class="product-header">
            <h3 @click="$bvModal.hide('reviews-product-modal')" class="close-popup">Reviews</h3>
          </div>
          <div class="product-body">
            <ul class="reviews-tabs">
              <li v-on:click="activeTab='1'" v-bind:class="[ activeTab === '1' ? 'active' : '' ]"><p>Customers review</p></li>
              <li v-on:click="activeTab='2'" v-bind:class="[ activeTab === '2' ? 'active' : '' ]"><p>Store review</p></li>
            </ul>
            <div v-if="activeTab ==='1'" class="customers-review-tab">
              <div class="product-detail">
                <h3>Gaiai Dress, XL</h3>
                <div class="img-wrapper">
                  <img src="../assets/images/detail-products-image-1.png" alt="">
                </div>
              </div>
              <div class="rating-wrapper">
                <div class="star-rating">
                  <!--                  <star-rating :rating="3.8" :read-only="true" :increment="0.01"></star-rating>-->
                  <!-- <StarRating :rating="3.8" :increment="0.01"  @rating-selected="setRating" /> -->
                  <h3>{{ rating }}/5</h3>
                </div>
                <p class="black">From 20 customer reviews</p>
                <div class="rating-percentage-wrapper">
                  <div class="rating-percentage">
                    <p>5 Star</p>
                    <div class="progress-bar-wrapper">
                      <b-progress :value="fiveStarValue" :max="max" class="mb-3"></b-progress>
                    </div>
                    <p class="p">75%</p>
                  </div>
                  <div class="rating-percentage">
                    <p>4 Star</p>
                    <div class="progress-bar-wrapper">
                      <b-progress :value="fourStarValue" :max="max" class="mb-3"></b-progress>
                    </div>
                    <p class="p">16%</p>
                  </div>
                  <div class="rating-percentage">
                    <p>3 Star</p>
                    <div class="progress-bar-wrapper">
                      <b-progress :value="threeStarValue" :max="max" class="mb-3"></b-progress>
                    </div>
                    <p class="p">5%</p>
                  </div>
                  <div class="rating-percentage">
                    <p>2 Star</p>
                    <div class="progress-bar-wrapper">
                      <b-progress :value="twoStarValue" :max="max" class="mb-3"></b-progress>
                    </div>
                    <p class="p">5%</p>
                  </div>
                  <div class="rating-percentage">
                    <p>1 Star</p>
                    <div class="progress-bar-wrapper">
                      <b-progress :value="oneStarValue" :max="max" class="mb-3"></b-progress>
                    </div>
                    <p class="p">1%</p>
                  </div>
                </div>
              </div>
              <div class="customer-reviews">
                <p class="p">Customer reviews  <span>(4)</span></p>
                <div class="customer-reviews-wrapper">
                  <div class="customer-reviews-card">
                    <div class="customer-reviews-card-header">
                      <div class="author-detail">
                        <div class="img-wrapper">
                          <img src="../assets/images/customer-author-img-1.png" alt="">
                        </div>
                        <h3>John Smit <span>20s ago</span></h3>
                      </div>
                      <div class="customer-rating">
                        <!-- <StarRating :rating="3.1" :read-only="true" :increment="0.01" /> -->
                      </div>
                    </div>
                    <div class="customer-reviews-card-body">
                      <h3>Great Product</h3>
                      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                    </div>
                  </div>
                  <div class="customer-reviews-card">
                    <div class="customer-reviews-card-header">
                      <div class="author-detail">
                        <div class="img-wrapper">
                          <img src="../assets/images/customer-author-img-2.png" alt="">
                        </div>
                        <h3>Adebola <span>20s ago</span></h3>
                      </div>
                      <div class="customer-rating">
                        <!-- <StarRating :rating="2.1" :read-only="true" :increment="0.01" /> -->
                      </div>
                    </div>
                    <div class="customer-reviews-card-body">
                      <h3>Great Product</h3>
                      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                    </div>
                  </div>
                  <div class="customer-reviews-card">
                    <div class="customer-reviews-card-header">
                      <div class="author-detail">
                        <div class="img-wrapper">
                          <img src="../assets/images/customer-author-img-1.png" alt="">
                        </div>
                        <h3>Tobi <span>20s ago</span></h3>
                      </div>
                      <div class="customer-rating">
                        <!-- <StarRating :rating="4.4" :read-only="true" :increment="0.01" /> -->
                      </div>
                    </div>
                    <div class="customer-reviews-card-body">
                      <h3>Great Product</h3>
                      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="activeTab ==='2'" class="store-review-tab">
              <div class="store-reviews">
                <p class="p">Store reviews <span>(4)</span></p>
                <div class="customer-reviews-wrapper">
                  <div class="customer-reviews-card">
                    <div class="customer-reviews-card-header">
                      <div class="author-detail">
                        <div class="img-wrapper">
                          <img src="../assets/images/customer-author-img-1.png" alt="">
                        </div>
                        <h3>John Smit <span>20s ago</span></h3>
                      </div>
                      <div class="customer-rating">
                        <!-- <StarRating :rating="3.1" :read-only="true" :increment="0.01" /> -->
                      </div>
                    </div>
                    <div class="customer-reviews-card-body">
                      <h3>Great Product</h3>
                      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                    </div>
                  </div>
                  <div class="customer-reviews-card">
                    <div class="customer-reviews-card-header">
                      <div class="author-detail">
                        <div class="img-wrapper">
                          <img src="../assets/images/customer-author-img-2.png" alt="">
                        </div>
                        <h3>Adebola <span>20s ago</span></h3>
                      </div>
                      <div class="customer-rating">
                        <!-- <StarRating :rating="2.1" :read-only="true" :increment="0.01" /> -->
                      </div>
                    </div>
                    <div class="customer-reviews-card-body">
                      <h3>Great Product</h3>
                      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                    </div>
                  </div>
                  <div class="customer-reviews-card">
                    <div class="customer-reviews-card-header">
                      <div class="author-detail">
                        <div class="img-wrapper">
                          <img src="../assets/images/customer-author-img-1.png" alt="">
                        </div>
                        <h3>Tobi <span>20s ago</span></h3>
                      </div>
                      <div class="customer-rating">
                        <!-- <StarRating :rating="4.4" :read-only="true" :increment="0.01" /> -->
                      </div>
                    </div>
                    <div class="customer-reviews-card-body">
                      <h3>Great Product</h3>
                      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                    </div>
                  </div>

                  <div class="customer-reviews-card">
                    <div class="customer-reviews-card-header">
                      <div class="author-detail">
                        <div class="img-wrapper">
                          <img src="../assets/images/customer-author-img-1.png" alt="">
                        </div>
                        <h3>John Smit <span>20s ago</span></h3>
                      </div>
                      <div class="customer-rating">
                        <!-- <StarRating :rating="3.1" :read-only="true" :increment="0.01" /> -->
                      </div>
                    </div>
                    <div class="customer-reviews-card-body">
                      <h3>Great Product</h3>
                      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                    </div>
                  </div>
                  <div class="customer-reviews-card">
                    <div class="customer-reviews-card-header">
                      <div class="author-detail">
                        <div class="img-wrapper">
                          <img src="../assets/images/customer-author-img-2.png" alt="">
                        </div>
                        <h3>Adebola <span>20s ago</span></h3>
                      </div>
                      <div class="customer-rating">
                        <!-- <StarRating :rating="2.1" :read-only="true" :increment="0.01" /> -->
                      </div>
                    </div>
                    <div class="customer-reviews-card-body">
                      <h3>Great Product</h3>
                      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                    </div>
                  </div>
                  <div class="customer-reviews-card">
                    <div class="customer-reviews-card-header">
                      <div class="author-detail">
                        <div class="img-wrapper">
                          <img src="../assets/images/customer-author-img-1.png" alt="">
                        </div>
                        <h3>Tobi <span>20s ago</span></h3>
                      </div>
                      <div class="customer-rating">
                        <!-- <StarRating :rating="4.4" :read-only="true" :increment="0.01" /> -->
                      </div>
                    </div>
                    <div class="customer-reviews-card-body">
                      <h3>Great Product</h3>
                      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import StarRating from 'vue-star-rating'

// Vue.component('star-rating', StarRating)


export default {
  name: 'ReviewsView',
  components: {
    // StarRating
  },
  data() {
    return {
    }
  },
  methods:{
 
  },
	computed: {

	},
}
</script>

<style scoped>

</style>
