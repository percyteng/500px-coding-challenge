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
          <div key={i} className = 'images'
            style = {{
              width: '32%',
              height:window.innerWidth*0.3*0.8,
              marginTop:window.innerWidth*.005,
              marginLeft: '1%',
              backgroundImage: 'url('+image.image_url+')',
              backgroundSize: 'contain',
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
        width:'100%',
        height: '500px',
        backgroundColor: '#f9f9f9',
      },
      titleDiv:{
        marginTop: "20px",
        marginBottom: '1px',
        boxShadow: '0px 1px 1px #e8e8e8',
        paddingBottom:'5px',
      }
    }
    return(
      <div>
        <div style={Styles.titleDiv}>
          <h1 className='animated slideInUp' style = {Styles.titleStyle}> 500px Coding Challenge</h1>
        </div>
        <div style={Styles.contentDiv}>
          {this.renderImages()}
        </div>
      </div>
    );
  }
}
