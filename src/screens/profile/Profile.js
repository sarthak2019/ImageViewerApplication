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
		this.props.history.push(image_url);
	}
	closeImageModalHandler= () => {
		this.setState({modalImageIsOpen : false});
	}
	inputfullNameChangeHandler = (e) =>{
		this.setState({fullname: e.target.value});
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
		
		return(
		<div>
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
	                        
				<img src={this.props.history.match.params.image_url} className="image-poster" alt="as" />
				
			</Modal>
		</div>
		);
	}
}

export default  Profile;
//export default  makeStyles (classes) (Profile);