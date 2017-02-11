import React, {Component} from 'react';
import {Link} from "react-router";
var currentPage = 1;
export default class HomePage extends Component{
  constructor(){
    super()
    this.state={
      imageList: [],
      selectedImage:{},
      display:[],
      showImages: false,
    }
  }
  componentDidMount(){
    var _this = this
    setTimeout(()=>this.setState({showImages: true}),600)
    window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
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
    };
  }
  componentWillMount(){
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
        _this.setState({imageList:response.data.photos}, ()=>{
          var tmp = new Array(_this.state.imageList.length)
          tmp.fill(0)
          _this.setState({display:tmp})
        })

      }
    })
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
  renderImages(){
    if (this.state.showImages){
      return(
        this.state.imageList.map((image, i)=>(
            <div onMouseLeave= {this.onMouseLeave.bind(this)} onMouseOver= {this.onMouseOver.bind(this,i)} key={i} className='animated zoomIn'
              style = {{
                width:'32%',
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
        boxShadow: '0px 1px 1px #e8e8e8',
        paddingBottom:'5px',
      },
      wrapper:{
        backgroundColor: '#f9f9f9',
        width: '100%',
      }
    }
    return(
      <div>
        <div style={Styles.titleDiv}>
          <h1 className='animated slideInDown' style = {Styles.titleStyle}> 500px Coding Challenge</h1>
        </div>
        <div style = {Styles.wrapper}>
          <div style={Styles.contentDiv}>
            <div style = {{height:'2%',width:'100%'}}>
            </div>
            {this.renderImages()}
          </div>
        </div>
      </div>
    );
  }
}
