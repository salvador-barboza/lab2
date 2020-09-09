var app2 = new Vue({
  el: '#app-2',
  data: {
    carouselImages: [],
    searchResults: [""],
    showCarousel: true,
    searchError: false,
    raza: null,
    razas: [],
    randomImage: null
  },
  created: function () {
    this.fetchRandomImages()
    this.fetchRazas()
    this.fetchRandomImage()
  },
  methods: {
    fetchRandomImages () {
      fetch('https://dog.ceo/api/breeds/image/random/10')
        .then((res) => res.json())
        .then(({ message }) => {
          this.carouselImages = message
        })
    },
    hideCarousel () {
      this.showCarousel = !this.showCarousel
    },
    fetchRazas () {
      fetch('https://dog.ceo/api/breeds/list/all')
        .then((res) => res.json())
        .then(({ message }) => {
          this.razas = Object.keys(message)
        })
    },
    fetchRandomImage () {
      this.randomImage = null
      fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then(({ message }) => {
        this.randomImage = message
      })
    }
  },
  watch: {
    // whenever question changes, this function will run
    raza: function (raza, oldRaza) {
      this.searchError =  false
      this.searchResults = []
      fetch(`https://dog.ceo/api/breed/${raza}/images`)
      .then((res) => res.json())
      .then(({ message }) => {
        if (message === "Breed not found (master breed does not exist)") {

          this.searchError = true
        } else {
          this.searchResults = message
        }
      })
    }
  },
})