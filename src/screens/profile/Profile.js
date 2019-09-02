import React, { Component } from 'react';
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
import {withStyles} from '@material-ui/core/styles';
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
import { constants } from '../../common/utils'
//import './Profile.css'

const styles =  theme =>({
	bigAvatar: {
		margin: '10px !important',
		width: '50px  !important',
		height: '50px  !important'
	},
	gridListPosts: {
		transform: 'translateZ(0)',
		width: '100%'
	},
	gridDiv: {
		margin: 'auto',
  		width: '60%',
	},
	fab: {
		margin: 'spacing(1)'
	},
	hr: {
		marginTop: '10px',
		borderTop: '2px solid #f2f2f2'
	},
	grid: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 90
	},
	sideClass: {
		display: 'flex',
		flexDirection: 'row',
		height: '50%'
	},
	displayInline: {
		display: 'inline'
	},
	imageStandard: {
		height: '70vh'
	}
});

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%,-50%)'
	}
}

class Profile extends Component {

	constructor(props) {
		super(props);
		/*if (sessionStorage.getItem('access-token') == null) {
		  this.props.history.replace('/');
		}*/

		if (sessionStorage.getItem('access-token') == null) {
			props.history.replace('/');
		}
		this.state = {
			information: [],
			image_posts: [],
			counts: [],
			modalIsOpen: false,
			fullnameRequired: "dispNone",
			fullname: "",
			newfullname: "",
			currentImage: "",
			comment: "",
			comments: "",
			currentComment: "",
			isLiked: false,
			modalImageIsOpen: false,
			loggedIn: sessionStorage.getItem("access-token") == null ? false : true
		}
	}

	componentDidMount() {
		
		this.getUserInfo();
		this.getMediaData();
	}

	openModalHandler = () => {
		this.setState({ modalIsOpen: true });
	}
	closeModalHandler = () => {
		this.setState({ modalIsOpen: false, fullnameRequired: "dispNone", value: 0 });
	}
	openImageModalHandler = (image_post) => {
		let currentState = this.state;
		currentState.modalImageIsOpen = true;
		currentState.currentImage = image_post;
		// this.setState({ modalImageIsOpen: true,
		// 	currentImage: image_post, });
		//this.props.history.push(image_url);
		this.setState({state: currentState});

	}
	closeImageModalHandler = () => {
		this.setState({ modalImageIsOpen: false });
	}
	inputfullNameChangeHandler = (e) => {
		this.setState({ newfullname: e.target.value });
	}

	addCommentClickHandler = (id) => {
		if (this.state.currentComment === "" || typeof this.state.currentComment === undefined) {
			return;
		}
		console.log("In addCommentClickHandler");
		let commentList = this.state.comments.hasOwnProperty(id) ?
			this.state.comments[id].concat(this.state.currentComment) : [].concat(this.state.currentComment);
		console.log(" currentComment" + this.state.currentComment);
		this.setState({
			comments: {
				...this.state.comments,
				[id]: commentList
			},
			currentComment: ''
		})
	}



	updateClickHandler = () => {
		this.state.newfullname === "" ? this.setState({ fullnameRequired: "dispBlock" }) : this.setState({ fullnameRequired: "dispNone" });		
		this.setState({fullname: this.state.newfullname});
		this.closeModalHandler();
	}

