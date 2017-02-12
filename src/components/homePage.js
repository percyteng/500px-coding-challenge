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
    setTimeout(()=>this.setState({showImages: true}),600)
    window.onscroll = function(ev) {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        _this.getMoreImage()
      }
    };
  }
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

  showModal(image, i){
    var tmp = Object.assign({}, image)
    tmp.key = i
    this.setState({selectedImage:tmp})
    this.setState({showLargeImageModal: 'inline'}, ()=>{
      this._animate.linearIn('largeImageOpacity', 1/*end value*/, 500/*duration(ms)*/)
    })
  }
  dismissModal(){
    this._animate.linearIn('largeImageOpacity', 0/*end value*/, 500/*duration(ms)*/)
    setTimeout(()=>this.setState({showLargeImageModal:'none'}), 500)
  }
  onMouseOver(i){
    var tmp = new Array(this.state.display.length)
    tmp.fill(0)
    tmp[i] = 1
    this.setState({display: tmp})

  }
  onMouseLeave(){
    var tmp = new Array(this.state.display.length)
    tmp.fill(0)
    this.setState({display: tmp})
  }
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
  getSupport(){
    return fetch('http://localhost:7000/api/getSupport', {
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
  giveSupport(){
    return fetch('http://localhost:7000/api/makeSupport', {
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
  renderImages(){
    if (this.state.showImages){
      return(
        this.state.imageList.map((image, i)=>(
            <div onClick = {this.showModal.bind(this, image, i)} onMouseLeave= {this.onMouseLeave.bind(this)} onMouseOver= {this.onMouseOver.bind(this,i)} key={i} className='animated zoomIn'
              style = {{
                width:'32%',
                cursor: 'pointer',
                position:'relative',
                height:window.innerWidth*0.3*0.8,
                marginTop:window.innerWidth*.005,
                marginLeft: '.7%',
                borderRadius: '2%',
                backgroundImage: 'url('+image.image_url+')',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                display:'inline-block',
              }}>
                <div style={{
                  paddingLeft: '5px',
                  height: '20%',
                  backgroundColor:'rgba(0, 0, 0, .5)',
                  position:'relative',
                  opacity: this.state.display[i]
                }}>
                <p style={{color: '#fff', marginLeft: '10px', paddingTop:'10px',fontFamily: 'Avenir', fontSize: 13}}>{image.name}</p>
                <p style={{color: '#fff', position:'absolute', bottom:10, right: 10, fontFamily: 'Avenir', fontSize: 13}}>- {image.user.fullname}</p>
              </div>
            </div>
          )
        )
      )
    }
  }
  render(){
    const Styles = {
      titleStyle:{
        fontFamily: "Avenir",
        fontSize: '30px',
        fontWeight: 300,
        marginLeft: 20,
      },
      contentDiv:{
        marginLeft: 'auto',
        marginRight: 'auto',
        width:'80%',
        backgroundColor: '#f9f9f9',
        height: '500px',
      },

      titleDiv:{
        marginTop: "20px",
        marginBottom: '1px',
        position:'relative',
        textAlign:'center',
        boxShadow: '0px 1px 1px #e8e8e8',
        paddingBottom:'5px',
      },
      wrapper:{
        backgroundColor: '#f9f9f9',
        width: '100%',
      },
      captionSection:{
        backgroundColor:'#fff',
        position:'relative',
        height:'100%',
        overflowY:'scroll',
        float:'right',
        width:'25%',
        marginLeft:'20px',
      },
      imageContainer:{
        margin:'3%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height:'100%',
        width:'80%',
        backgroundPosition: 'center',
        backgroundImage: 'url('+this.state.selectedImage.image_url+')',
      }
    }
    return(
      <div>
        <div style={Styles.titleDiv}>
          <h1 className='animated slideInDown' style = {Styles.titleStyle}> 500px Coding Challenge </h1>
          <a className="animated tada" target='blank' style={{position:'absolute', right:20, bottom:10, color: '#0B0080', textDecoration: 'none', fontFamily:'Avenir', fontStyle:'italic', }} href="http://www.percyteng.me"> - Percy Teng</a>
          <div style={{display:'flex', alignItems:'center', width: '30%', position:'absolute', left:20, top:0}}>
            <FontAwesome
              className ="animated bounce infinite"
              name='heart'
              size = '2x'
              onClick={this.giveSupport}
              style={{cursor:'pointer', color: '#fc4b4b', }}/>
            <p className="animated fadeIn" style={{fontFamily:'Avenir', marginLeft:'5px', fontSize: '12px'}}>click to support this website</p>
          </div>
          <p className="animated tada" style={{fontFamily:'Avenir', marginLeft:'5px', fontSize: '15px', position:'absolute', left:30, bottom:10}}>Have received {this.state.supports.toString()} supports!</p>
        </div>
        <div style = {Styles.wrapper}>
          <div style={Styles.contentDiv}>
            <div style = {{height:'2%',width:'100%'}}>
            </div>
            {this.renderImages()}
          </div>
        </div>
        <div style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 10,
          opacity: this.state.largeImageOpacity,
          display: this.state.showLargeImageModal
        }}>
          <div style={Styles.captionSection}>
            <FontAwesome
              name='times'
              onClick={this.dismissModal.bind(this)}
              onMouseOver={()=>this.setState({spinDismiss: true})}
              onMouseLeave={()=>this.setState({spinDismiss:false})}
              spin={this.state.spinDismiss}
              size='3x'
              style={{ cursor: 'pointer', marginRight:'20px', marginTop:'20px', color: '#da9843', float: 'right'}}
            />

              <div>
                <img className='userPic' src = {this.state.selectedImage.user.userpic_url} width='50' height='50'/>
                <p style={{marginLeft:'10px', marginTop:'10px', verticalAlign: '80%', fontWeight:100, display:'inline-block', fontSize:'1em', fontFamily:'Avenir'}}>{this.state.selectedImage.user.fullname}</p>
              </div>
              <hr/>
              <p style={{marginLeft:'20px', marginTop:'20px',fontWeight:100, fontSize:'1.2em', fontStyle:'italic', fontFamily:'Avenir'}}>{this.state.selectedImage.name}</p>
              <div>
                <FontAwesome
                  name='heart'
                  style={{marginLeft:'20px', marginTop:'20px', color: '#fc4b4b', display:'inline-block'}}
                />
                <p style={{marginLeft:'5px',display:'inline-block', marginTop:'20px',fontWeight:100, fontSize:'1em', fontFamily:'Avenir'}}>{this.state.selectedImage.positive_votes_count}</p>
              </div>
              <p style={{marginLeft:'20px', color: '#606060', marginTop:'20px',fontWeight:100, fontSize:'1em', fontFamily:'Avenir'}}>{this.state.selectedImage.description}</p>
              <p style={{marginRight:'20px', marginTop:'20px', float:'right', fontWeight:100, fontSize:'0.8em', fontFamily:'Avenir', color: '#a5a5a5'}}>{moment(this.state.selectedImage.created_at).format('YYYY-MM-DD')}</p>
          </div>

          <div style={{height:'90%', marginTop:'20px',maxWidth:'80%', marginLeft:'2%', display: 'flex', alignItems:'center', justifyContent:'center'}}>
            <FontAwesome
              name='arrow-circle-left'
              size = '3x'
              onClick={this.lastImage}
              style={{cursor:'pointer', color: '#ccc',}}
            />
            <div style={Styles.imageContainer}></div>
            <FontAwesome
              name='arrow-circle-right'
              size='3x'
              onClick={this.nextImage}
              style={{cursor:'pointer', color: '#ccc',}}
            />
          </div>
        </div>
      </div>
    );
  }
}
