import React, {Component} from 'react';
import {Link} from "react-router";
export default class HomePage extends Component{
  constructor(){
    super()
    this.state={
      imageList: [],
      selectedImage:{},
    }
  }
  componentWillMount(){
    var _this = this
    var imageList = []
    _500px.init({
      sdk_key: '5eec9aac38ad6a4660f3b8f30edac08e110c7405'
    });
    _500px.api('/photos', { feature: 'popular', image_size: 5, page: 2 }, function (response) {
      if (!response.success) {
          alert('Unable to fetch images');
      }
      else{
        console.log(response.data.photos)
        _this.setState({imageList:response.data.photos})
      }
    })
  }
  renderImages(){
    return(
      this.state.imageList.map((image, i)=>(
          <div key={i} className='animated zoomIn'
            style = {{
              width: '32%',
              height:window.innerWidth*0.3*0.8,
              marginTop:window.innerWidth*.005,
              marginLeft: '1%',
              borderRadius: '2%',
              backgroundImage: 'url('+image.image_url+')',
              backgroundSize: 'cover',
              backgroundColor:'#000',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              display:'inline-block',
            }}>

          </div>
        )
      )
    )
  }
  render(){
    const Styles = {
      titleStyle:{
        fontFamily: "Avenir",
        fontSize: '30px',
        fontWeight: 300,
        textAlign: 'center',
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
