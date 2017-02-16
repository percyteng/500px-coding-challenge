import React, {Component} from 'react';
import {Link} from "react-router";
import ReactStateAnimation from 'react-state-animation'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'
import promise from 'es6-promise';
import FullImage from '../components/fullScreenImage'
import 'isomorphic-fetch';
promise.polyfill();

var currentPage = 1;
export default class HomePage extends Component{
  constructor(){
    super()
    this.state={
      imageList: [],
      selectedImage:{
        description:'It\'s awesome',
        name:'percy\'s image',
        positive_votes_count: 1000,
        user:{
          fullname:'percy teng',
          userpic_url:'http://percyteng.me'
        }
      },
      supports:100,
      showImages: false,
      showLargeImageModal: 'none',
      spinDismiss: false,
      largeImageOpacity: 0,
    }
    this._animate = new ReactStateAnimation(this)
    this.giveSupport = this.giveSupport.bind(this)
    this.nextImage = this.nextImage.bind(this)
    this.previousImage = this.previousImage.bind(this)
  }

  //this function will be called when users scroll to the bottom and it will get more images through 500px api
  getImage(){
    var _this = this

    _500px.api('/photos', { feature: 'popular', image_size: 5, page: currentPage }, function (response) {
      if (!response.success) {
          alert('Unable to fetch images');
      }
      else{
        var newList = _this.state.imageList.slice()
        newList.push.apply(newList, response.data.photos)
        _this.setState({imageList:newList})
        currentPage += 1
      }
    })
  }
  componentDidMount(){
    var _this = this
    setTimeout(()=>this.setState({showImages: true}),1000)
    window.onscroll = function(ev) {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        _this.getImage()
      }
    };
  }
  //get 20 images by default
  componentWillMount(){
    this.getSupport()
    var _this = this
    var imageList = []
    _500px.init({
      sdk_key: '5eec9aac38ad6a4660f3b8f30edac08e110c7405'
    });
    this.getImage()
  }
  //this function shows the image modal with animation
  showModal(image, i){
    var tmp = Object.assign({}, image)
    tmp.key = i
    this.setState({selectedImage:tmp})
    this.setState({showLargeImageModal: 'inline'}, ()=>{
      this._animate.linearIn('largeImageOpacity', 1/*end value*/, 500/*duration(ms)*/)
    })
  }
  //this function dismisses the image modal with animation
  dismissModal(){
    this._animate.linearIn('largeImageOpacity', 0/*end value*/, 500/*duration(ms)*/)
    setTimeout(()=>this.setState({showLargeImageModal:'none'}), 500)
  }
  //gets called when the mouse gets over a image
  onMouseOver(i){
    document.getElementById(i.toString()).classList.remove("hidden")
    document.getElementById(i.toString()).classList.add("oppacityTransition")
  }
  //gets called when the mouse gets away a image
  onMouseLeave(i){
    document.getElementById(i.toString()).classList.add("hidden")
    document.getElementById(i.toString()).classList.remove("oppacityTransition")
  }
  //used to switch to the next image in the list, if it reaches the edge, it will call api for more images
  nextImage(){
    var index = this.state.selectedImage.key
    if (index < this.state.imageList.length-1){
      var newImage = Object.assign({},this.state.imageList[index+1])
      newImage.key = index+1
      this.setState({selectedImage: newImage})
    }
    else{
      this.getImage()
    }
  }
  //used to switch to the previous imagei n the list
  previousImage(){
    var index = this.state.selectedImage.key
    if (index > 0){
      var newImage = Object.assign({},this.state.imageList[index-1])
      newImage.key = index-1
      this.setState({selectedImage: newImage})
    }
    else{
      alert('This is the last image')
    }
  }
  //an api call to database for the amount of supports this website has
  getSupport(){
    return fetch('http://52.40.151.220:8000/api/getSupport', {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
   })
   .then((response) => {
     if (response.status != 200){
         return
       }
       else{
         return response.json();
       }
   })
   .then((responseJson) => {
     if (responseJson != null){
       this.setState({supports:responseJson.supports})
     }
   })
   .catch((error) => {
     console.error(error);
   });
  }
  //an api call to increment the amount of support by one by calling server side
  giveSupport(){
    return fetch('http://52.40.151.220:8000/api/makeSupport', {
         method: 'GET',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
       })
       .then((response) => {
         if (response.status != 200){
             return
           }
           else{
             return response.json();
           }
       })
       .then((responseJson) => {
         if (responseJson != null){
           this.setState({supports:responseJson.supports})
         }
       })
       .catch((error) => {
         console.error(error);
       });
  }
  //render function for all the images
  renderImages(){
    if (this.state.showImages){
      return(
        this.state.imageList.map((image, i)=>(
            <div className = 'eachImage animated zoomIn' onClick = {this.showModal.bind(this, image, i)}
            onMouseLeave= {this.onMouseLeave.bind(this, i)} onMouseOver= {this.onMouseOver.bind(this,i)} key={i}
              style = {{
                marginTop:window.innerWidth*.005,
                backgroundImage: 'url('+image.image_url+')',
              }}>
                <div id = {i.toString()} className = 'hoverCaption hidden'>
                <p className='hoverText' style={{top:5, left: 10}}>{image.name}</p>
                <p className='hoverText' style={{bottom:10, right: 10}}>- {image.user.fullname}</p>
              </div>
            </div>
          )
        )
      )
    }
  }
  //render a large image when users click on small images for details

  render(){
    return(
      <div>
        <div id = "titleDiv" >
          <FontAwesome
            name='500px'
	          className="animated rotateInDownLeft"
            size='2x'
            style={{cursor:'pointer', marginBottom:'10px'}}
            onClick={()=>window.open("http://500px.com")}/>
          <h1 className='animated slideInDown titleStyle'> 500px Coding Challenge </h1>
          <a className="animated pulse infinite linkToPortfolio" target='blank' href="http://www.percyteng.me"> - Percy Teng</a>
          <div id="supportDiv">
            <FontAwesome
              className ="animated pulse infinite heartIcon"
              name='heart'
              size = '2x'
              onClick={this.giveSupport}
              />
            <p className="animated fadeIn supportText">click to support this website</p>
          </div>
          <p className="animated tada supportReport">Have received {this.state.supports.toString()} supports!</p>
        </div>

        <div id ="wrapper">
          <div id="contentDiv">
            <div style = {{height:'2%',width:'100%'}}>
            </div>
            {this.renderImages()}
          </div>
        </div>

        <FullImage largeImageOpacity= {this.state.largeImageOpacity} showLargeImageModal={this.state.showLargeImageModal}
        selectedImage = {this.state.selectedImage} nextImage={this.nextImage} previousImage={this.previousImage} dismissModal={this.dismissModal.bind(this)}
        />

      </div>
    );
  }
}
