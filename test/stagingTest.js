var CB = require('../lib/cloudboost.js');
   var util = {
     makeString : function(){
	    var text = "x";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return 'x'+text;
	},	

	makeEmail : function(){
	    return this.makeString()+'@sample.com';
	}

   };

   

	

describe("Server Check",function(){
    it("should check for localhost",function(done){
        this.timeout(100000);
        var xmlhttp;
        var req = typeof(require) === 'function' ? require : null;
        // Load references to other dependencies
        if (typeof(XMLHttpRequest) !== 'undefined') {
            xmlhttp = XMLHttpRequest;
        } else if (typeof(require) === 'function' &&
            typeof(require.ensure) === 'undefined') {
            xmlhttp = req('xmlhttprequest').XMLHttpRequest;
        }
        CB.appId = 'travis123';
        CB.appKey = '6dzZJ1e6ofDamGsdgwxLlQ==';
        CB.jsKey = CB.appKey;
        CB.masterKey = 'vfmMIbP4KaqxihajNqLNFGuub8CIOLREP1oH0QC0qy4=';
        CB.serverUrl = 'http://stagingdataservices.azurewebsites.net';
        CB.serviceUrl = 'http://stagingfrontendservice.azurewebsites.net';
        CB.socketIoUrl = CB.serverUrl;
        CB.apiUrl = CB.serverUrl;
        done();
    });
});

describe("Cloud App", function() {
    it("should init the CloudApp and SDK.", function(done) {
        this.timeout(500000);

        CB.CloudApp.init(CB.appId, CB.appKey);

        done();
    });
});

describe("CloudRole", function (done) {
    var roleName5 = util.makeString();
    var role5 = new CB.CloudRole(roleName5);
    it("Should create a role", function (done) {

        this.timeout(20000);

        role5.save().then(function(list){
            console.log(list);
            if(!list)
                throw "Should create a role";
            done();
        },function(){
            throw "unable to create a role.";
        });
    });

    it("Should Retrieve a role", function (done) {
		
        this.timeout(20000);

        var query = new CB.CloudQuery('Role');
        if(!role5.get('id')){
            done();
        }
        query.equalTo('id',role5.get('id'));
        query.find().then(function(list){
        	console.log(list);
        	if(!list)
        		throw "Should retrieve the cloud role";
            done();
        },function(){
            throw "Should retrieve the cloud role";
        });
    });
});

describe("CloudUser", function () {
    var username = util.makeString();
    var passwd = "abcd";

    

   it("Should create new user", function (done) {
         if(CB._isNode){
            done();
            return;
         }

         this.timeout(100000);

        var obj = new CB.CloudUser();
        obj.set('username', username);
        obj.set('password',passwd);
        obj.set('email',util.makeEmail());
        obj.signUp().then(function(list) {
            if(list.get('username') === username)
                done();
            else
                throw "create user error"
        }, function (error) {
            throw error;
        });

    });

    it('should logout the user',function (done){

        if(CB._isNode){
            done();
            return;
         }

        this.timeout(10000);
        CB.CloudUser.current.logOut().then(function(){
            done();
        },function(){
            throw "err";
        });
    });

    it("Should create a user and get version",function(done){

        if(CB._isNode){
            done();
            return;
         }

        this.timeout(10000);
        var user = new CB.CloudUser();
        var usrname = util.makeString();
        var passwd = "abcd";
        user.set('username', usrname);
        user.set('password',passwd);
        user.set('email',util.makeEmail());
        user.signUp().then(function(list) {
            if(list.get('username') === usrname && list.get('_version')>=0){
                done();
            }
            else
                throw "create user error"
        }, function () {
            throw "user create error";
        });
    });

    it("should do a query on user",function(done){


        if(CB._isNode){
            done();
            return;
         }


        this.timeout(10000);
        var user = new CB.CloudUser();
        var usrname = util.makeString();
        var passwd = "abcd";
        user.set('username', usrname);
        user.set('password',passwd);
        user.set('email',util.makeEmail());
        user.signUp().then(function(list) {
            if(list.get('username') === usrname && list.get('_version')>=0){
                var query = new CB.CloudQuery('User');
                query.findById(user.get('id')).then(function(obj){
                    console.log(obj);
                    done();
                },function(err){
                    console.log(err);
                });
            }
            else
                throw "create user error"
        }, function () {
            throw "user create error";
        });

    });

    it('should logout the user',function (done){

        if(CB._isNode){
            done();
            return;
         }


        this.timeout(10000);
        CB.CloudUser.current.logOut().then(function(){
            done();
        },function(){
            throw "err";
        });
    });


     it("Should login user", function (done) {

        if(CB._isNode){
            done();
            return;
         }

        this.timeout(10000);

        var obj = new CB.CloudUser();
        obj.set('username', username);
        obj.set('password',passwd);
        obj.logIn().then(function(list) {
            if(list.get("username") === username)
                done();
        }, function () {
            throw "user login error";
        });

    });

    var roleName2 = util.makeString();
    var role1 = new CB.CloudRole(roleName2);
    role1.set('name',roleName2);
    it("Should create a role ", function (done) {

        this.timeout(20000);

        role1.save().then(function(list){
                done();
            },function(){
                throw "role create error";
            });

    });


   it("Should assign role to user", function (done) {

        if(CB._isNode){
            done();
            return;
         }

        this.timeout(100000);

        var obj = new CB.CloudUser();
        obj.set('username', username);
        obj.set('password',passwd);
        obj.logIn().then(function(list) {
            role1.save().then(function(role){
                list.addToRole(role).then(function(list){
                    done();
                },function(error){
                    throw error;
                });
            }, function (error) {
                throw error;
            });
        },function(){
            throw "role create error";
        })

    });

    it("Should remove role assigned role to user", function (done) {

         if(CB._isNode){
            done();
            return;
         }
         

        this.timeout(1000000);

        var obj = new CB.CloudUser();
        var roleName3 = util.makeString();
        var role2 = new CB.CloudRole(roleName3);
        role2.set('name',roleName3);
        obj.set('username', username);
        obj.set('password',passwd);
        obj.logIn().then(function(list) {
            role2.save().then(function(role2){
                list.addToRole(role2).then(function(list){
                    CB.CloudUser.current.removeFromRole(role2).then(function(){
                        done();
                    },function(){
                        throw "Should remove the role";
                    });
                },function(){
                    throw "user role set error";
                });
            }, function () {
                throw "user role assign error";
            });
        },function(){
            throw "user login error";
        });

    });
     


     it('should encrypt user password',function (done){
        
        this.timeout(100000);

        var pass = passwd;

        var obj = new CB.CloudUser();
        obj.set('username', util.makeString());
        obj.set('password',pass);
        obj.set('email',util.makeEmail());
        obj.save().then(function(obj) {
            if(obj.get('password') === pass)
                throw "Password is not encrypted.";
            else
               done();
        }, function (err) {
            throw "user create error";
        });

    });



});