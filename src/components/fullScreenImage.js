import React, {Component} from 'react';
import ReactStateAnimation from 'react-state-animation'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'

var currentPage = 1;
export default class HomePage extends Component{
  constructor(){
    super();
    this.state={
      spinDismiss: false,
      showLargeImageModal: 'none',
      largeImageOpacity: 0,
    }
  }

  render(){
    return(
      <div id="largeImageDiv"
        style={{
          opacity: this.props.largeImageOpacity,
          display: this.props.showLargeImageModal
        }}>
        <div id="captionSection">
          <FontAwesome
            name='times'
            onClick={this.props.dismissModal}
            onMouseOver={()=>this.setState({spinDismiss: true})}
            onMouseLeave={()=>this.setState({spinDismiss:false})}
            spin={this.state.spinDismiss}
            size='3x'
            id = "dismissModal"
            />

            <div>
              <img className='userPic' src = {this.props.selectedImage.user.userpic_url} width='50' height='50'/>
              <p id='userName'>{this.props.selectedImage.user.fullname}</p>
            </div>
            <hr/>

            <p id = 'imageName'>{this.props.selectedImage.name}</p>
            <div>
              <FontAwesome
                name='heart'
                id='likes'
              />
              <p id='upVotes'>{this.props.selectedImage.positive_votes_count}</p>
            </div>

            <p id='description'>{this.props.selectedImage.description}</p>
            <p id='createdTime'>{moment(this.props.selectedImage.created_at).format('YYYY-MM-DD')}</p>
        </div>

        <div id ='imageSection'>
          <FontAwesome
            name='arrow-circle-left'
            onClick={this.props.lastImage}
            className = 'arrows'
            size = {window.innerWidth > 768 ? '3x' : '2x'}
            />
          <div id='imageContainer' style={{backgroundImage: 'url('+this.props.selectedImage.image_url+')',}}></div>
          <FontAwesome
            name='arrow-circle-right'
            className = 'arrows'
            size = {window.innerWidth > 768 ? '3x' : '2x'}
            onClick={this.props.nextImage}
            />
        </div>

      </div>
    )
  }
}