	render() {
		const{classes} = this.props;
		let hashTags = this.state.image_posts.map(hash => {
			return "#" + hash.tags;
		});
		const comments = this.props;

		return (

			<div>
				<Header
					userProfileUrl={this.state.information.profile_picture}
					screen={"Profile"}
					handleLogout={this.logout}
					handleAccount={this.navigateToAccount} />
				<Grid container justify="center" alignItems="center">
					<Avatar alt={this.state.fullname} src={this.state.information.profile_picture} className={classes.bigAvatar} />
					<span>
						<div>{this.state.information.username} </div>
						<div>Posts: {this.state.counts.media} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Follows: {this.state.counts.follows} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Followed By: {this.state.counts.followed_by} </div>
						<div>{this.state.fullname}&nbsp;
							<Fab size="small" color="secondary" aria-label="edit" className={classes.fab}  >
								<EditIcon  className={classes.fab} onClick={this.openModalHandler} />
							</Fab>
						</div>
					</span>
				</Grid>
				<Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Edit" onRequestClose={this.closeModalHandler} style={customStyles}>
					<FormControl label="Edit">
						<Typography >Edit </Typography>
						<TextField required id="fullname" label="Full Name" onChange={this.inputfullNameChangeHandler} margin="normal" />
						<FormHelperText className={this.state.fullnameRequired}><span className="red">required</span></FormHelperText>
					</FormControl>
					{/*<FormControl required>
							<Input id="fullname" placeholder="Full Name" type="text" fullname={this.state.fullname} onChange={this.inputfullNameChangeHandler}/>
							<FormHelperText className={this.state.fullnameRequired}><span className="red">required</span></FormHelperText>
						</FormControl><br/> */}
					<br /><br />
					<Button variant="contained" color="primary" onClick={this.updateClickHandler}>UPDATE</Button>
				</Modal>
				<div justify="center" className={classes.gridDiv}>
					<GridList cols={3} justify="center" className={classes.gridListPosts} >
						{this.state.image_posts.map(image_post => (
							<GridListTile key={"post" + image_post.id}>
								<img src={image_post.images.thumbnail.url} className="image-poster" alt="Click" onClick={() => this.openImageModalHandler(image_post)} />
							</GridListTile>
						))}
					</GridList>
				</div>
				
				<Modal ariaHideApp={false} isOpen={this.state.modalImageIsOpen} contentLabel="Images" onRequestClose={this.closeImageModalHandler} style={customStyles}>
				{(this.state.currentImage !== "") && <Grid container justify="top" alignItems="center"> 
							 <img src={this.state.currentImage.images.standard_resolution.url} className={classes.imageStandard} alt="as" />
							<Avatar alt={this.state.fullname} src={this.state.information.profile_picture} className={classes.bigAvatar} />
								{this.state.information.username}
								{(this.state.currentImage.caption !== null) && <span>{(this.state.currentImage.caption.text).substring(0, this.state.currentImage.caption.text.indexOf('#'))}</span>}

					</Grid>}
					
					
					{/* {this.state.image_posts.map(user_post => (
						<div key={user_post.id}>
							<Avatar alt={user_post.user.full_name} src={user_post.user.profile_picture} className={classes.bigAvatar} />
							<span>
								<div>{user_post.user.username} </div>
							</span>
							<hr />
							<span>{user_post.caption} {user_post.created_time}</span>
							<Typography style={{ color: '#4dabf5' }} component="p" >
								{hashTags.join(' ')}
							</Typography>
							<span>
								<IconButton aria-label="Add to favorites" onClick={this.onLikeClicked.bind(this, user_post.id)}>
									{this.state.isLiked && <FavoriteIconFill style={{ color: '#F44336' }} />}
									{!this.state.isLiked && <FavoriteIconBorder />}
								</IconButton>
								<Typography component="p">
									{user_post.likes.count} Likes
					              </Typography>
							</span>
							{comments.hasOwnProperty(user_post.id) && comments[user_post.id].map((comment, index) => {
								return (
									<div key={index} className="row">
										<Typography component="p" style={{ fontWeight: 'bold' }}>
											{sessionStorage.getItem('username')}:
				                  </Typography>
										<Typography component="p" >
											{comment}
										</Typography>
									</div>
								)
							})}
							<div >
								<FormControl style={{ flexGrow: 1 }}>
									<InputLabel htmlFor="comment">Add Comment</InputLabel>
									<Input id="comment" value={this.state.comment} onChange={this.commentChangeHandler} />
								</FormControl>
								<FormControl>
									<Button onClick={this.onAddCommentClicked.bind(this, user_post.id)}
										variant="contained" color="primary">
										ADD
					                </Button>
								</FormControl>
							</div>
						</div>
					))} */}
				</Modal>
			</div>
		);
	}

	getUserInfo = () => {
		let that = this;
		let url = `${constants.userInfoUrl}/?access_token=${sessionStorage.getItem('access-token')}`;
		return fetch(url,{
		  method:'GET',
		}).then((response) =>{
			return response.json();
		}).then((jsonResponse) =>{
		  that.setState({
			information:jsonResponse.data,
			counts:jsonResponse.data.counts,
			fullname:jsonResponse.data.full_name,
			newfullname:jsonResponse.data.full_name
		  });
		}).catch((error) => {
		  console.log('error user data',error);
		});
	  }
	
	  getMediaData = () => {
		let that = this;
		let url = `${constants.userMediaUrl}/?access_token=${sessionStorage.getItem('access-token')}`;
		return fetch(url,{
		  method:'GET',
		}).then((response) =>{
			return response.json();
		}).then((jsonResponse) =>{
		  that.setState({
			image_posts:jsonResponse.data,
		  });
		}).catch((error) => {
		  console.log('error user data',error);
		});
	  }

	commentChangeHandler = (e) => {
		this.setState({
			currentComment: e.target.value
		});
	}

	onLikeClicked = (id) => {
		if (this.state.isLiked) {
			this.setState({
				isLiked: false
			});
		} else {
			this.setState({
				isLiked: true
			});
		}
		this.props.onLikedClicked(id)
	}

	onAddCommentClicked = (id) => {
		if (this.state.comment === "" || typeof this.state.comment === undefined) {
			return;
		}
		this.setState({
			comment: ""
		});
		this.props.onAddCommentClicked(id);
	}

	logout = () => {
		sessionStorage.clear();
		this.props.history.replace('/');
	}

	navigateToAccount = () => {
		this.props.history.push('/profile');
	}
}

export default withStyles(styles)(Profile);
//export default  makeStyles (classes) (Profile);