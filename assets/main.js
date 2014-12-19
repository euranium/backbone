//shows login stuff on mouse over of login icon
$('#login').mouseover(function(){
	$( '#login' ).hide();
	$( '#signin' ).hide(); 
	//fades out todoapp
	$( '#todoapp' ).fadeOut( 500, function(){
		//then fades in the forms
		$( '#forms' ).fadeIn( 500, function(){
			//when your mouse leaves form page, it dispears
			$('#exit').click(function(){
				//the forms fade out
				$('#forms').fadeOut(500, function(){
					$( '#login' ).show();
					$( '#signin' ).show(); 
					//and the todoapp fades back in
					$('#todoapp').fadeIn(500)
				});
			});
		});
	});
});
//same stuff as above, happens when mouse over signin icon
$('#signin').mouseover(function(){
	$( '#login' ).hide();
	$( '#signin' ).hide();
	$( '#todoapp' ).fadeOut( 500, function(){
		$( '#forms' ).fadeIn( 500, function(){
			$('#exit').click(function(){
				$('#forms').fadeOut(500, function(){
					$( '#login' ).show();
					$( '#signin' ).show();
					$('#todoapp').fadeIn(500)
				});
			});
		});
	});
});

$( '#signout').click(function(){
	$( '#signout' ).fadeOut( 400, function(){
		$( '#new-todo' ).attr('placeholder', 'What needs to be done?');
		$( '#login' ).fadeIn(400);
		$( '#signin' ).fadeIn(400);
		$( '#forms' ).hide();
		localStorage.removeItem('loggedIn');
	});
});
function setUser (user){
	console.log(user);
	$( '#new-todo' ).attr('placeholder', 'What needs to be done ' + user.names +'?');
	$( '#login' ).hide();
	$( '#signin' ).hide();
	$( '#forms' ).fadeOut(500);
	$( '#signout' ).show(); 
	$( '#todoapp' ).fadeIn(500);
};

$( document ).ready(function (){
	if (! localStorage.getItem('loggedIn')){
		return false;
	}
	//the json of the saved last user needs to be parsed twice for some reason
	var jstring = JSON.parse(localStorage.getItem('loggedIn'));
	console.log(localStorage.getItem('loggedIn'));
	var newJstring = getUser(jstring);
	//logs in last user
	setUser(newJstring)
});

function getUser ( jstring ){
	console.log(jstring);
	var user = {}
	user.names = jstring['names'];
	user.emails = jstring['email'];
	return user;
}

$( '#user-form' ).submit(function( event ){
	//prevent page from reloading
	event.preventDefault();
	var user = $('#userID').val();
	var pass = $('userPassword').val();
	//if user did not enter an email 
	if ( user === ''){
		return alert('Please enter a user name');
	}
	if ( pass !== undefined){
		alert('The password is not required and will not be saved because I am saving to local storage, which is not secure');
	}
	if (! localStorage.getItem('RainiersBackbone')){
		return alert('There are no users stored in local memory, please create an account');
	}
	//get the json string under name 'RainersBackbone' from local storage
	var id= localStorage.getItem('RainiersBackbone');
	//parse json string into an object
	var jstring = JSON.parse(id);
	//get index of email in array
	var namePoss = jstring.email.indexOf(user)
	//if index = -1 then there is no email in array
	if (namePoss === -1){
		return alert('No user with that email, please enter a valid email');
	}
	//if not -1, then get their name from that same possition in the array
	var name = jstring.names[namePoss];
	//set token for last user logged in
	var userID = {}
	userID.names = name;
	userID.email = email;
	var ID = JSON.stringify(userID);
	localStorage.setItem('loggedIn', ID);
	//pass on the user id and log them in
	setUser(userID);
});
$( '#log-in' ).submit(function( event ){
	//prevent page from reloading
	event.preventDefault();
	var user = $('#userName').val();
	var email = $('#email').val();
	//if the user did not enter a name
	if (user === ''){
		//if the use did not also enter an email
		if (email === ''){
			return alert("please enter a name and email. I wont send you any email, this isn't even hooked up to a data base, its just for loggin in localy");
		}
		//if user only did not enter a name
		alert("please enter a name, this will not be sent to me, it's kept in local storage on your computer");
	}
	//if user only did not enter an email
	if (email === ''){
		return alert("Please enter an email. This is for login, I won't save your email, its all on your computures local storage, its just for logging in");
	}
	//set up the user object
	var newid = {};
	newid.names = [user];
	newid.email = [email]; 
	//if there is no object 'RainiersBackbone' in local storage
	if (! localStorage.getItem('RainiersBackbone')){
		//know there are no users bc there is no local memory of any
		//set the object into a json string in local memory as a json string if it hasn't already been done
		//set a token for the user that persits through reloat
		localStorage.setItem('loggedIn', JSON.stringify(newid));
		setUser(newid);
		console.log('storage empty, adding new user ' + newid);
		return localStorage.setItem('RainiersBackbone', JSON.stringify(newid));
	}
	//get the json object from local storage
	var id = localStorage.getItem('RainiersBackbone');
	//parse the json into an object
	var jstring = JSON.parse(id);
	//push new user on the 'name' array
	var num = jstring['email'].indexOf(email);
	if (num !== -1){
		//if the indexOf does not return -1, someone alreay has the desired email
		return alert('Sorry, the user name is already taken');
	}
	//can set up user and log them in
	setUser(newid);
	jstring['names'].push(user);
	//push new email on the 'email' array
	jstring['email'].push(email);
	console.log('nonempty new user ' +newid);
	//turn object back into a json string
	//set token for last person logged in
	localStorage.setItem('loggedIn', JSON.stringify(newid));
	//write json string into local storage under key 'id'
	return localStorage.setItem('RainiersBackbone', JSON.stringify(jstring));
});

