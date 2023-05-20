<template>
  <div class="container">
    <Header @add-button="addButton"><h3 @click="back" class="close-popup">Add Product</h3></Header>
    <div>
      <div v-if="!product_to_edit.id" id="add-product-modal"  ref="close-product-modal" title="BootstrapVue">
        <div class="product-body-wrapper nav-margin-top">
          <div class="product-body">
            <div class="form">
              <div class="form-group">
                <p class="dark label">Uplaod Product image <span>(Optional)</span> </p>
                <input type="file" id="uploadProductImage" @change="previewImage" accept="image/*">
                <label for="uploadProductImage" class="uploadProductImage"> Tap here to select product image</label>
                <div class="image-preview" v-if="imageData.length > 0">
                  <img class="preview" :src="imageData" alt="preview">
                </div>
              </div>
              <div class="form-group">
                <label for="product-name">Product Name</label>
                <input type="text" id="product-name" v-model="new_product.product_name" class="form-control">
                <span>give your product a short and clear name</span>
              </div>
              <div class="form-group">
                <label for="product-price">Product Price</label>
                <input type="number" id="product-price" v-model="new_product.price" class="form-control">
              </div>
              <div class="form-group">
                <label for="product-description">Product Description <span>(Optional)</span></label>
                <textarea id="product-description" v-model="new_product.description" class="form-control"></textarea>
              </div>
              <div class="form-group">
                <button class="btn-style float-btn-style" @click="saveProduct">Add Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else id="edit-product-modal"  ref="close-product-modal" title="BootstrapVue">
        <div class="product-body-wrapper">
          <div class="product-header">
            <h3 @click="$bvModal.hide('edit-product-modal')" class="close-popup">Edit {{ product_to_edit.product_name }}</h3>
          </div>
          <div class="product-body">
            <div class="form">
              <div class="form-group">
                <p class="dark label">Edit Product image</p>
                <input type="file" id="editUploadProductImage" @change="previewImage" accept="image/*">
                <label for="editUploadProductImage" class="uploadProductImage">Tap here to change produt image</label>
                <div class="image-preview" v-if="imageData.length > 0">
                  <img class="preview" :src="imageData" alt="preview">
                </div>
              </div>
              <div class="form-group">
                <label for="edit-product-name">Product Name</label>
                <input type="text" id="edit-product-name" class="form-control" v-model="edit_product.product_name">
              </div>
              <div class="form-group">
                <label for="edit-product-price">Product Price</label>
                <input type="text" id="edit-product-price" v-model="edit_product.price" class="form-control">
              </div>
              <div class="form-group">
                <label for="product-description">Product Description <span>(Optional)</span></label>
                <textarea id="product-description" class="form-control" v-model="edit_product.description"></textarea>
              </div>
              <div class="form-group">
                <button class="btn-style float-btn-style" @click="editProduct">Save edits</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header"
import { mapGetters } from "vuex"
import {
  createProduct,
  updateProduct,
} from '@/services/apiServices'
import { SET_NAVIGATION } from "@/store/mutationTypes"

export default {
  name: 'AddOrEditProduct',
  components: {
    Header,
  },
  data() {
    return {
      imageData: "", // we will store base64 format of image in this string
      new_product: {
        product_name: '',
        price: '',
        description: '',
      },
      edit_product: {
        product_name: '',
        price: '',
        description: '',
      }
    }
  },
  methods:{
    createNewProduct(new_product) { // creates new product with the image only
      createProduct(new_product)
          .then((res) => {
            console.log(res.data)
            this.new_product.product_image = res.data.product_image;
            this.new_product.id = res.data.id;
            // this.new_product.temp_id = res.data.id;
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            // this.uploading_image = false;
          });
    },
    editProduct(product, id) {
      updateProduct(product, id)
          .then(() => {
            // fethcStoreInventory(this.store.slug);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            // this.loading = false;
          });
    },
    previewImage(event) {
      this.saveProduct(event)
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    saveProduct(e){
      let new_product = new FormData()
      try {
        new_product.append("product_image", e.target.files[0])
        // this.uploading_image = true
      } catch { null }

      if (!this.product_to_edit.id) {
        this.new_product.id ? this.editProduct(this.new_product, this.new_product.id) : this.createNewProduct(new_product) 
      } else {
        this.editProduct(this.edit_product, this.product_to_edit.id)
      }
    },
  },
	computed: {
		...mapGetters({
      product_to_edit: 'getProductToBeEditted'
		}),
	},
  mounted() {
    this.edit_product.product_name = this.product_to_edit.product_name
    this.edit_product.price = this.product_to_edit.price
    this.edit_product.description = this.product_to_edit.description

    this.$store.commit(SET_NAVIGATION, 11)
  }
}
</script>

<style scoped>
.image-preview {
  width: 330px;
}
img {
  width: 100%;
}
.form {
  text-align: left;
}
.form-group {
  margin-bottom: 24px;
}
.form label {
  color: #0C3E26;
  margin-bottom: 8px;
}
.form label.uploadProductImage {
  background: #FDFDFD;
  border: 0.5px dashed rgba(20, 62, 50, 0.25);
  border-radius: 8px;
  padding: 35px 50px;
  width: 100%;
  color: #69747E;
  text-align: center;
}
.form input[type="file"] {
  display: none;
}
p, .p {
  color: #9C9C9C;
}
</style>
