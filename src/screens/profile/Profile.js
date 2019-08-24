import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
//import './Profile.css'

const classes = makeStyles({
  bigAvatar: {
    margin: '10px !important' ,
    width: '50px  !important',
    height: '50px  !important',
  },
  gridListPosts: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
});

class Profile extends Component{
	
	constructor(){
		super();
		this.state={
			information: [],
			image_posts: [],
			counts:[]
		}
	}

	componentWillMount(){
		//Released movies
		let data=null;
		let xhr= new XMLHttpRequest();
		let that = this;
		xhr.addEventListener("readystatechange", function(){
			if(this.readyState===4){	
				that.setState({		
					 information: JSON.parse(this.responseText).data,
					 counts: JSON.parse(this.responseText).data.counts
				})
			}
		});

		//xhr.open("GET",this.props.baseUrl+"movies");
		var baseUrl="https://api.instagram.com/v1/users/self/?access_token=18621945434.69f451e.ba20db8552f241eabbaa87e804f73169";
		xhr.open("GET", baseUrl);
		//xhr.open("GET", this.props.baseUrl + "movies?status=PUBLISHED");
		xhr.setRequestHeader("Cache-Control", "no-cache");
        	xhr.send(data);

		//Released movies
		let dataReleased= null;
		let xhrReleased = new XMLHttpRequest ();
		xhrReleased.addEventListener("readystatechange", function(){
			if(this.readyState===4){
				that.setState({	
					image_posts: JSON.parse(this.responseText).data
				})
			}
		});
		baseUrl="https://api.instagram.com/v1/users/self/media/recent?access_token=18621945434.69f451e.ba20db8552f241eabbaa87e804f73169";
		xhrReleased.open("GET", baseUrl);
		//xhrReleased.open("GET", this.props.baseUrl + "movies?status=RELEASED");
		xhrReleased.setRequestHeader("Cache-Control", "no-cache");
        	xhrReleased.send(dataReleased);
	} 
	
	render(){
		
	/*	const classes = makeStyles({
  avatar: {
    margin: 10,
 width: 80,
    height: 80,
  },
  bigAvatar: {
    margin: 10 ,
    width: 50 !important,
    height: 50,
  },
});;*/
		return(
		<div>
			<Grid container justify="center" alignItems="center">
		      		{/*<Avatar alt="Remy Sharp" src="https://scontent.cdninstagram.com/vp/dd761a583d5eef0f83a8aac123552f5c/5E1526DD/t51.2885-19/s150x150/67353256_511628902927241_6573631095034609664_n.jpg?_nc_ht=scontent.cdninstagram.com" className="MuiAvatar-root" />
				<Avatar alt="Remy Sharp" src="https://scontent.cdninstagram.com/vp/dd761a583d5eef0f83a8aac123552f5c/5E1526DD/t51.2885-19/s150x150/67353256_511628902927241_6573631095034609664_n.jpg?_nc_ht=scontent.cdninstagram.com"  className={classes.bigAvatar}/>*/}
				<Avatar alt={this.state.information.full_name} src={this.state.information.profile_picture}  className={classes.bigAvatar}/>
		             <span>
				<div>{this.state.information.username} </div>
				<div>Posts: {this.state.counts.media}  Follows: {this.state.counts.follows} Followed By: {this.state.counts.followed_by} </div>
				<div>{this.state.information.full_name} </div>
	
			     </span>
			</Grid>
			<GridList cols={3} className={classes.gridListPosts} >
	                  { /* {image_posts.map(image_post => (
				
	                        <GridListTile key={image_post.id}> */},
			 {this.state.image_posts.map(image_post => (
				<GridListTile key={"post" +image_post.id}> 
	                            <img src={image_post.images.thumbnail.url} className="movie-poster" alt="Click" />
	                        </GridListTile>
	                    ))}
	                </GridList>
		</div>
		);
	}
}

export default  Profile;
//export default  makeStyles (classes) (Profile);