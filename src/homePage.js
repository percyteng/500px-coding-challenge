import React, {Component} from 'react';
import {Link} from "react-router";
import ReactStateAnimation from 'react-state-animation'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'
import promise from 'es6-promise';
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
      display:[],
      test: 0,
      showImages: false,
      showLargeImageModal: 'none',
      spinDismiss: false,
      largeImageOpacity: 0,
    }
    this._animate = new ReactStateAnimation(this)
    this.giveSupport = this.giveSupport.bind(this)
    this.nextImage = this.nextImage.bind(this)
    this.lastImage = this.lastImage.bind(this)
  }

  //this function will be called when users scroll to the bottom and it will get more images through 500px api
  getMoreImage(){
    var _this = this
    _500px.api('/photos', { feature: 'popular', image_size: 5, page: currentPage }, function (response) {
      if (!response.success) {
          alert('Unable to fetch images');
      }
      else{
        var newList = _this.state.imageList.slice()
        newList.push.apply(newList, response.data.photos)
        console.log(newList.length)
        _this.setState({imageList:newList}, ()=>{
          var tmp = new Array(_this.state.imageList.length)
          tmp.fill(0)
          _this.setState({display:tmp})
        })

      }
    })
  }
  componentDidMount(){
    var _this = this
    setTimeout(()=>this.setState({showImages: true}),1000)
    window.onscroll = function(ev) {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        _this.getMoreImage()
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
    _500px.api('/photos', { feature: 'popular', image_size: 5, page: currentPage }, function (response) {
      if (!response.success) {
          alert('Unable to fetch images');
      }
      else{
        currentPage += 1
        console.log(response.data.photos)
        _this.setState({selectedImage:response.data.photos[0]})
        _this.setState({imageList:response.data.photos}, ()=>{
          var tmp = new Array(_this.state.imageList.length)
          tmp.fill(0)
          _this.setState({display:tmp})
        })

      }
    })
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
    var tmp = new Array(this.state.display.length)
    tmp.fill(0)
    tmp[i] = 1
    this.setState({display: tmp})
  }
  //gets called when the mouse gets away a image
  onMouseLeave(){
    var tmp = new Array(this.state.display.length)
    tmp.fill(0)
    this.setState({display: tmp})
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
      this.getMoreImage()
    }
  }
  //used to switch to the previous imagei n the list
  lastImage(){
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
            onMouseLeave= {this.onMouseLeave.bind(this)} onMouseOver= {this.onMouseOver.bind(this,i)} key={i}
              style = {{
                marginTop:window.innerWidth*.005,
                backgroundImage: 'url('+image.image_url+')',
              }}>
                <div className = 'hoverCaption' style={{
                  opacity: this.state.display[i]
                }}>
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
 renderLargeImages(){
   return(
     <div id="largeImageDiv"
       style={{
         opacity: this.state.largeImageOpacity,
         display: this.state.showLargeImageModal
       }}>
       <div id="captionSection">
         <FontAwesome
           name='times'
           onClick={this.dismissModal.bind(this)}
           onMouseOver={()=>this.setState({spinDismiss: true})}
           onMouseLeave={()=>this.setState({spinDismiss:false})}
           spin={this.state.spinDismiss}
           size='3x'
           id = "dismissModal"
           />

           <div>
             <img className='userPic' src = {this.state.selectedImage.user.userpic_url} width='50' height='50'/>
             <p id='userName'>{this.state.selectedImage.user.fullname}</p>
           </div>
           <hr/>

           <p id = 'imageName'>{this.state.selectedImage.name}</p>
           <div>
             <FontAwesome
               name='heart'
               id='likes'
             />
             <p id='upVotes'>{this.state.selectedImage.positive_votes_count}</p>
           </div>

           <p id='description'>{this.state.selectedImage.description}</p>
           <p id='createdTime'>{moment(this.state.selectedImage.created_at).format('YYYY-MM-DD')}</p>
       </div>

       <div id ='imageSection'>
         <FontAwesome
           name='arrow-circle-left'
           size = '3x'
           onClick={this.lastImage}
           className = 'arrows'
           />
         <div id='imageContainer' style={{backgroundImage: 'url('+this.state.selectedImage.image_url+')',}}></div>
         <FontAwesome
           name='arrow-circle-right'
           size='3x'
           className = 'arrows'
           onClick={this.nextImage}
           />
       </div>

     </div>
   )
 }
  render(){
    return(
      <div>
        <div id = "titleDiv" >
          <FontAwesome
            name='500px'
            size='2x'
            style={{cursor:'pointer'}}
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

        {this.renderLargeImages()}

      </div>
    );
  }
}
