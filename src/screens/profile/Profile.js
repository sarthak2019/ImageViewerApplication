import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from 'react-modal';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import Header from '../../common/header/Header';
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
    fab: {
    	margin: 'spacing(1)',
   },
});

const customStyles = {
		content : {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%,-50%)'
		}
}

class Profile extends Component{
	
	constructor(){
		super();
		this.state={
			information: [],
			image_posts: [],
			counts:[],
			modalIsOpen: false,
			fullnameRequired: "dispNone",
			fullname: "",
			currentImage: "",
			comment: "",
			comments: "",
			currentComment: "",
			isLiked : false,
			loggedIn: sessionStorage.getItem("access-token") == null ? false : true
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
	
	openModalHandler= () => {
		this.setState({modalIsOpen : true});
	}
	closeModalHandler= () => {
		this.setState({modalIsOpen : false,fullnameRequired:"dispNone",value: 0});
	}
	openImageModalHandler= (image_url) => {
		this.setState({modalImageIsOpen : true});
		this.setState({currentImage : image_url});
		//this.props.history.push(image_url);
		
	}
	closeImageModalHandler= () => {
		this.setState({modalImageIsOpen : false});
	}
	inputfullNameChangeHandler = (e) =>{
		this.setState({fullname: e.target.value});
	}

	addCommentClickHandler = (id)=>{
	    if (this.state.currentComment === "" || typeof this.state.currentComment === undefined) {
	      return;
	    }
	 console.log("In addCommentClickHandler");
	    let commentList = this.state.comments.hasOwnProperty(id)?
	      this.state.comments[id].concat(this.state.currentComment): [].concat(this.state.currentComment);
	 console.log(" currentComment"+this.state.currentComment);	
	    this.setState({
	      comments:{
	        ...this.state.comments,
	        [id]:commentList
	      },
	      currentComment:''
	    })
	  }

	
	
 	 updateClickHandler = () =>{
		this.state.fullname=== "" ? this.setState({fullnameRequired: "dispBlock"}) : this.setState({fullnameRequired: "dispNone"});
		let updateFullName= JSON.stringify({
			  "full_name": this.state.fullname,
		})
		let xhrUpdate = new XMLHttpRequest ();
		let that=this;
		xhrUpdate.addEventListener("readystatechange", function(){
			if(this.readyState===4){
				console.log("--"+this.responseText);
			}
		});
		var baseUrl="https://api.instagram.com/v1/users/self/?access_token=18621945434.69f451e.ba20db8552f241eabbaa87e804f73169";
		//xhrSignUp.open("POST", this.props.baseUrl + "signup");
		xhrUpdate.open("POST", baseUrl);
		xhrUpdate.setRequestHeader("Content-Type","application/json");
		xhrUpdate.setRequestHeader("Cache-Control", "no-cache");
        	xhrUpdate.send(updateFullName);
	}
	
	render(){
		let hashTags = this.state.image_posts.map(hash =>{
      return "#"+hash.tags;
    });
	const comments = this.props;
 	
		return(
		
		<div>
			<Header
		          userProfileUrl={this.state.information.profile_picture}
		          screen={"Profile"}
		          handleLogout={this.logout}
		          handleAccount={this.navigateToAccount}/>
			<Grid container justify="center" alignItems="center">
				<Avatar alt={this.state.information.full_name} src={this.state.information.profile_picture}  className={classes.bigAvatar}/>
		             <span>
				<div>{this.state.information.username} </div>
				<div>Posts: {this.state.counts.media}  Follows: {this.state.counts.follows} Followed By: {this.state.counts.followed_by} </div>
				<div>{this.state.information.full_name}   
					<Fab color="secondary" aria-label="edit" className={classes.fab}  >
				        	<EditIcon onClick={this.openModalHandler} />
      					</Fab>
				</div>
			     </span>
			</Grid>
			<Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Edit" onRequestClose={this.closeModalHandler} style={customStyles}>
						<FormControl label="Edit">
							<Typography >Edit </Typography>
							<TextField  required   id="fullname"   label="Full Name"   defaultValue={this.state.information.full_name}   onChange={this.inputfullNameChangeHandler} margin="normal"  />
							<FormHelperText className={this.state.fullnameRequired}><span className="red">required</span></FormHelperText>
						</FormControl>							
						{/*<FormControl required>
							<Input id="fullname" placeholder="Full Name" type="text" fullname={this.state.fullname} onChange={this.inputfullNameChangeHandler}/>
							<FormHelperText className={this.state.fullnameRequired}><span className="red">required</span></FormHelperText>
						</FormControl><br/> */}
						 <br /><br />
						<Button variant="contained" color="primary" onClick={this.updateClickHandler}>UPDATE</Button>
			</Modal>
			<GridList cols={3} className={classes.gridListPosts} >
       			   {this.state.image_posts.map(image_post => (
				<GridListTile key={"post" +image_post.id}> 
	                            <img src={image_post.images.thumbnail.url} className="image-poster" alt="Click" onClick={() => this.openImageModalHandler(image_post.images.standard_resolution.url)} />
	                        </GridListTile>
	                    ))}
	                </GridList>
			<Modal ariaHideApp={false} isOpen={this.state.modalImageIsOpen} contentLabel="Images" onRequestClose={this.closeImageModalHandler} style={customStyles}>
			<img src={this.state.currentImage} className="image-poster" alt="as" />
			
                         {this.state.image_posts.map(user_post => (
			     <div key={user_post.id}>    
					<Avatar alt={user_post.user.full_name} src={user_post.user.profile_picture}  className={classes.bigAvatar}/>
				        <span>
						<div>{user_post.user.username} </div>
					</span>
					<hr/>
					<span>{user_post.caption} {user_post.created_time}</span>
					<Typography style={{color:'#4dabf5'}} component="p" >
               					 {hashTags.join(' ')}
              				</Typography>
					<span>
					  	<IconButton aria-label="Add to favorites" onClick={this.onLikeClicked.bind(this,user_post.id)}>
					                {this.state.isLiked && <FavoriteIconFill style={{color:'#F44336'}}/>}
					                {!this.state.isLiked && <FavoriteIconBorder/>}
					              </IconButton>
					              <Typography component="p">
					                {user_post.likes.count} Likes
					              </Typography>
					</span>
					{comments.hasOwnProperty(user_post.id) && comments[user_post.id].map((comment, index)=>{
				              return(
				                <div key={index} className="row">
				                  <Typography component="p" style={{fontWeight:'bold'}}>
				                    {sessionStorage.getItem('username')}:
				                  </Typography>
				                  <Typography component="p" >
				                    {comment}
				                  </Typography>
				                </div>
				              )
			               })}
					<div >
					              <FormControl style={{flexGrow:1}}>
					                <InputLabel htmlFor="comment">Add Comment</InputLabel>
					                <Input id="comment" value={this.state.comment} onChange={this.commentChangeHandler}/>
					              </FormControl>
					              <FormControl>
					               {/* <Button onClick={this.addCommentClickHandler(user_post.id)}
					                   variant="contained" color="primary">*/}
							<Button onClick={this.onAddCommentClicked.bind(this,user_post.id)}
							  variant="contained" color="primary">
					                  ADD
					                </Button>
					              </FormControl>
            				</div>
			   </div>
			))}
			</Modal>
		</div>
		);
	}
	
	commentChangeHandler = (e) => {
	    this.setState({
	      currentComment:e.target.value
	    });
	 }
	
	 onLikeClicked = (id) => {
	    if (this.state.isLiked) {
	      this.setState({
	        isLiked:false
	      });
	    }else {
	      this.setState({
	        isLiked:true
	      });
	    }
	    this.props.onLikedClicked(id)
	 }

	onAddCommentClicked = (id) => {
	    if (this.state.comment === "" || typeof this.state.comment === undefined) {
	      return;
	    }
	    this.setState({
	      comment:""
	    });
	    this.props.onAddCommentClicked(id);
	 }
		
	 logout = () => {
	    sessionStorage.clear();
	    this.props.history.replace('/');
	  }
	
	 navigateToAccount = () =>{
	    this.props.history.push('/profile');
	  }
}

export default  Profile;
//export default  makeStyles (classes) (Profile);